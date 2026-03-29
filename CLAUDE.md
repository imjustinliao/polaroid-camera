# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Polaroid Camera is an immersive, full-screen Polaroid camera simulator built with zero dependencies — pure HTML, CSS, and vanilla JavaScript. It uses the device camera (`getUserMedia`), Web Audio API for synthesized sounds, and `localStorage` for photo and custom theme persistence. Deployed as a static site on GitHub Pages.

## Development

No build step, bundler, or package manager. Open `index.html` directly in a browser or serve with any static server:

```sh
python3 -m http.server 8000
# then visit localhost:8000
```

Camera access requires HTTPS or localhost.

## Architecture

Three files, all in the root:

- **`index.html`** — Semantic scene layers: power-on iris, viewfinder (with camera-clip for zoom), flash overlay, gallery panel, eject stage, permission dialog, theme manager popup.
- **`style.css`** — CSS variables for the warm palette, 10+ `@keyframes` animations, proportional HUD positioning (%), responsive breakpoints with safe-area insets, SVG-based grain overlay, theme manager popup styles.
- **`app.js`** — Modular ES6 object literals (not classes):
  - `STYLES` — Config objects for 12 film styles (filters, grain, tint, light leaks, paper textures with varied SVG feTurbulence types).
  - `PhotoStorage` — localStorage CRUD for photo data URLs.
  - `CustomThemeStorage` — localStorage persistence for user-created custom themes (color or image).
  - `AppState` — Central state: current style, zoom level, photo array, film counter, camera facing mode, custom themes array.
  - `CameraManager` — `getUserMedia` lifecycle, zoom via canvas crop, torch flash, front/back toggle, mirror for selfie, reconnect on disconnect.
  - `PolaroidRenderer` — Renders photos to canvas with style-specific filters/grain/effects; exports with polaroid frame via offscreen canvas + SVG paper texture. Includes `getDateColor()` for luminance-adaptive date stamp color.
  - `SoundEngine` — Web Audio API synthesis for all sounds (power-on, 3-stage shutter, film advance, development, denied). No audio files.
  - `UIController` — Orchestrates everything: roulette-style picker, zoom ruler, photo stack, gallery, lightbox, eject animation, keyboard shortcuts, theme manager popup (add/delete/reorder custom themes).

## Key Design Decisions

- **Polaroid bottom border**: 22% of card width. Adjust in CSS `.polaroid-bottom { padding-bottom }` and JS `renderExport` `bottomPad` simultaneously.
- **Date stamp color**: Computed by `PolaroidRenderer.getDateColor()` based on paper luminance — dark ink on light paper, light ink on dark backgrounds.
- **Custom themes**: Stored in localStorage as `polaroid-custom-themes`. Each has `id`, `type` (color/image), `color`/`dataUrl`, `name`.
- **OG thumbnail**: Uses `thumbnail.png` (PNG required for universal link preview support across iMessage, Discord, LinkedIn, X, Instagram).

## Commit Conventions

Format: `v#.# - Description in 1-10 words`

Example: `v3.11 - Adaptive date color based on paper luminance`
