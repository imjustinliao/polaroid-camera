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

- **`index.html`** — Semantic scene layers: power-on iris, viewfinder (with camera-clip for zoom), flash overlay, gallery panel, eject stage, permission dialog, theme manager popup with inline color+texture picker, landscape lock overlay.
- **`style.css`** — CSS variables for the warm palette, 10+ `@keyframes` animations, proportional HUD positioning (%), responsive breakpoints with safe-area insets, SVG-based grain overlay, theme manager popup styles, portrait-lock media query.
- **`app.js`** — Modular ES6 object literals (not classes):
  - `STYLES` — Config objects for 12 film styles (filters, grain, tint, light leaks, paper textures with varied SVG feTurbulence types).
  - `PAPER_TEXTURES` — 8 texture presets (none, smooth, linen, canvas, watercolor, rough, fiber, grain) used by custom color themes.
  - `PhotoStorage` — localStorage CRUD for photo data URLs.
  - `CustomThemeStorage` — localStorage persistence for user-created custom themes (color+texture or image).
  - `AppState` — Central state: current style, zoom level, photo array, film counter, camera facing mode, custom themes array.
  - `CameraManager` — `getUserMedia` lifecycle, zoom via canvas crop, torch flash, front/back toggle, mirror for selfie, reconnect on disconnect.
  - `PolaroidRenderer` — Renders photos to canvas with style-specific filters/grain/effects; exports with polaroid frame via offscreen canvas + SVG paper texture. Includes `getDateColor()` for luminance-adaptive date stamp color. Uses Web Share API for native camera roll saving on mobile.
  - `SoundEngine` — Web Audio API synthesis for all sounds (power-on, 3-stage shutter, film advance, development, denied). No audio files.
  - `UIController` — Orchestrates everything: roulette-style picker, zoom ruler, photo stack, gallery, lightbox, eject animation, keyboard shortcuts, theme manager popup (add color+texture/image themes, delete, reorder), clear all with themed confirm dialog.

## Key Design Decisions

- **Polaroid bottom border**: 22% of card width. Adjust in CSS `.polaroid-bottom { padding-bottom }` and JS `renderExport` `bottomPad` simultaneously.
- **Date stamp color**: Computed by `PolaroidRenderer.getDateColor()` based on paper luminance — dark ink on light paper, light ink on dark backgrounds.
- **Custom themes**: Stored in localStorage as `polaroid-custom-themes`. Each has `id`, `type` (color/image), `color`/`dataUrl`, `texture` (key into `PAPER_TEXTURES`), `name`. Duplicate detection by color+texture or image signature.
- **Texture presets**: `PAPER_TEXTURES` constant defines 8 SVG feTurbulence-based textures. Used in custom color theme creation (picker UI) and rendering (card + export).
- **Mobile export**: Uses `navigator.share()` with File objects to save to camera roll. Falls back to `<a download>` on desktop.
- **Portrait lock**: CSS-only `@media (orientation: landscape)` overlay on mobile (< 900px).
- **OG thumbnail**: Uses `thumbnail.png` (PNG required for universal link preview support across iMessage, Discord, LinkedIn, X, Instagram).

## Commit Conventions

Format: `v#.# - Description in 1-10 words`

Example: `v3.17 - Texture picker for custom color themes`
