## Notes

### Next Steps

Frontend:

1. Setup the authentication provider - either with Ethereum or RainbowKit custom provider
    - https://rainbowkit.com/docs/custom-authentication
    - https://login.xyz/
2. Once we are logged in, add a button to list our ERC20 tokens
3. On the API side, make a return placeholder data for the ERC20 tokens for now
4. On the frontend, render that lists nicely
5. Deal with super long lists of tokens / pagination, maybe with an infinite scroll from Tanstack Query.

Backend:

1. Add a placeholder for the ERC20 tokens
2. Update our endpoint to query the ERC20 tokens from Alchemy RPC (maybe use their SDK for simplicity)
3. Secure the endpoint with authentication.

Follow-up:

1. Migrate to a database, maybe something like Prisma ORM + SQLITE for the sake of testing
2. Then update the leaderboard on query and update the database.
3. Create the leaderboard endpoints + frontend component.

### Todo

- Move the shared code to a shared package.
- Config rainbowkit to use local testnet and regular test nets.
- Double check the typing for express' locals (viem client).
- Review the providers for rainbowkit: https://rainbowkit.com/docs/installation#preparing-to-deploy
- Drop the hyperspace background if it's too much CPU (it's a super naive implementation atm).

### Won't Do

- Figure out a better way to import zod-to-openapi, see the `zod-extend.ts` file, it's `--import`'d in the package.json. Which will be annoying to keep in sync with other entry points like `jest`.
- API Structure should use versioning (/v1/...)
- Tooling to avoid code duplication, define types and
  routes in a single place should be used.
- CSRF protection.

### Setup

Setup domains in your `/etc/hosts` file:

```
127.0.0.1       app.jumper.local
127.0.0.1       api.jumper.local
::1             app.jumper.local
::1             api.jumper.local
```

This makes sharing sessions, and cookies between frontened and backend easier.
