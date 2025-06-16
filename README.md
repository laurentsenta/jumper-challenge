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

I (laurent) focused on figuring out a "fine" structure for the project

### Tools

- RainbowKit for authentication and wallet management
- Redis to cache Alchemy metadata
- Prisma (using SQLite for simplicity) to store token data for the leaderboard

### Noteworthy

- Auth
  - We use Sign In With Ethereum to set up a session/cookie shared across the backend and frontend.
  - We're using iron-session (not next-auth) to reuse code between the API and the Frontend.
  - This means we have a shared auth with no interaction between the backend and frontend.
- Structure
  - The backend is more or less a completely independent service dedicated to tokens and leaderboard management.
  - The frontend handles authentication and UI.
- Rendering / SSR
  - The frontend is using a Tanstack Query `prefetchQuery` to provide "as much" server-side'ness as possible. I found this a bit convoluted with App Router, but that's [how it is](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#prefetching-and-dehydrating-data).
  - Getting the UI to not blink despite state changes between (Rainbow, Wagmi, Server Side, Client Side) was a bit of a challenge. The magic happens in the `AuthSwitch` where we aggregate the states into a "reliable" view.

### Future Improvements

- API Structure should use versioning (/v1/...)
- Caching: We could set a cache ttl on the backend's response and relies on a bit more infra (like CDNs).
- Chain Ids: I couldn't find a straightforward way to move between networks (used by Alchemy) & chain ids (used by the Wallet) so I harcoded ethereum for now.
- Dev env: There is a weird hang on the app in dev when the devtools are active, I haven't had time to investigate.
- Resiliency: add a retry mechanism for the Alchemy API calls, especially for the token metadata, and fallbacks.
- Performances: Exposing balance + tokens through a graphql endpoint might help improve performance as we could fetch only what we need on reload.
- Leaderboard: Super naive, I want to get the structure done, so it just lists the number of tokens per users
- Testing: I'd like to make it more clear what is integration vs e2e vs unit-testing. I was discovering the APIs a bit as I was going, so I made sure to have good coverage, but structure could be improved.
- Shared code: For now there is a `shared.ts` file in each project with code shared between the frontend and backend.
  first step would be to move that to a shared models package.
- Redo the hyperspace background: That was a fun experiment, but it is implemented super naively by AI.
- Figure out a better way to import zod-to-openapi, see the `zod-extend.ts` file, it's `--import`'d in the package.json.
