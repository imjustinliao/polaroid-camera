# Polaroid Camera

An immersive, full-screen Polaroid camera simulator. Point and shoot — experience the ritual of instant photography with authentic mechanical sounds, nostalgic aesthetics, and real-time photo development animations.

**[Live Demo](https://imjustinliao.github.io/polaroid-camera/)** · **[GitHub](https://github.com/imjustinliao/polaroid-camera)**

## Features

### Experience
- **Immersive Fullscreen** — You ARE looking through the camera lens, not at a widget
- **Power-on Ritual** — Iris opening animation with warm electrical startup sounds
- **Real Viewfinder** — Live camera feed with vignette, animated grain overlay, CRT scanlines, polaroid reticle
- **Mechanical Capture** — 3-stage shutter click + full-screen flash + polaroid eject animation
- **Development Magic** — Photos appear dark and slowly reveal as they develop (2.8s)
- **12 Film Styles** — Roulette-style scroll picker with unique paper textures per style (linen, canvas, fiber, watercolor, and more)
- **Custom Themes** — Add unlimited custom themes: pick any color with 8 texture options (none, smooth, linen, canvas, watercolor, rough, fiber, grain), or upload an image background
- **Theme Manager** — Popup to add, delete, and reorder custom themes; saved in browser across sessions
- **Zoom Control** — Ruler-style zoom meter (1x-3x) with keyboard +/- support
- **10-Shot Limit** — Enforced with shake animation and denied sound; delete to free slots
- **Gallery** — Stacked photo preview, expand/download on hover, export all, clear all with themed confirmation
- **Date Stamp** — Handwritten-style date on every polaroid card and export, with adaptive contrast based on paper luminance
- **Save to Camera Roll** — Native share sheet on iOS/Android saves directly to Photos; fallback download on desktop
- **Photo Persistence** — Photos are cached in localStorage and survive browser restarts
- **Front/Back Camera** — Switch between cameras on mobile with automatic mirror for selfie
- **Torch Flash** — Uses device flashlight on rear camera capture
- **Camera Reconnect** — Auto-prompts when camera disconnects (device sleep, tab switch)
- **Portrait Lock** — Landscape rotation on mobile shows a rotate prompt with orientation lock tip

### Technical
- **No Dependencies** — Pure HTML, CSS, JavaScript
- **Separate Files** — `index.html`, `style.css`, `app.js` for clean architecture
- **Responsive Design** — Desktop and mobile optimized with safe-area insets
- **Web Audio Synthesis** — All sound effects synthesized in real-time (no audio files)
- **Web Share API** — Native camera roll saving on supported devices
- **localStorage Caching** — Photos and custom themes persist across sessions
- **Adaptive Date Color** — Luminance-based contrast detection for date stamp readability
- **SVG Paper Textures** — feTurbulence-based textures with 8 presets for custom themes

## Quick Start

1. Open `index.html` in a modern web browser (or visit the [live demo](https://imjustinliao.github.io/polaroid-camera/))
2. Allow camera access when prompted
3. Watch the iris opening animation
4. Point at something and tap the red shutter button
5. Take up to 10 photos per session
6. View your roll in the gallery

## Controls

- **Shutter Button** — Center red button to capture
- **Style Picker** — Roulette-style scrollable strip above the shutter; center item auto-selects
- **Custom Theme (+)** — Last item in picker; opens theme manager to add color+texture or image themes
- **Zoom Ruler** — Right side vertical slider (1x-3x), also keyboard `+` / `-`
- **Photo Stack** — Bottom-right; shows last 3 photos stacked; tap to open gallery
- **Switch Camera** — Below frame on mobile/tablet
- **Gallery** — Expand, download (with polaroid frame + date), or delete photos; export all or clear all

## Architecture

### `index.html`
Semantic structure with immersive scene layers: power-on, viewfinder (with camera-clip for zoom), flash, gallery, permission overlay, theme manager popup with inline color+texture picker, landscape lock overlay.

### `style.css`
Complete visual design with 10+ keyframe animations, CSS variables for warm nostalgic palette, proportional HUD positioning (%), responsive breakpoints, SVG-based grain overlay, theme manager popup styles, portrait-lock media query, themed confirmation dialogs.

### `app.js`
Modular ES6 objects:
- **PAPER_TEXTURES** — 8 texture presets for custom themes (none, smooth, linen, canvas, watercolor, rough, fiber, grain)
- **CustomThemeStorage** — localStorage persistence for user-created custom themes
- **PhotoStorage** — localStorage persistence for photos
- **AppState** — Central state machine
- **CameraManager** — getUserMedia, zoom capture, torch flash, camera toggle, selfie mirror
- **PolaroidRenderer** — Photo rendering with filters/grain/effects, polaroid frame export, adaptive date color via luminance detection, Web Share API for camera roll saving
- **SoundEngine** — Web Audio API synthesis (power-on, 3-stage shutter, film advance, development, denied)
- **UIController** — Orchestration, roulette picker, zoom ruler, photo stack, gallery, lightbox, theme manager (add color+texture/image, delete, reorder), clear all with themed dialog

## Browser Support

Requires: `getUserMedia`, `AudioContext`, CSS Grid/Flexbox, ES6

**Tested:** Chrome, Firefox, Safari, Edge (latest) · iOS Safari 14+ · Chrome for Android

## Troubleshooting

**Camera not showing?** — Check browser permissions, ensure HTTPS or localhost

**No sounds?** — Check volume; browser may require user gesture before first sound

**Photos look dark?** — Try different film styles; vintage look is intentional

## License

Open source. Feel free to use, modify, and share.
