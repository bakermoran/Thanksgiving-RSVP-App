# Plan: Gatherings + Themes

## Model

```
organizations   owner, members, billing (Better Auth org plugin)
└─ gatherings   slug, themeId → guest site /g/$slug
   └─ events, invite_groups, invitees, obligations (gatheringId FK)

themes          id, orgId (null = preset), name, basePresetId,
                tokens { light, dark }, fonts, decorations
```

- Presets: Thanksgiving, Christmas. Custom = fork of a preset.
- Validate tokens with zod (hex colors, font/decoration allowlists).
- Migration: backfill one "Thanksgiving" gathering, assign existing rows to it.

## Two design systems

|        | Guest `/g/$slug`                              | Platform `/app/...`           |
| ------ | --------------------------------------------- | ----------------------------- |
| Look   | per-gathering theme                           | fixed SaaS                    |
| UI     | `src/ui/guest` (current kit, semantic tokens) | `src/ui/platform` (shadcn/ui) |
| Tokens | `--g-*` vars on a wrapper, not `:root`        | shadcn defaults               |
| Dark   | per-theme light/dark sets                     | built in                      |

- Skip Radix Themes for guest: its knobs are too limited for custom looks.
- `<ThemeScope>` sets vars from theme JSON during SSR → same component powers the guest site and the editor preview.
- Appearance from cookie (no flash).
- ESLint: platform can't import guest UI except the preview.
- Current admin screens move to platform look.

## Auth + RBAC

| Who            | How                                               | Roles                                   |
| -------------- | ------------------------------------------------- | --------------------------------------- |
| Platform staff | Better Auth `admin` plugin                        | superadmin (impersonate, ban)           |
| Hosts          | Better Auth email/password, `organization` plugin | owner / admin / editor / viewer per org |
| Guests         | keep custom signed cookie (not Better Auth users) | implicit guest, scoped to invite group  |

- Better Auth: drizzle adapter (sqlite), mounted at `src/routes/api/auth/$.ts`, `tanstackStartCookies()` plugin.
- Tables added: `user`, `session`, `account`, `verification`, `organization`, `member`, `invitation`.
- `gatherings.orgId` FK → `organization`.
- Permissions: `createAccessControl` statements in `src/shared/permissions.ts`:
  `gathering`, `event`, `invitee`, `obligation`, `theme`, `member`, `billing` × `create|read|update|delete`.
- Enforcement:
  - `requirePermission({ event: ["update"] })` middleware in `functions/`: session → active org → `gathering.orgId === activeOrg` → `hasPermission`.
  - Repositories require `gatheringId` (defense in depth).
  - Client-side checks only hide UI.
- Guest session payload gains `gatheringId`. Name lookup + invite codes scoped per gathering.
- Per-gathering co-hosts: later, via `teams` or a `gathering_members` table.
- Delete `adminSession.ts`, old `users` table, `user:create` script → recreate admin via `auth.api.signUpEmail`.
- Existing scrypt hashes: re-create the admin, or pass custom `password.hash/verify`.

## Order

1. Rename colors to semantic tokens; current look = Thanksgiving preset.
2. `gatherings` table + backfill + `/g/$slug`.
3. shadcn platform shell; move admin screens.
4. `themes` table, Christmas preset, theme editor w/ live preview.
5. Better Auth + orgs.
6. Stripe billing.
