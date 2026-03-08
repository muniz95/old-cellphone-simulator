/// <reference types="vitest" />
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

type ChunkMetric = {
  fileName: string;
  raw: number;
  gzip: number;
  brotli: number;
  isEntry: boolean;
};

const formatKb = (value: number) => (value / 1024).toFixed(2);

const createBundleVisualizerPlugin = (): Plugin => ({
  name: 'bundle-visualizer',
  apply: 'build',
  generateBundle(outputOptions, bundle) {
    const chunkMetrics: ChunkMetric[] = Object.values(bundle)
      .filter((item) => item.type === 'chunk' && item.fileName.endsWith('.js'))
      .map((chunk) => {
        const source = chunk.code;
        const raw = Buffer.byteLength(source);
        const gzip = gzipSync(source).length;
        const brotli = brotliCompressSync(source).length;

        return {
          fileName: chunk.fileName,
          raw,
          gzip,
          brotli,
          isEntry: chunk.isEntry,
        };
      })
      .sort((a, b) => b.raw - a.raw);

    const totalRaw = chunkMetrics.reduce((sum, chunk) => sum + chunk.raw, 0);
    const totalGzip = chunkMetrics.reduce((sum, chunk) => sum + chunk.gzip, 0);
    const totalBrotli = chunkMetrics.reduce((sum, chunk) => sum + chunk.brotli, 0);
    const entryChunk = chunkMetrics.find((chunk) => chunk.isEntry);
    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const tiles = chunkMetrics
      .map((chunk) => {
        const percentage = totalRaw > 0 ? (chunk.raw / totalRaw) * 100 : 0;
        const label = escapeHtml(chunk.fileName);
        const entryBadge = chunk.isEntry ? ' <strong>(entry)</strong>' : '';

        return `<article class="tile" style="flex-grow: ${Math.max(chunk.raw, 1)}">
  <h3>${label}${entryBadge}</h3>
  <p>${formatKb(chunk.raw)} KB raw (${percentage.toFixed(1)}%)</p>
  <p>${formatKb(chunk.gzip)} KB gzip</p>
  <p>${formatKb(chunk.brotli)} KB brotli</p>
</article>`;
      })
      .join('\n');

    const rows = chunkMetrics
      .map((chunk) => {
        const percentage = totalRaw > 0 ? (chunk.raw / totalRaw) * 100 : 0;
        return `<tr>
  <td>${escapeHtml(chunk.fileName)}${chunk.isEntry ? ' (entry)' : ''}</td>
  <td>${formatKb(chunk.raw)}</td>
  <td>${formatKb(chunk.gzip)}</td>
  <td>${formatKb(chunk.brotli)}</td>
  <td>${percentage.toFixed(2)}%</td>
</tr>`;
      })
      .join('\n');

    const reportHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bundle Stats</title>
    <style>
      :root { color-scheme: light; font-family: "IBM Plex Sans", "Segoe UI", sans-serif; }
      body { margin: 0; background: #f6f7fb; color: #121822; }
      main { max-width: 1200px; margin: 0 auto; padding: 24px; }
      h1, h2 { margin: 0 0 12px; }
      .summary { display: grid; gap: 8px; margin-bottom: 24px; }
      .summary p { margin: 0; }
      .treemap { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
      .tile { min-width: 180px; flex-basis: 220px; background: #ffffff; border: 1px solid #d8dbe8; border-radius: 10px; padding: 12px; }
      .tile h3 { font-size: 13px; margin: 0 0 8px; word-break: break-word; }
      .tile p { margin: 0; font-size: 12px; line-height: 1.4; }
      table { width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #d8dbe8; border-radius: 10px; overflow: hidden; }
      th, td { font-size: 12px; padding: 8px 10px; border-bottom: 1px solid #edf0f7; text-align: left; }
      th { background: #eef2ff; }
      tr:last-child td { border-bottom: none; }
    </style>
  </head>
  <body>
    <main>
      <h1>Bundle Stats</h1>
      <section class="summary">
        <p><strong>Total JS raw:</strong> ${formatKb(totalRaw)} KB</p>
        <p><strong>Total JS gzip:</strong> ${formatKb(totalGzip)} KB</p>
        <p><strong>Total JS brotli:</strong> ${formatKb(totalBrotli)} KB</p>
        <p><strong>Entry chunk:</strong> ${
          entryChunk
            ? `${escapeHtml(entryChunk.fileName)} (${formatKb(entryChunk.raw)} KB raw)`
            : 'n/a'
        }</p>
      </section>
      <h2>Treemap</h2>
      <section class="treemap">${tiles}</section>
      <h2>Chunk Table</h2>
      <table>
        <thead>
          <tr>
            <th>Chunk</th>
            <th>Raw KB</th>
            <th>Gzip KB</th>
            <th>Brotli KB</th>
            <th>Raw %</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </main>
  </body>
</html>`;

    const outputDir =
      outputOptions.dir ??
      path.dirname(outputOptions.file ?? path.resolve(process.cwd(), 'dist/index.js'));
    const reportPath = path.resolve(outputDir, 'bundle-stats.html');
    mkdirSync(path.dirname(reportPath), { recursive: true });
    writeFileSync(reportPath, reportHtml, 'utf8');
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const analyze = env.ANALYZE === 'true';
  const plugins = [react(), viteTsconfigPaths()];

  if (analyze) {
    plugins.push(createBundleVisualizerPlugin());
  }

  return {
    base: '/',
    build: {
      manifest: true,
      rollupOptions: {
        external: [/.*\.tests\.{ts,tsx}$/], // Exclude files matching this regex
      },
    },
    test: {
      environment: 'jsdom',
      exclude: ['**/node_modules/**', '**/dist/**', '**/browser/**'],
      globals: true,
      include: ['src/**/*.test.{ts,tsx}'],
      typecheck: {
        tsconfig: './tsconfig.json',
      },
    },
    plugins,
  };
});
