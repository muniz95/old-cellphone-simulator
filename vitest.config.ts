import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: [
      {
        find: new RegExp('^@/(.*)$'),
        replacement: path.resolve(__dirname, './src/$1'),
      },
    ],
  },
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/browser/**'],
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}'],
    typecheck: {
      tsconfig: './tsconfig.json',
    },
  },
});
