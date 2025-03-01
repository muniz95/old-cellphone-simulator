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
        external: [/.*\.test\.{ts,tsx}$/], // Exclude files matching this regex
      },
    },
    define: {
      'process.env': env,
    },
    plugins: [react(), viteTsconfigPaths()],
  };
});
