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
- **Custom Themes** — Add unlimited custom themes via color picker or image upload; managed in a popup with reorder and delete
- **Zoom Control** — Ruler-style zoom meter (1x-3x) with keyboard +/- support
- **10-Shot Limit** — Enforced with shake animation and denied sound; delete to free slots
- **Gallery** — Stacked photo preview, expand/download on hover, export all with polaroid frame
- **Date Stamp** — Handwritten-style date on every polaroid card and export, with adaptive contrast
- **Photo Persistence** — Photos are cached in localStorage and survive browser restarts
- **Front/Back Camera** — Switch between cameras on mobile with automatic mirror for selfie
- **Torch Flash** — Uses device flashlight on rear camera capture
- **Camera Reconnect** — Auto-prompts when camera disconnects (device sleep, tab switch)

### Technical
- **No Dependencies** — Pure HTML, CSS, JavaScript
- **Separate Files** — `index.html`, `style.css`, `app.js` for clean architecture
- **Responsive Design** — Desktop and mobile optimized with safe-area insets
- **Web Audio Synthesis** — All sound effects synthesized in real-time (no audio files)
- **localStorage Caching** — Photos and custom themes persist across sessions
- **Adaptive Date Color** — Luminance-based contrast detection for date stamp readability

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
- **Custom Theme (+)** — Last item in picker; opens theme manager to add color or image themes
- **Zoom Ruler** — Right side vertical slider (1x–3x), also keyboard `+` / `-`
- **Photo Stack** — Bottom-right; shows last 3 photos stacked; tap to open gallery
- **Switch Camera** — Below frame on mobile/tablet
- **Gallery** — Expand, download (with polaroid frame + date), or delete photos on hover

## Architecture

### `index.html`
Semantic structure with immersive scene layers: power-on, viewfinder (with camera-clip for zoom), flash, gallery, permission overlay, theme manager popup.

### `style.css`
Complete visual design with 10+ keyframe animations, CSS variables for warm nostalgic palette, proportional HUD positioning (%), responsive breakpoints, SVG-based grain overlay, theme manager popup styles.

### `app.js`
Modular ES6 objects:
- **CustomThemeStorage** — localStorage persistence for user-created custom themes
- **PhotoStorage** — localStorage persistence for photos
- **AppState** — Central state machine
- **CameraManager** — getUserMedia, zoom capture, torch flash, camera toggle, selfie mirror
- **PolaroidRenderer** — Photo rendering with filters/grain/effects, polaroid frame export, adaptive date color via luminance detection
- **SoundEngine** — Web Audio API synthesis (power-on, 3-stage shutter, film advance, development, denied)
- **UIController** — Orchestration, roulette picker, zoom ruler, photo stack, gallery, lightbox, theme manager (add/delete/reorder)

## Browser Support

Requires: `getUserMedia`, `AudioContext`, CSS Grid/Flexbox, ES6

**Tested:** Chrome, Firefox, Safari, Edge (latest) · iOS Safari 14+ · Chrome for Android

## Troubleshooting

**Camera not showing?** — Check browser permissions, ensure HTTPS or localhost

**No sounds?** — Check volume; browser may require user gesture before first sound

**Photos look dark?** — Try different film styles; vintage look is intentional

## License

Open source. Feel free to use, modify, and share.
