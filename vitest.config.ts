import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/browser/**'], // Exclude browser-specific tests
    globals: true,
    include: ['tests/**/*.test.tsx'], // Ensure only .test.tsx files are included
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});