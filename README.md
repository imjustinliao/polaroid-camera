# Polaroid Camera

An immersive, full-screen Polaroid camera simulator. Point and shoot — experience the ritual of instant photography with authentic mechanical sounds, nostalgic aesthetics, and real-time photo development animations.

## Features

### Experience
- **Immersive Fullscreen** — You ARE looking through the camera lens, not at a widget
- **Power-on Ritual** — Iris opening animation with warm electrical startup sounds
- **Real Viewfinder** — Live camera feed with vignette, animated grain overlay, CRT scanlines, polaroid reticle
- **Mechanical Capture** — 3-stage shutter click + full-screen flash + polaroid eject animation
- **Development Magic** — Photos appear dark and slowly reveal as they develop (2.8s)
- **12 Film Styles** — Roulette-style scroll picker with unique paper textures per style
- **Zoom Control** — Ruler-style zoom meter (1x-3x) with keyboard +/- support
- **10-Shot Limit** — Enforced with shake animation and denied sound; delete to free slots
- **Gallery** — Stacked photo preview, expand/download on hover, export all
- **Front/Back Camera** — Switch between cameras on mobile; mirrored front-facing view
- **Camera Reconnect** — Auto-prompts when camera disconnects (device sleep, tab switch)

### Technical
- **No Dependencies** — Pure HTML, CSS, JavaScript
- **Separate Files** — `index.html`, `style.css`, `app.js` for clean architecture
- **Responsive Design** — Desktop and mobile optimized with safe-area insets
- **Mirrored Front Camera** — Video mirrors for natural selfie view; captures match
- **Web Audio Synthesis** — All sound effects synthesized in real-time (no audio files)

## Quick Start

1. Open `index.html` in a modern web browser
2. Allow camera access when prompted
3. Watch the iris opening animation
4. Point at something and tap the red shutter button
5. Take up to 10 photos per session
6. View your roll in the gallery

## How It Works

### Power-On Flow
1. **Iris Opening** (~1.8s) — Warm flicker animation with electrical hum and startup tone
2. **Viewfinder** — Full-screen camera feed with overlays (grain, scanlines, vignette)
3. **Camera Initialization** — Requests device camera access
4. **Ready** — Tap the red shutter button to capture

### Capture Flow
1. **Shutter** — 3-stage mechanical click sound (pre-exposure, main click, blade close)
2. **Flash** — Full-screen white flash with smooth fade
3. **Film Advance** — Motor whir + paper drag + mechanical stop sounds
4. **Eject** — Polaroid springs up from bottom with spring animation
5. **Development** — Photo appears dark, image slowly reveals over 3 seconds
6. **Gallery** — Photo joins the roll with subtle scatter rotation

### Style Filters
- **Classic** — Neutral, clean tones
- **Warm** — Sepia-tinged with light leak
- **Cool** — Subtle blue shift with vignette
- **Fade** — Washed out, bright aesthetic
- **Vintage** — Heavy grain and warm overlay

## Controls

- **Shutter Button** — Center red button to capture
- **Style Picker** — Bottom horizontal scrollable strip of colored circles
- **Camera Toggle** — Bottom-left (mobile/multi-camera devices only) to switch front/back
- **Gallery** — Bottom-right button with photo count badge
- **Save** — Download button under each photo in gallery

## Responsive Breakpoints

- **Desktop (≥768px)** — 2-column gallery grid, 44px style circles, 80px shutter
- **Tablet/Mobile (<768px)** — 1-column gallery, 36px style circles, 72px shutter, touch-optimized

## Architecture

### `index.html` (113 lines)
Semantic structure only. All content divided into immersive scenes:
- Power-on overlay with iris animation
- Fullscreen viewfinder with video + overlays
- Flash overlay
- Gallery panel
- Permission request dialog

### `style.css` (872 lines)
Complete visual design with 10+ keyframe animations:
- CSS variables for warm nostalgic color palette
- Z-index layering system for scene management
- Responsive grid layouts
- SVG-based grain overlay (no canvas pixel reads)
- Smooth transitions and micro-interactions

### `app.js` (863 lines)
Modular ES6 objects:
- **AppState** — Central state machine
- **CameraManager** — getUserMedia initialization and frame capture
- **PolaroidRenderer** — 7-layer polaroid composition (includes grain bug fix)
- **SoundEngine** — Web Audio API synthesis for all sound effects
- **UIController** — User interaction orchestration

## Technical Highlights

### Grain Bug Fix
Previous version: `getImageData()` on video-derived canvas threw `SecurityError`, causing even-numbered photos to black out.

**Solution:** Write-only grain technique using clean canvas with `Math.random()`, composited via `drawImage()` with `overlay` blend mode. Never reads tainted canvas pixels.

### Sound Design
All sounds are synthesized via Web Audio API:
- **Power-On** — Relay click + 60Hz electrical hum + warm 440Hz startup tone + film rattle
- **Shutter** — Pre-click (mirror) → main click (thump + mid-range) → post-click (blade close)
- **Film Advance** — Sawtooth motor whir with AM tremolo + paper drag noise + mechanical stop
- **Development** — Subtle pink noise (1/f) with periodic chemical ticks

### Performance
- Single-threaded JS execution (no workers)
- CSS-only animations (GPU-accelerated)
- SVG-based grain overlay (compositor-rendered)
- Lazy AudioContext initialization (only on user gesture)
- Minimal DOM churn (elements reused where possible)

## Browser Support

Requires:
- `getUserMedia` API (camera access)
- `AudioContext` (Web Audio synthesis)
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6 JavaScript

**Tested:** Chrome, Firefox, Safari, Edge (all latest)
**Mobile:** iOS Safari 14+, Chrome for Android

## Versioning

Semantic versioning: v0.0 → v0.1 → v0.2 → v1.0 → v1.1, etc.

Commit messages follow convention: `v#.# - Capital first word, 1-10 words`

### Recent Versions
- **v2.1** — Mirror fix, camera reconnect, mobile responsive, credits
- **v2.0** — Frame margins, shutter blocking during print, favicon, OG meta
- **v1.9** — Camera frame container, viewfinder reticle, film sprocket sides
- **v1.8** — Ruler zoom meter, 10-photo limit, delete photos, export all
- **v1.3** — Roulette-style theme picker with scroll auto-select
- **v1.0** — Photo-only canvas, stacked thumbnails, film roulette
- **v0.2** — Complete immersive redesign with grain bug fix
- **v0.0** — Initial polaroid camera web app

## Troubleshooting

**Camera not showing after "Allow"?**
- Open browser console (F12) to see detailed logs
- Check browser permissions for camera access
- Try refreshing the page
- Ensure HTTPS or localhost (getUserMedia requires secure context)

**No sounds?**
- Check device volume
- Browser may require user gesture before first sound (try taking a photo)
- Some browsers may suppress autoplay audio

**Photos all look dark/washed out?**
- Try different filter styles using the style picker
- Adjust camera position or lighting
- Photos are designed to look vintage — this is intentional

## License

Open source. Feel free to use, modify, and share.

---

**Made by:** [Justin Liao](https://justinliao.me) &middot; [@imjustinliao](https://x.com/imjustinliao)
**Inspired by:** Fujifilm Instax design philosophy and the magic of instant photography
**Live demo:** [imjustinliao.github.io/polaroid-camera](https://imjustinliao.github.io/polaroid-camera/)
**Source:** [GitHub](https://github.com/imjustinliao/polaroid-camera)
