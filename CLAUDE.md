# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Polaroid Camera is an immersive, full-screen Polaroid camera simulator built with zero dependencies — pure HTML, CSS, and vanilla JavaScript. It uses the device camera (`getUserMedia`), Web Audio API for synthesized sounds, and `localStorage` for photo persistence. Deployed as a static site on GitHub Pages.

## Development

No build step, bundler, or package manager. Open `index.html` directly in a browser or serve with any static server:

```sh
python3 -m http.server 8000
# then visit localhost:8000
```

Camera access requires HTTPS or localhost.

## Architecture

Three files, all in the root:

- **`index.html`** — Semantic scene layers: power-on iris, viewfinder (with camera-clip for zoom), flash overlay, gallery panel, eject stage, permission dialog.
- **`style.css`** — CSS variables for the warm palette, 10+ `@keyframes` animations, proportional HUD positioning (%), responsive breakpoints with safe-area insets, SVG-based grain overlay.
- **`app.js`** — Modular ES6 object literals (not classes):
  - `STYLES` — Config objects for 12 film styles (filters, grain, tint, light leaks, paper textures).
  - `PhotoStorage` — localStorage CRUD for photo data URLs.
  - `AppState` — Central state: current style, zoom level, photo array, film counter, camera facing mode.
  - `CameraManager` — `getUserMedia` lifecycle, zoom via canvas crop, torch flash, front/back toggle, reconnect on disconnect.
  - `PolaroidRenderer` — Renders photos to canvas with style-specific filters/grain/effects; exports with polaroid frame via offscreen canvas + SVG paper texture.
  - `SoundEngine` — Web Audio API synthesis for all sounds (power-on, 3-stage shutter, film advance, development, denied). No audio files.
  - `UIController` — Orchestrates everything: roulette-style picker, zoom ruler, photo stack, gallery, lightbox, eject animation, keyboard shortcuts.

## Commit Conventions

Format: `v#.# - Description in 1-10 words`

Example: `v3.7 - Wide lens zoom, bigger bottom border, consistent polaroid ratio`
