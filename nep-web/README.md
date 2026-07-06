# nep-web

Frontend for **NEP (NKTech Enterprise Platform)** — an enterprise ERP.

> Placeholder README — scaffold only. UI and business logic to be implemented.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS**
- Talks to the backend exclusively through the **NEP API Gateway**
- **JWT auth**: access + refresh tokens handled in `src/middleware.ts`

## Key concepts

### Route groups
- **`(auth)`** — unauthenticated pages (login) with minimal chrome.
- **`(dashboard)`** — authenticated shell. Each ERP capability (product, inventory, sales, manufacturing, …) is its own route folder.

### Dynamic menus
The dashboard sidebar is **not hardcoded** — it is rendered from the **Module Registry API**. Each registered ERP capability maps to a route folder under `(dashboard)/`.

### Auth flow
`src/middleware.ts` guards protected routes: it checks the JWT access token, attempts a refresh when expired, and redirects to `/login` when unauthenticated.

## Layout

```
src/
  app/
    (auth)/         # login + auth layout
    (dashboard)/    # authenticated modules: product, inventory, sales, manufacturing
    api/            # route handlers (BFF)
    layout.tsx      # root layout
    globals.css
  components/ui/     # shared UI primitives
  lib/               # api-client.ts, auth.ts
  hooks/  store/  types/
  middleware.ts      # JWT route protection
```

## Getting started

_TBD — do not run installs yet; this is scaffold-only._
