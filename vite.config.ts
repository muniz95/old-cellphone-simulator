/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/',
    build: {
      rollupOptions: {
        external: [/.*\.tests\.{ts,tsx}$/], // Exclude files matching this regex
      },
    },
    define: {
      'process.env': env,
    },
    test: {
      environment: 'jsdom',
      exclude: ['**/node_modules/**', '**/dist/**', '**/browser/**'],
      globals: true,
      include: ['src/__tests__/**/*.test.{ts,tsx}'],
      typecheck: {
        tsconfig: './tsconfig.json',
      },
    },
    plugins: [react(), viteTsconfigPaths()],
  };
});
