# Thanksgiving RSVP app

I wrote this for fun to use with some friends this Thanksgiving because I wanted to 1. Use tanstack-start on something and 2. Just write some code by hand, since I rarely get to do that at work anymore.

AI did most of the frontend because I was primarily interested in getting some exposure to tanstack-start.

I have ideas of extracting the theme engine and making this generic to other events some day, but we'll see how far I get on that front.

Hosted on a raspberry pi under a chair in my kitchen at [https://thanksgiving.bakermoran.dev](https://thanksgiving.bakermoran.dev)

## Project layout

```
src/
  routes/       URL → loader → page. `-guards.ts` holds beforeLoad helpers.
  components/   Feature UI, grouped by domain.
  ui/           Design-system primitives.
  shared/       Code both sides can import: zod schemas, domain types, formatting utils.
  functions/    createServerFn handlers: auth middleware → validate → call a service.
  server/       Server-only code.
    auth/         Session cookies.
    services/     Business logic. One folder per service.
    repositories/ Drizzle queries.
    db/           Client, schema, relations.
  scripts/      CLI scripts.
```
