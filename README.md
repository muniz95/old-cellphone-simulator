[![Netlify Status](https://api.netlify.com/api/v1/badges/7e41b3a5-454c-44ed-905d-c364d21f384c/deploy-status)](https://app.netlify.com/projects/vapor-nr1/deploys)

A small web app that simulates the behavior and appearance of a common cell phone in 2001.

Remember when smartphones how we know nowadays were something utopic? Handheld devices were, for our modern standards, very limited.

- Weak and expensive internet connection;
- No instant messaging;
- Monochromatic screen;
- No apps;
- No camera (NO SELFIES!!!!)
- and many more unconveniences.

## Motivation

Two main reasons:

### Didatic purposes

I opted for use a specific stack in this project, to extend my knowledge both in web development and technologies/tools:

- TypeScript;
- ReactJS and its ecossystem (react-router, React Context, vitest);
- SASS and other CSS-related stuff (Flexbox, animations, etc);
- HTML5 API's and PWA good practices.

Additionally, it is an exercise in understanding how old phones' OS's worked back in the past.

### Curiosity purposes

I always wondered if tablets existed at that time, how would they look like. Now I can know it.

### Nostalgic purposes

Because ancient devices are still awesome, even after all these years.

## Features

Stuff that almost every phone could do at that time:

- [ ] Make and receive calls;
- [ ] Send and receive text messages;
- [ ] Store contacts;
- [ ] Set ringtones;
- [ ] Take notes;
- [ ] Calls log;
- [ ] Change phone settings;
- [ ] Alarm;
- [ ] Clock;
- [ ] Calculator;
- [ ] SIM services.

## Features I would like to add

- [ ] Actual vibration (on calls, received messages, etc);
- [ ] Games (at least demo-only versions);
- [ ] Integration with native phone services.

## Observations

I plan to use some smartphone-specific features (battery level, vibration, etc.). You can open this app in a PC or tablet and it will work like a charm, but you will have a better experience in a smartphone.

## PWA baseline (smartphone)

The project includes a baseline Progressive Web App setup:

- Web app manifest with standalone display mode and install icons
- Service worker for offline shell + cached same-origin static assets
- In-app banner for install/update actions when available

### Local validation

1. Build and preview:
   ```bash
   ./node_modules/.bin/vite build
   ./node_modules/.bin/vite preview
   ```
2. Open DevTools > Application:
   - Check Manifest fields/icons
   - Check Service Worker registration and active status
3. Simulate offline mode and refresh:
   - App shell should still load after first online visit

### Android checks

1. Chrome Android
   - Verify install prompt/banner
   - Install to home screen and launch in standalone mode
   - Validate update banner appears after a new deployment
2. Firefox Android
   - Verify no runtime errors
   - Verify offline shell behavior
   - Install remains available through browser UI menu flow
