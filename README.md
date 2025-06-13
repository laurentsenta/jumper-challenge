# Jumper challenge

## Getting started

There's 2 directories into this repository with a README.md for each of those to have more informations about their respective setup.

- frontend: classic nextjs implementation within the material ui 5 setup.
- backend: expressjs 4 with some default routes and examples.

## Setup

We share cookies between the backend and the frontend, so we need to update our `/etc/hosts` file to include:

```plaintext
127.0.0.1       app.jumper.local
127.0.0.1       api.jumper.local
::1             app.jumper.local
::1             api.jumper.local
```

Visit [app.jumper.local:3000](http://app.jumper.local:3000) to see the frontend in action.

## Notes

I (laurent) focused on figuring out a "good" structure for the project,

Notes:

- RainbowKit for authentication and wallet management,
- Redis to cache Alchemy metadata,
- Prisma (using SQLite for simplicity) to store tokens data for the leaderboard,
- We share sessions / cookies accross frontend and backend, so we don't really need to move around user accounts around, we relies on SIWE.
- The auth related code is running in the frontend's API, the backend is mostly a completely independant service dedicated to tokens and leaderboard management.
- The leaderboard page is trying to be as much server-side rendered as possible, so it can be cached and served quickly.

### Improvements

- Caching: We could set a cache ttl on the backend's response and relies on a bit more infra (like CDNs).
- Chain Ids: I couldn't find a straightforward way to move between networks (used by Alchemy) & chain ids (used by the Wallet) so I kept this as a future improvement.
- Dev env: There is a weird hang on the dev server, as if the app is streaming for a long time, but it seems to work fine after building. I didn't have time to investigate.
- Resiliency: add a retry mechanism for the Alchemy API calls, especially for the token metadata.
- Performances: Exposing balance x tokens through a graphql endpoint might be useful.
- Leaderboard: naive, just list the number of tokens per users
- Testing: make it more clear what is integration vs e2e vs unit-testing. I was discovering the APIs a bit as I was going, so I made sure to have good coverage, but structure could be improved.
- Shared code: For now there is a `shared.ts` file in each project with code shared between the frontend and backend.
  first step would be to move that to a shared models packages.
- Redo the hyperspace background: That was a fun experiment, but it is implemented super naively.
- Figure out a better way to import zod-to-openapi, see the `zod-extend.ts` file, it's `--import`'d in the package.json.
- API Structure should use versioning (/v1/...)
