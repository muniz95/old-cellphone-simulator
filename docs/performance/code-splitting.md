# Route-Level Code Splitting Measurement Guide

## Goals
- Reduce initial JavaScript payload requested by `/`.
- Keep navigation behavior unchanged while loading feature routes on demand.

## Baseline (before changes)
1. Build with analyzer:
   ```bash
   npm run build:analyze
   ```
2. Save artifact:
   - `dist/bundle-stats.html` -> copy to `docs/performance/artifacts/baseline-bundle-stats.html`
3. Record metrics in the table below.

## Post-change measurement
1. Build with analyzer again:
   ```bash
   npm run build:analyze
   ```
2. Save artifact:
   - `dist/bundle-stats.html` -> copy to `docs/performance/artifacts/post-bundle-stats.html`
3. Fill the post-change columns and compare deltas.

<!-- AUTO-GENERATED:START -->
## Current post-change snapshot
Captured on **March 7, 2026** from `dist/bundle-stats.html`:

- Entry chunk (`assets/index-Digs4W2H.js`): `272.57 KB raw`, `89.83 KB gzip`, `78.08 KB brotli`
- Total initial JS for `/` (entry + home route dependency closure): `278.08 KB raw`
- Total emitted JS across all chunks: `305.19 KB raw`, `106.95 KB gzip`, `93.19 KB brotli`
- Route-specific lazy chunks emitted: `31`

## Metrics table
| Metric | Baseline | Post-change | Delta |
|---|---:|---:|---:|
| Entry chunk (raw KB) |  | 272.57 |  |
| Entry chunk (gzip KB) |  | 89.83 |  |
| Entry chunk (brotli KB) |  | 78.08 |  |
| Total initial JS for `/` (raw KB) |  | 278.08 |  |
| Vendor chunk (raw KB) |  | n/a |  |
| Number of route-specific lazy chunks |  | 31 |  |
<!-- AUTO-GENERATED:END -->

## Runtime verification checklist
- Open DevTools Network tab on `/` and refresh.
- Confirm feature route chunks are not loaded on first paint.
- Navigate to each feature route once and verify its chunk is fetched on demand.
- Navigate to the same feature route again and verify chunk is served from cache.

## Notes
- Analyzer output path is configured in Vite as `dist/bundle-stats.html`.
- The build also emits `dist/.vite/manifest.json`, which can be used for deeper asset tracing.
