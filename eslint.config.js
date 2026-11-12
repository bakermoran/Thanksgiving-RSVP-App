import js from "@eslint/js";
import pluginRouter from "@tanstack/eslint-plugin-router";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const servicesIndexOnly = {
  regex: "(^|/)services/[^/]+/.+",
  message:
    'Import a service through its index ("@/server/services/<name>"). Other files in a service folder are private.',
};

const noCrossServiceRelative = {
  regex: "^\\.\\./",
  message:
    'Use another service through its index ("@/server/services/<name>"), not a relative path.',
};

const noServer = {
  group: ["@/server", "@/server/**"],
  message:
    "Client code can't import server code. Call a server function from @/functions, or import types from @/shared/types.",
};

const noRepositoriesOrDb = {
  group: ["@/server/repositories/**", "@/server/db/**"],
  allowTypeImports: true,
  message:
    "Server functions go through a service (@/server/services/<name>), not repositories or the db.",
};

const noHttpLayer = {
  group: [
    "@/functions/**",
    "@/server/auth/**",
    "@tanstack/react-start",
    "@tanstack/react-start/**",
    "@tanstack/react-router",
  ],
  message:
    "Services and repositories don't know about HTTP (cookies, redirects, notFound). Return a value and let the server function decide.",
};

const noServices = {
  group: ["@/server/services", "@/server/services/**"],
  message: "Repositories can't depend on services.",
};

const restrictImports = (...patterns) => ({
  "@typescript-eslint/no-restricted-imports": ["error", { patterns }],
});

export default defineConfig([
  globalIgnores([
    "dist",
    ".output",
    ".tanstack",
    "drizzle",
    "src/routeTree.gen.ts",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      pluginRouter.configs["flat/recommended"],
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports" },
      ],
      ...restrictImports(servicesIndexOnly),
    },
  },
  {
    name: "layers/client",
    files: ["src/routes/**", "src/components/**", "src/ui/**", "src/shared/**"],
    ignores: ["src/shared/types.ts"],
    rules: restrictImports(noServer, servicesIndexOnly),
  },
  {
    name: "layers/shared-types",
    files: ["src/shared/types.ts"],
    rules: restrictImports(
      { ...noServer, allowTypeImports: true },
      servicesIndexOnly,
    ),
  },
  {
    name: "layers/functions",
    files: ["src/functions/**"],
    rules: restrictImports(noRepositoriesOrDb, servicesIndexOnly),
  },
  {
    name: "layers/services",
    files: ["src/server/services/**"],
    rules: restrictImports(
      noHttpLayer,
      servicesIndexOnly,
      noCrossServiceRelative,
    ),
  },
  {
    name: "layers/repositories",
    files: ["src/server/repositories/**"],
    rules: restrictImports(noHttpLayer, noServices),
  },
  prettier,
]);
