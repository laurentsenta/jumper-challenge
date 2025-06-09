## Notes

### Todo

- Double check the typing for express' locals (viem client).

### Won't Do

- Figure out a better way to import zod-to-openapi, see the `zod-extend.ts` file, it's `--import`'d in the package.json. Which will be annoying to keep in sync with other entry points like `jest`.
- API Structure should use versioning (/v1/...)
- Tooling to avoid code duplication, define types and
  routes in a single place should be used.
