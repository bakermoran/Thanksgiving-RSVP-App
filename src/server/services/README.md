# Services

Business rules live here, between server functions (`src/functions`) and
repositories. Each folder is one service. Its `index.ts` is the service's
public interface, and every other file in the folder is private.

```ts
import * as rsvpService from "@/server/services/rsvp";

await rsvpService.save({ inviteGroupId, eventId, rsvps });
```

`eslint.config.js` enforces this. Nothing outside a service folder can import
past its index, and a service can only use another service through
`@/server/services/<name>`, not a relative path.

Conventions:

- Services don't know about HTTP: no cookies, redirects, or `notFound()`.
  Missing records come back as `null`/`undefined`/`false`, and the server
  function decides what that means for the response.
- Broken rules (like RSVPing for someone outside your group) throw an `Error`.
