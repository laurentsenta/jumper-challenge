import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/node_modules/**', '**/commitlint.config.ts', '**/release.config.cjs', '**/index.ts'],
    },
    globals: true,
    restoreMocks: true,
    setupFiles: ['./src/test-setup.ts', './src/zod-extend.ts'],
  },
  plugins: [tsconfigPaths()],
});
