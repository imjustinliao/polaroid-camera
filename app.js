/* ────────────────────────────────────────────────────────────────────────────── */
/* POLAROID CAMERA - APPLICATION LOGIC */
/* ────────────────────────────────────────────────────────────────────────────── */

// ══════════════════════════════════════════════════════════════════════════════
// STYLES CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

const STYLES = {
  classic: {
    name: 'Classic',
    borderColor: '#ede4d3',
    paperColor: '#f5f0e8',
    paperTexture: { baseFreq: '.65', octaves: 4, opacity: 0.06 },
    photoFilter: 'saturate(0.9) contrast(1.05)',
    tint: null,
    grain: 0.01,
    lightLeak: null,
    vignette: true,
  },
  warm: {
    name: 'Warm',
    borderColor: '#f5d5b8',
    paperColor: '#faf0e4',
    paperTexture: { baseFreq: '.5', octaves: 3, opacity: 0.08 },
    photoFilter: 'saturate(0.8) sepia(0.15) brightness(1.05)',
    tint: { color: 'rgba(255, 200, 100, 0.08)', op: 'screen' },
    grain: 0.015,
    lightLeak: { corner: 'topLeft', color: 'rgba(255, 180, 80, 0.4)' },
    vignette: true,
  },
  cool: {
    name: 'Cool',
    borderColor: '#d9e4f5',
    paperColor: '#edf1f8',
    paperTexture: { baseFreq: '.8', octaves: 5, opacity: 0.04 },
    photoFilter: 'saturate(0.85) hue-rotate(-5deg) brightness(0.95)',
    tint: { color: 'rgba(100, 150, 255, 0.1)', op: 'multiply' },
    grain: 0.012,
    lightLeak: null,
    vignette: true,
  },
  fade: {
    name: 'Fade',
    borderColor: '#e8d9cc',
    paperColor: '#f2ebe2',
    paperTexture: { baseFreq: '.45', octaves: 3, opacity: 0.09 },
    photoFilter: 'saturate(0.6) brightness(1.1) contrast(0.9)',
    tint: { color: 'rgba(255, 255, 255, 0.15)', op: 'screen' },
    grain: 0.018,
    lightLeak: { corner: 'both', color: 'rgba(255, 200, 150, 0.25)' },
    vignette: true,
  },
  vintage: {
    name: 'Vintage',
    borderColor: '#c9a876',
    paperColor: '#e8daba',
    paperTexture: { baseFreq: '.4', octaves: 3, opacity: 0.12 },
    photoFilter: 'saturate(0.5) sepia(0.3) brightness(0.95)',
    tint: { color: 'rgba(200, 120, 60, 0.12)', op: 'overlay' },
    grain: 0.02,
    lightLeak: { corner: 'bottomRight', color: 'rgba(255, 200, 100, 0.35)' },
    vignette: true,
  },
  noir: {
    name: 'Noir',
    borderColor: '#d5d0c8',
    paperColor: '#eae7e0',
    paperTexture: { baseFreq: '.7', octaves: 4, opacity: 0.07 },
    photoFilter: 'saturate(0) contrast(1.2) brightness(0.95)',
    tint: null,
    grain: 0.025,
    lightLeak: null,
    vignette: true,
  },
  sunset: {
    name: 'Sunset',
    borderColor: '#f0c8a0',
    paperColor: '#faf0e0',
    paperTexture: { baseFreq: '.55', octaves: 3, opacity: 0.07 },
    photoFilter: 'saturate(1.2) contrast(1.05) brightness(1.02)',
    tint: { color: 'rgba(255, 120, 50, 0.1)', op: 'screen' },
    grain: 0.012,
    lightLeak: { corner: 'topLeft', color: 'rgba(255, 140, 60, 0.5)' },
    vignette: true,
  },
  forest: {
    name: 'Forest',
    borderColor: '#c8d4c0',
    paperColor: '#e8ede4',
    paperTexture: { baseFreq: '.35', octaves: 2, opacity: 0.1 },
    photoFilter: 'saturate(0.75) hue-rotate(15deg) brightness(0.92)',
    tint: { color: 'rgba(60, 120, 60, 0.08)', op: 'multiply' },
    grain: 0.014,
    lightLeak: null,
    vignette: true,
  },
  rose: {
    name: 'Rose',
    borderColor: '#e8c8d0',
    paperColor: '#f5e8ed',
    paperTexture: { baseFreq: '.75', octaves: 5, opacity: 0.05 },
    photoFilter: 'saturate(0.85) brightness(1.02)',
    tint: { color: 'rgba(200, 100, 130, 0.08)', op: 'screen' },
    grain: 0.01,
    lightLeak: { corner: 'both', color: 'rgba(255, 160, 180, 0.2)' },
    vignette: true,
  },
  arctic: {
    name: 'Arctic',
    borderColor: '#dce8f0',
    paperColor: '#f0f4f8',
    paperTexture: { baseFreq: '.9', octaves: 5, opacity: 0.03 },
    photoFilter: 'saturate(0.7) brightness(1.1) hue-rotate(-10deg)',
    tint: { color: 'rgba(180, 210, 240, 0.1)', op: 'screen' },
    grain: 0.008,
    lightLeak: null,
    vignette: true,
  },
  amber: {
    name: 'Amber',
    borderColor: '#d8b880',
    paperColor: '#ece0c8',
    paperTexture: { baseFreq: '.4', octaves: 2, opacity: 0.11 },
    photoFilter: 'saturate(0.65) sepia(0.2) contrast(1.08)',
    tint: { color: 'rgba(180, 130, 50, 0.1)', op: 'overlay' },
    grain: 0.022,
    lightLeak: { corner: 'bottomRight', color: 'rgba(220, 170, 60, 0.3)' },
    vignette: true,
  },
  dusk: {
    name: 'Dusk',
    borderColor: '#c0b0d0',
    paperColor: '#e8e0f0',
    paperTexture: { baseFreq: '.6', octaves: 4, opacity: 0.08 },
    photoFilter: 'saturate(0.7) hue-rotate(-20deg) brightness(0.9)',
    tint: { color: 'rgba(100, 60, 150, 0.08)', op: 'overlay' },
    grain: 0.016,
    lightLeak: { corner: 'topLeft', color: 'rgba(180, 120, 220, 0.25)' },
    vignette: true,
  },
};

// Canvas output = photo only (square). The HTML card provides the polaroid frame.
const PHOTO_SIZE = 800;

// ══════════════════════════════════════════════════════════════════════════════
// PHOTO STORAGE — persist photos in localStorage as data URLs
// ══════════════════════════════════════════════════════════════════════════════

const PhotoStorage = {
  KEY: 'polaroid-photos',

  save(photos) {
    try {
      const data = photos.map(p => ({
        dataUrl: p.canvas.toDataURL('image/png'),
        styleKey: p.styleKey,
        timestamp: p.timestamp || Date.now(),
      }));
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save photos to localStorage:', e);
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Could not load photos from localStorage:', e);
      return [];
    }
  },

  dataUrlToCanvas(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };
      img.onerror = () => resolve(null);
      img.src = dataUrl;
    });
  },

  clear() {
    localStorage.removeItem(this.KEY);
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// APP STATE
// ══════════════════════════════════════════════════════════════════════════════

const AppState = {
  current: 'poweron', // 'poweron', 'viewfinder', 'capturing', 'gallery'
  photoCount: 10,
  currentStyle: 'classic',
  photos: [],
  isCapturing: false,
  isCameraReady: false,
  cameraFacingMode: 'environment', // 'environment' or 'user'

  transition(to) {
    console.log('Transitioning to state:', to);
    this.current = to;
    this.updateSceneVisibility();
  },

  updateSceneVisibility() {
    const scenes = {
      poweron: ['scene-poweron'],
      viewfinder: ['scene-viewfinder'],
      gallery: ['scene-gallery'],
    };

    const activeScenes = scenes[this.current] || [];
    ['scene-poweron', 'scene-viewfinder', 'scene-gallery'].forEach(sceneId => {
      const scene = document.getElementById(sceneId);
      if (activeScenes.includes(sceneId)) {
        scene.classList.add('active');
        console.log('Made scene active:', sceneId);
      } else {
        scene.classList.remove('active');
      }
    });
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// CAMERA MANAGER
// ══════════════════════════════════════════════════════════════════════════════

const CameraManager = {
  stream: null,
  videoEl: null,

  async init() {
    if (!this.videoEl) {
      this.videoEl = document.getElementById('camera-feed');
    }

    try {
      // Stop any existing stream
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: { ideal: AppState.cameraFacingMode },
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      };

      console.log('Requesting camera with constraints:', constraints);
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Got camera stream, setting to video element');

      this.videoEl.srcObject = this.stream;

      // Mirror for front/selfie camera
      // On desktop/laptop: no facingMode in settings → it's a front webcam
      // On mobile: facingMode 'user' = front, 'environment' = back
      const videoTrack = this.stream.getVideoTracks()[0];
      const trackSettings = videoTrack.getSettings?.() || {};
      const isRearCamera = trackSettings.facingMode === 'environment';
      this._isMirrored = !isRearCamera;
      if (this._isMirrored) {
        this.videoEl.classList.add('mirror');
      } else {
        this.videoEl.classList.remove('mirror');
      }

      // Wait for video to load
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn('Video metadata did not load, resolving anyway');
          resolve(true);
        }, 5000);

        this.videoEl.onloadedmetadata = () => {
          clearTimeout(timeout);
          console.log('Video metadata loaded, starting playback');
          this.videoEl.play().catch(e => {
            console.warn('Video play error:', e);
          });

          // Watch for track ending (device sleep, tab switch, etc.)
          const tracks = this.stream.getTracks();
          tracks.forEach(track => {
            track.onended = () => {
              console.log('Camera track ended — showing reconnect');
              AppState.isCameraReady = false;
              UIController.showPermissionPrompt();
            };
          });

          resolve(true);
        };
      });
    } catch (err) {
      console.error('Camera initialization error:', err);
      return false;
    }
  },

  async toggleFacingMode() {
    AppState.cameraFacingMode = AppState.cameraFacingMode === 'environment' ? 'user' : 'environment';
    await this.init();
  },

  async flashTorch() {
    // Only flash torch on rear camera if supported
    if (AppState.cameraFacingMode !== 'environment' || !this.stream) return;
    try {
      const track = this.stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.();
      if (capabilities?.torch) {
        await track.applyConstraints({ advanced: [{ torch: true }] });
        setTimeout(async () => {
          try {
            await track.applyConstraints({ advanced: [{ torch: false }] });
          } catch (e) { /* ignore */ }
        }, 300);
      }
    } catch (e) {
      // Torch not supported — silently ignore
    }
  },

  capture(zoomLevel = 1) {
    const vw = this.videoEl.videoWidth || 1280;
    const vh = this.videoEl.videoHeight || 960;
    // Crop to the zoomed square center region
    const side = Math.min(vw, vh) / zoomLevel;
    const sx = (vw - side) / 2;
    const sy = (vh - side) / 2;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Mirror capture for front-facing cameras to match viewfinder
    if (this._isMirrored) {
      ctx.translate(800, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(this.videoEl, sx, sy, side, side, 0, 0, 800, 800);
    return canvas;
  },

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// POLAROID RENDERER
// ══════════════════════════════════════════════════════════════════════════════

const PolaroidRenderer = {
  render(photoCanvas, styleKey) {
    const style = STYLES[styleKey];
    const canvas = document.createElement('canvas');
    // Output is photo-only square — the HTML card provides the polaroid frame
    canvas.width = PHOTO_SIZE;
    canvas.height = PHOTO_SIZE;
    const ctx = canvas.getContext('2d');

    // Layer 1: Photo (center-cropped square, fills entire canvas)
    ctx.filter = style.photoFilter;
    this.drawCroppedSquare(ctx, photoCanvas, 0, 0, PHOTO_SIZE, PHOTO_SIZE);
    ctx.filter = 'none';

    // Layer 2: Tint
    if (style.tint) {
      ctx.globalCompositeOperation = style.tint.op;
      ctx.fillStyle = style.tint.color;
      ctx.fillRect(0, 0, PHOTO_SIZE, PHOTO_SIZE);
      ctx.globalCompositeOperation = 'source-over';
    }

    // Layer 3: Film grain
    if (style.grain > 0) {
      this.applyGrainWriteOnly(ctx, PHOTO_SIZE, PHOTO_SIZE, style.grain);
    }

    // Layer 4: Light leak
    if (style.lightLeak) {
      this.applyLightLeak(ctx, PHOTO_SIZE, PHOTO_SIZE, style.lightLeak);
    }

    // Layer 5: Vignette
    if (style.vignette) {
      this.applyVignette(ctx, PHOTO_SIZE, PHOTO_SIZE);
    }

    // Layer 6: White noise — subtle camera sensor noise for authentic feel
    this.applyWhiteNoise(ctx, PHOTO_SIZE, PHOTO_SIZE, 0.015);

    return canvas;
  },

  drawCroppedSquare(ctx, img, dx, dy, dw, dh) {
    const srcW = img.width;
    const srcH = img.height;
    const side = Math.min(srcW, srcH);
    const sx = (srcW - side) / 2;
    const sy = (srcH - side) / 2;
    ctx.drawImage(img, sx, sy, side, side, dx, dy, dw, dh);
  },

  applyGrainWriteOnly(ctx, width, height, intensity) {
    // Create a clean, untainted grain canvas using only Math.random()
    // This avoids reading from the tainted photoCanvas
    const gc = document.createElement('canvas');
    gc.width = width;
    gc.height = height;
    const gctx = gc.getContext('2d');

    // Draw random dots of varying opacity and brightness
    const dotCount = Math.floor(width * height * intensity * 0.15);
    for (let i = 0; i < dotCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 1.2;
      const alpha = Math.random() * 0.35;
      const isBright = Math.random() > 0.5;

      gctx.beginPath();
      gctx.arc(x, y, radius, 0, Math.PI * 2);
      gctx.fillStyle = isBright
        ? `rgba(255, 245, 220, ${alpha})`
        : `rgba(20, 10, 0, ${alpha})`;
      gctx.fill();
    }

    // Composite onto output canvas without reading it
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(gc, 0, 0);
    ctx.restore();
  },

  applyLightLeak(ctx, width, height, options) {
    const { corner, color } = options;
    const corners = corner === 'both' ? ['topLeft', 'bottomRight'] : [corner];

    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    for (const c of corners) {
      const x = c.includes('Left') ? 0 : width;
      const y = c.includes('top') ? 0 : height;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, width * 0.6);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
  },

  applyVignette(ctx, width, height) {
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.8);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  },

  applyWhiteNoise(ctx, width, height, intensity) {
    // Subtle white noise — simulates camera sensor noise
    const nc = document.createElement('canvas');
    nc.width = width;
    nc.height = height;
    const nctx = nc.getContext('2d');

    const dotCount = Math.floor(width * height * intensity);
    for (let i = 0; i < dotCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const val = Math.random();
      const alpha = Math.random() * 0.12;
      nctx.fillStyle = val > 0.5
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(0, 0, 0, ${alpha})`;
      nctx.fillRect(x, y, 1, 1);
    }

    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(nc, 0, 0);
    ctx.restore();
  },

  copyCanvas(source) {
    const copy = document.createElement('canvas');
    copy.width = source.width;
    copy.height = source.height;
    const ctx = copy.getContext('2d');
    ctx.drawImage(source, 0, 0);
    return copy;
  },

  buildPolaroidElement(canvas, styleKey, copyCanvasData = false) {
    const style = STYLES[styleKey];
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    // Apply the style's paper color and unique texture
    const paperBg = style.paperColor || '#f5f0e8';
    const tex = style.paperTexture || { baseFreq: '.65', octaves: 4, opacity: 0.06 };
    const textureSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${tex.baseFreq}' numOctaves='${tex.octaves}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23t)' opacity='${tex.opacity}'/%3E%3C/svg%3E")`;
    card.style.background = `${textureSvg}, ${paperBg}`;
    card.style.backgroundSize = '120px 120px, 100% 100%';

    const displayCanvas = copyCanvasData ? this.copyCanvas(canvas) : canvas;

    const photoWrap = document.createElement('div');
    photoWrap.className = 'photo-wrap';
    photoWrap.appendChild(displayCanvas);

    const developOverlay = document.createElement('div');
    developOverlay.className = 'develop-overlay';
    photoWrap.appendChild(developOverlay);

    // Thick bottom border (signature Polaroid)
    const bottom = document.createElement('div');
    bottom.className = 'polaroid-bottom';

    // Hover actions: expand + download
    const actions = document.createElement('div');
    actions.className = 'photo-actions';

    const expandBtn = document.createElement('div');
    expandBtn.className = 'photo-action-btn';
    expandBtn.title = 'Expand';
    expandBtn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
    expandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      UIController.showLightbox(canvas, styleKey);
    });

    const dlBtn = document.createElement('div');
    dlBtn.className = 'photo-action-btn';
    dlBtn.title = 'Download';
    dlBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
    dlBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.downloadCanvas(canvas, styleKey);
    });

    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'photo-action-btn delete-btn';
    deleteBtn.title = 'Delete';
    deleteBtn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      UIController.deletePhoto(card);
    });

    actions.appendChild(expandBtn);
    actions.appendChild(dlBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(photoWrap);
    card.appendChild(bottom);
    card.appendChild(actions);

    return card;
  },

  renderExport(photoCanvas, styleKey) {
    // Renders a full polaroid frame canvas for download
    // Proportions: equal padding top/left/right, thick bottom
    const style = STYLES[styleKey];
    const pad = 40;        // top, left, right padding
    const bottomPad = 120; // thick bottom border
    const photoSize = PHOTO_SIZE; // 800
    const w = photoSize + pad * 2;        // 880
    const h = photoSize + pad + bottomPad; // 960

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Paper background color
    ctx.fillStyle = style.paperColor || '#f5f0e8';
    ctx.fillRect(0, 0, w, h);

    // Paper texture overlay
    const tex = style.paperTexture || { baseFreq: '.65', octaves: 4, opacity: 0.06 };
    // Draw subtle noise grain for texture
    const grainCount = Math.floor(w * h * 0.002);
    for (let i = 0; i < grainCount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const alpha = Math.random() * tex.opacity * 3;
      ctx.fillStyle = Math.random() > 0.5
        ? `rgba(0, 0, 0, ${alpha})`
        : `rgba(255, 255, 255, ${alpha * 0.5})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // Draw the photo
    ctx.drawImage(photoCanvas, pad, pad, photoSize, photoSize);

    // Subtle border around photo area
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.lineWidth = 1;
    ctx.strokeRect(pad - 0.5, pad - 0.5, photoSize + 1, photoSize + 1);

    // Date stamp in the bottom border area — handwritten style
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    ctx.save();
    ctx.font = 'italic 22px Georgia, serif';
    ctx.fillStyle = 'rgba(80, 65, 50, 0.4)';
    ctx.textAlign = 'right';
    ctx.fillText(dateStr, w - pad - 8, h - 30);
    ctx.restore();

    return canvas;
  },

  downloadCanvas(canvas, styleKey) {
    // Render the full polaroid frame for export
    const exportCanvas = this.renderExport(canvas, styleKey);
    try {
      exportCanvas.toBlob((blob) => {
        if (!blob) {
          alert('Unable to save image. Your browser may restrict this for privacy reasons.');
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
        a.href = url;
        a.download = `polaroid-${styleKey}-${timestamp}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (err) {
      console.error('Download error:', err);
      alert('Unable to save image. Your browser may restrict this for privacy reasons.');
    }
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// SOUND ENGINE
// ══════════════════════════════════════════════════════════════════════════════

const SoundEngine = {
  audioCtx: null,

  ensureContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  },

  playPowerOn() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;

    // Relay click at start
    const clickBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.005), ctx.sampleRate);
    const clickData = clickBuffer.getChannelData(0);
    for (let i = 0; i < clickData.length; i++) {
      clickData[i] = (Math.random() * 2 - 1) * (1 - i / clickData.length);
    }
    const clickSource = ctx.createBufferSource();
    clickSource.buffer = clickBuffer;
    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.4, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.005);
    clickSource.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickSource.start(now);

    // Warm 60Hz hum with ramp
    const humOsc = ctx.createOscillator();
    humOsc.type = 'sine';
    humOsc.frequency.value = 60;
    const humGain = ctx.createGain();
    humGain.gain.setValueAtTime(0, now);
    humGain.gain.linearRampToValueAtTime(0.15, now + 0.3);
    humGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    humOsc.connect(humGain);
    humGain.connect(ctx.destination);
    humOsc.start(now);
    humOsc.stop(now + 1.2);

    // Warm startup tone at 440Hz
    const startOsc = ctx.createOscillator();
    startOsc.type = 'sine';
    startOsc.frequency.setValueAtTime(440, now + 0.1);
    startOsc.frequency.exponentialRampToValueAtTime(380, now + 0.6);
    const startGain = ctx.createGain();
    startGain.gain.setValueAtTime(0, now + 0.1);
    startGain.gain.linearRampToValueAtTime(0.25, now + 0.15);
    startGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    startOsc.connect(startGain);
    startGain.connect(ctx.destination);
    startOsc.start(now + 0.1);
    startOsc.stop(now + 0.8);

    // Film rattle noise
    const rattleBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.15), ctx.sampleRate);
    const rattleData = rattleBuffer.getChannelData(0);
    for (let i = 0; i < rattleData.length; i++) {
      const env = Math.sin(Math.PI * (i / rattleData.length));
      rattleData[i] = (Math.random() * 2 - 1) * env * 0.3;
    }
    const rattleSource = ctx.createBufferSource();
    rattleSource.buffer = rattleBuffer;
    const rattleFilter = ctx.createBiquadFilter();
    rattleFilter.type = 'highpass';
    rattleFilter.frequency.value = 2000;
    const rattleGain = ctx.createGain();
    rattleGain.gain.setValueAtTime(0.1, now + 0.3);
    rattleSource.connect(rattleFilter);
    rattleFilter.connect(rattleGain);
    rattleGain.connect(ctx.destination);
    rattleSource.start(now + 0.3);
  },

  playShutter() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;

    // Pre-click: HPF noise burst (mirror up / blade pre-travel)
    const preClickBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.008), ctx.sampleRate);
    const preClickData = preClickBuffer.getChannelData(0);
    for (let i = 0; i < preClickData.length; i++) {
      preClickData[i] = (Math.random() * 2 - 1) * (1 - i / preClickData.length);
    }
    const preClick = ctx.createBufferSource();
    preClick.buffer = preClickBuffer;
    const preFilter = ctx.createBiquadFilter();
    preFilter.type = 'highpass';
    preFilter.frequency.value = 6000;
    const preGain = ctx.createGain();
    preGain.gain.setValueAtTime(0.2, now);
    preClick.connect(preFilter);
    preFilter.connect(preGain);
    preGain.connect(ctx.destination);
    preClick.start(now);

    // Main click: low thump + mid noise
    const mainOsc = ctx.createOscillator();
    mainOsc.type = 'sine';
    mainOsc.frequency.setValueAtTime(200, now + 0.008);
    mainOsc.frequency.exponentialRampToValueAtTime(60, now + 0.038);
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.3, now + 0.008);
    mainGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    mainOsc.connect(mainGain);
    mainGain.connect(ctx.destination);
    mainOsc.start(now + 0.008);
    mainOsc.stop(now + 0.04);

    // Mid noise for main click
    const midBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.03), ctx.sampleRate);
    const midData = midBuffer.getChannelData(0);
    for (let i = 0; i < midData.length; i++) {
      midData[i] = (Math.random() * 2 - 1) * 0.4;
    }
    const midSource = ctx.createBufferSource();
    midSource.buffer = midBuffer;
    const midFilter = ctx.createBiquadFilter();
    midFilter.type = 'bandpass';
    midFilter.frequency.value = 2500;
    midFilter.Q.value = 1.2;
    const midGain = ctx.createGain();
    midGain.gain.setValueAtTime(0.2, now + 0.008);
    midGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    midSource.connect(midFilter);
    midFilter.connect(midGain);
    midGain.connect(ctx.destination);
    midSource.start(now + 0.008);

    // Post-click: blade close (BPF at 4000Hz)
    const postBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.02), ctx.sampleRate);
    const postData = postBuffer.getChannelData(0);
    for (let i = 0; i < postData.length; i++) {
      postData[i] = (Math.random() * 2 - 1) * (1 - i / postData.length);
    }
    const postSource = ctx.createBufferSource();
    postSource.buffer = postBuffer;
    const postFilter = ctx.createBiquadFilter();
    postFilter.type = 'bandpass';
    postFilter.frequency.value = 4000;
    postFilter.Q.value = 2;
    const postGain = ctx.createGain();
    postGain.gain.setValueAtTime(0.12, now + 0.038);
    postGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    postSource.connect(postFilter);
    postFilter.connect(postGain);
    postGain.connect(ctx.destination);
    postSource.start(now + 0.038);
  },

  playFilmAdvance() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    const duration = 1.8;

    // Sawtooth motor whir with AM modulation
    const motorOsc = ctx.createOscillator();
    motorOsc.type = 'sawtooth';
    motorOsc.frequency.setValueAtTime(85, now);
    motorOsc.frequency.linearRampToValueAtTime(120, now + 0.3);
    motorOsc.frequency.setValueAtTime(100, now + duration - 0.2);
    motorOsc.frequency.linearRampToValueAtTime(40, now + duration);

    // AM tremolo
    const amOsc = ctx.createOscillator();
    amOsc.type = 'sine';
    amOsc.frequency.value = 15;
    const amGain = ctx.createGain();
    amGain.gain.value = 0.4;

    // Lowpass filter
    const motorLpf = ctx.createBiquadFilter();
    motorLpf.type = 'lowpass';
    motorLpf.frequency.value = 800;
    motorLpf.Q.value = 1.5;

    const motorGain = ctx.createGain();
    motorGain.gain.setValueAtTime(0, now);
    motorGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    motorGain.gain.setValueAtTime(0.18, now + duration - 0.15);
    motorGain.gain.linearRampToValueAtTime(0, now + duration);

    amOsc.connect(amGain);
    amGain.connect(motorOsc.frequency);
    motorOsc.connect(motorLpf);
    motorLpf.connect(motorGain);
    motorGain.connect(ctx.destination);

    motorOsc.start(now);
    amOsc.start(now);
    motorOsc.stop(now + duration);
    amOsc.stop(now + duration);

    // Paper drag noise
    const dragBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
    const dragData = dragBuffer.getChannelData(0);
    for (let i = 0; i < dragData.length; i++) {
      const t = i / ctx.sampleRate;
      const env = Math.sin(Math.PI * (t / duration));
      dragData[i] = (Math.random() * 2 - 1) * env * 0.25;
    }
    const dragSource = ctx.createBufferSource();
    dragSource.buffer = dragBuffer;
    const dragHpf = ctx.createBiquadFilter();
    dragHpf.type = 'highpass';
    dragHpf.frequency.value = 800;
    const dragGain = ctx.createGain();
    dragGain.gain.setValueAtTime(0.08, now);
    dragSource.connect(dragHpf);
    dragHpf.connect(dragGain);
    dragGain.connect(ctx.destination);
    dragSource.start(now);

    // Mechanical stop thump at end
    const stopOsc = ctx.createOscillator();
    stopOsc.type = 'sine';
    stopOsc.frequency.setValueAtTime(180, now + duration - 0.08);
    stopOsc.frequency.exponentialRampToValueAtTime(40, now + duration);
    const stopGain = ctx.createGain();
    stopGain.gain.setValueAtTime(0.15, now + duration - 0.08);
    stopGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    stopOsc.connect(stopGain);
    stopGain.connect(ctx.destination);
    stopOsc.start(now + duration - 0.08);
    stopOsc.stop(now + duration);
  },

  playDevelopment() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    const duration = 2.0;

    // Pink noise (1/f) - very subtle background
    const noiseBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < noiseData.length; i++) {
      const white = Math.random() * 2 - 1;
      const out = (lastOut + white) * 0.5;
      noiseData[i] = out * 0.15;
      lastOut = out;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    const noiseLpf = ctx.createBiquadFilter();
    noiseLpf.type = 'lowpass';
    noiseLpf.frequency.value = 600;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.03, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    noiseSource.connect(noiseLpf);
    noiseLpf.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);

    // Periodic chemical ticks
    for (let tick = 0; tick < 3; tick++) {
      const tickTime = now + 0.4 + tick * 0.6;
      const tickOsc = ctx.createOscillator();
      tickOsc.type = 'sine';
      tickOsc.frequency.setValueAtTime(800, tickTime);
      tickOsc.frequency.exponentialRampToValueAtTime(200, tickTime + 0.015);
      const tickGain = ctx.createGain();
      tickGain.gain.setValueAtTime(0.05, tickTime);
      tickGain.gain.exponentialRampToValueAtTime(0.001, tickTime + 0.015);
      tickOsc.connect(tickGain);
      tickGain.connect(ctx.destination);
      tickOsc.start(tickTime);
      tickOsc.stop(tickTime + 0.015);
    }
  },

  playDenied() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    // Short descending tone — "nope"
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  },

  trigger(sequence = 'full') {
    const sequences = {
      poweron: () => {
        this.playPowerOn();
      },
      full: () => {
        this.playShutter();
        setTimeout(() => this.playFilmAdvance(), 50);
        setTimeout(() => this.playDevelopment(), 1600);
      },
      denied: () => {
        this.playDenied();
      },
    };
    sequences[sequence]?.();
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// UI CONTROLLER
// ══════════════════════════════════════════════════════════════════════════════

const UIController = {
  async init() {
    this.bindElements();
    this.initStylePicker();
    this.bindShutterButton();
    this.bindCameraToggle();
    this.bindGalleryButtons();
    this.initThemePickerDrag();
    this.initZoom();

    // Load saved photos from localStorage
    this.loadSavedPhotos();

    // Start power-on sequence
    this.startPowerOn();
  },

  bindElements() {
    this.sceneViewfinder = document.getElementById('scene-viewfinder');
    this.scenePoweron = document.getElementById('scene-poweron');
    this.sceneFlash = document.getElementById('scene-flash');
    this.sceneGallery = document.getElementById('scene-gallery');
    this.ejectionStage = document.getElementById('eject-stage');
    this.shutterBtn = document.getElementById('shutter-btn');
    this.filmCounter = document.querySelector('.film-counter');
    this.styleName = document.querySelector('.style-name');
    this.permissionOverlay = document.getElementById('permission-overlay');
    this.allowCameraBtn = document.getElementById('allow-camera-btn');
    this.galleryGrid = document.getElementById('gallery-grid');
    this.photoStack = document.getElementById('photo-stack');
    this.irisOverlay = document.querySelector('.iris-overlay');
  },

  initStylePicker() {
    const picker = document.getElementById('style-picker');
    this.styleOptions = [];

    for (const [key, style] of Object.entries(STYLES)) {
      const option = document.createElement('div');
      option.className = 'style-option';
      option.dataset.styleKey = key;
      option.style.backgroundColor = style.borderColor;
      option.title = style.name;
      // Clicking scrolls to center (which then auto-selects)
      option.addEventListener('click', () => {
        const wrapperWidth = picker.parentElement.offsetWidth;
        picker.scrollTo({
          left: option.offsetLeft - (wrapperWidth / 2) + (option.offsetWidth / 2),
          behavior: 'smooth',
        });
      });
      picker.appendChild(option);
      this.styleOptions.push({ key, element: option });
    }

    // Scroll listener — whichever option is closest to center gets selected
    let scrollTimeout;
    picker.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => this.selectCenteredStyle(), 60);
      // Real-time visual feedback during scroll
      this.updatePickerVisuals();
    });

    // Center first option — retry until wrapper has width (it starts hidden)
    const centerFirst = () => {
      const wrapperWidth = picker.parentElement.offsetWidth;
      if (wrapperWidth === 0) {
        requestAnimationFrame(centerFirst);
        return;
      }
      const first = this.styleOptions[0].element;
      picker.scrollLeft = first.offsetLeft - (wrapperWidth / 2) + (first.offsetWidth / 2);
      this.selectCenteredStyle();
      this.updatePickerVisuals();
    };
    // Also re-center after viewfinder becomes visible
    setTimeout(centerFirst, 100);
    setTimeout(centerFirst, 2500); // after power-on animation completes
  },

  selectCenteredStyle() {
    const picker = document.getElementById('style-picker');
    const wrapperWidth = picker.parentElement.offsetWidth;
    const centerX = picker.scrollLeft + (wrapperWidth / 2);

    let closest = null;
    let closestDist = Infinity;

    for (const { key, element } of this.styleOptions) {
      const optCenter = element.offsetLeft + (element.offsetWidth / 2);
      const dist = Math.abs(optCenter - centerX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = { key, element };
      }
    }

    if (closest && AppState.currentStyle !== closest.key) {
      document.querySelectorAll('.style-option').forEach(opt => opt.classList.remove('selected'));
      closest.element.classList.add('selected');
      AppState.currentStyle = closest.key;
      this.styleName.textContent = STYLES[closest.key].name.toUpperCase();
    }
  },

  updatePickerVisuals() {
    // Scale/opacity based on distance from center for roulette feel
    const picker = document.getElementById('style-picker');
    const wrapperWidth = picker.parentElement.offsetWidth;
    const centerX = picker.scrollLeft + (wrapperWidth / 2);

    for (const { element } of this.styleOptions) {
      const optCenter = element.offsetLeft + (element.offsetWidth / 2);
      const dist = Math.abs(optCenter - centerX);
      const maxDist = wrapperWidth / 2;
      const t = Math.min(dist / maxDist, 1); // 0 = center, 1 = edge

      const scale = 1.1 - (t * 0.35); // 1.1 at center, 0.75 at edge
      const opacity = 1 - (t * 0.55); // 1.0 at center, 0.45 at edge

      element.style.transform = `scale(${scale})`;
      element.style.opacity = opacity;

      if (t < 0.15) {
        element.classList.add('selected');
        element.style.borderColor = '#fff';
      } else {
        element.classList.remove('selected');
        element.style.borderColor = 'transparent';
      }
    }
  },

  bindShutterButton() {
    this.shutterBtn.addEventListener('click', () => this.capture());
  },

  bindCameraToggle() {
    const toggleBtn = document.getElementById('toggle-camera');
    // Always bind — if device has only 1 camera, toggling is harmless
    toggleBtn.addEventListener('click', () => this.toggleCamera());
  },

  async toggleCamera() {
    this.shutterBtn.disabled = true;
    await CameraManager.toggleFacingMode();
    this.shutterBtn.disabled = false;
  },

  bindGalleryButtons() {
    this.photoStack.addEventListener('click', () => this.openGallery());
    document.getElementById('close-gallery-btn').addEventListener('click', () => this.closeGallery());
    document.getElementById('export-all-btn').addEventListener('click', () => this.exportAll());
    this.allowCameraBtn.addEventListener('click', () => this.requestCameraPermission());
  },

  initThemePickerDrag() {
    // Mouse drag support for desktop (touch uses native scroll)
    const strip = document.getElementById('style-picker');
    let isDown = false;
    let startX;
    let scrollLeft;

    strip.addEventListener('mousedown', (e) => {
      isDown = true;
      strip.style.scrollBehavior = 'auto';
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
    });
    strip.addEventListener('mouseleave', () => { isDown = false; strip.style.scrollBehavior = ''; });
    strip.addEventListener('mouseup', () => { isDown = false; strip.style.scrollBehavior = ''; });
    strip.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      strip.scrollLeft = scrollLeft - (x - startX);
    });
  },

  initZoom() {
    this.zoomLevel = 1;
    const MIN_ZOOM = 1;
    const MAX_ZOOM = 3;
    const video = document.getElementById('camera-feed');
    const track = document.querySelector('.zoom-ruler-track');
    const indicator = document.getElementById('zoom-indicator');
    const label = document.getElementById('zoom-label');
    const ticksContainer = document.getElementById('zoom-ticks');

    // Build ruler ticks: 1.0x to 3.0x
    for (let z = 10; z <= 30; z++) {
      const tick = document.createElement('div');
      const isMajor = z % 10 === 0;
      const isHalf = z % 5 === 0;
      tick.className = `zoom-tick ${isMajor ? 'major' : 'minor'}`;
      if (!isMajor && !isHalf) tick.style.width = '5px';
      ticksContainer.appendChild(tick);

      if (isMajor) {
        const lbl = document.createElement('span');
        lbl.className = 'zoom-tick-label';
        const fraction = (ticksContainer.children.length - 1) / 20;
        lbl.style.top = `${8 + fraction * (track.offsetHeight - 16)}px`;
        lbl.textContent = (z / 10).toFixed(0) + 'x';
        track.appendChild(lbl);
      }
    }

    const applyZoom = (val) => {
      this.zoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, parseFloat(val)));
      video.style.transform = `scale(${this.zoomLevel})`;
      label.textContent = this.zoomLevel.toFixed(1) + 'x';
      // Position indicator: top=1x, bottom=3x
      const frac = (this.zoomLevel - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM);
      const trackH = track.offsetHeight;
      indicator.style.top = (8 + frac * (trackH - 16)) + 'px';
    };

    // Drag on track to set zoom
    let dragging = false;
    const setZoomFromY = (clientY) => {
      const rect = track.getBoundingClientRect();
      const y = Math.max(0, Math.min(1, (clientY - rect.top - 8) / (rect.height - 16)));
      applyZoom(MIN_ZOOM + y * (MAX_ZOOM - MIN_ZOOM));
    };

    track.addEventListener('mousedown', (e) => { dragging = true; setZoomFromY(e.clientY); });
    track.addEventListener('touchstart', (e) => { dragging = true; setZoomFromY(e.touches[0].clientY); }, { passive: true });
    window.addEventListener('mousemove', (e) => { if (dragging) setZoomFromY(e.clientY); });
    window.addEventListener('touchmove', (e) => { if (dragging) setZoomFromY(e.touches[0].clientY); }, { passive: true });
    window.addEventListener('mouseup', () => { dragging = false; });
    window.addEventListener('touchend', () => { dragging = false; });

    // Keyboard: + / -
    document.addEventListener('keydown', (e) => {
      if (e.key === '+' || e.key === '=') { e.preventDefault(); applyZoom(this.zoomLevel + 0.2); }
      else if (e.key === '-' || e.key === '_') { e.preventDefault(); applyZoom(this.zoomLevel - 0.2); }
    });

    applyZoom(1);
  },

  async loadSavedPhotos() {
    const saved = PhotoStorage.load();
    if (saved.length === 0) return;

    console.log(`Loading ${saved.length} saved photos from localStorage`);
    for (const item of saved) {
      const canvas = await PhotoStorage.dataUrlToCanvas(item.dataUrl);
      if (canvas) {
        this.addPhotoToGallery(canvas, item.styleKey || 'classic', true);
      }
    }
    // Update photo count
    AppState.photoCount = Math.max(0, 10 - AppState.photos.length);
    this.filmCounter.textContent = AppState.photoCount;
  },

  startPowerOn() {
    console.log('Starting power-on sequence');
    SoundEngine.trigger('poweron');

    // After iris animation completes, fade out poweron and show viewfinder
    setTimeout(() => {
      console.log('Power-on complete, hiding overlay and showing viewfinder');
      this.scenePoweron.classList.add('done');
      this.showViewfinder();
    }, 2200);
  },

  showViewfinder() {
    // Make viewfinder visible immediately
    this.sceneViewfinder.classList.add('active');
    console.log('Viewfinder scene activated, initializing camera...');

    // Initialize camera in background
    CameraManager.init().then(success => {
      if (success) {
        console.log('Camera initialized successfully');
        AppState.isCameraReady = true;
        this.sceneViewfinder.classList.add('camera-ready');
        this.permissionOverlay.classList.add('hidden');
      } else {
        console.log('Camera initialization failed, showing permission prompt');
        this.showPermissionPrompt();
      }
    }).catch(err => {
      console.error('Camera init error:', err);
      this.showPermissionPrompt();
    });
  },

  showPermissionPrompt() {
    console.log('Showing permission prompt');
    const titleEl = document.getElementById('permission-title');
    const textEl = document.getElementById('permission-text');
    const btnEl = document.getElementById('allow-camera-btn');
    const hintEl = document.getElementById('permission-hint');

    titleEl.textContent = 'Camera Required';
    textEl.textContent = 'This Polaroid camera needs access to your device\'s camera to work.';
    btnEl.textContent = 'Allow Camera';
    btnEl.disabled = false;
    hintEl.textContent = 'Tap the button below, then allow camera access in your browser.';

    this.permissionOverlay.classList.remove('hidden');
  },

  async requestCameraPermission() {
    console.log('User tapped allow camera button');
    const btnEl = document.getElementById('allow-camera-btn');
    const textEl = document.getElementById('permission-text');

    btnEl.disabled = true;
    btnEl.textContent = 'Starting camera...';

    const permitted = await CameraManager.init();

    if (permitted) {
      console.log('Camera permission granted');
      AppState.isCameraReady = true;
      this.sceneViewfinder.classList.add('camera-ready');
      this.permissionOverlay.classList.add('hidden');
    } else {
      console.log('Camera permission denied');
      btnEl.disabled = false;
      btnEl.textContent = 'Try Again';
      textEl.textContent = 'Camera access was denied or unavailable. Please try again or check your browser settings.';
    }
  },

  async capture() {
    if (AppState.isCapturing || !AppState.isCameraReady) return;

    // Enforce 10-photo limit
    if (AppState.photoCount <= 0) {
      SoundEngine.trigger('denied');
      this.shutterBtn.classList.add('limit-reached');
      this.filmCounter.classList.add('limit-reached');
      setTimeout(() => {
        this.shutterBtn.classList.remove('limit-reached');
      }, 400);
      return;
    }

    console.log('Capturing photo...');
    AppState.isCapturing = true;
    this.shutterBtn.disabled = true;

    try {
      // Sound and flash
      SoundEngine.trigger('full');
      this.flashScreen();

      // Try to flash the torch on rear camera
      await CameraManager.flashTorch();

      // Capture photo synchronously
      const photoCanvas = CameraManager.capture(this.zoomLevel || 1);

      // Render polaroid
      const polaroidCanvas = PolaroidRenderer.render(photoCanvas, AppState.currentStyle);
      const polaroidElement = PolaroidRenderer.buildPolaroidElement(polaroidCanvas, AppState.currentStyle);

      // Inject into eject stage and animate — block shutter until fully done
      setTimeout(() => {
        this.ejectionStage.innerHTML = '';
        polaroidElement.classList.add('ejecting');
        this.ejectionStage.appendChild(polaroidElement);

        // After eject settles, dismiss it to gallery
        setTimeout(() => {
          polaroidElement.classList.remove('ejecting');
          polaroidElement.classList.add('dismissing');
          this.addToGallery(polaroidElement, polaroidCanvas);

          // Clean up eject stage and re-enable shutter after dismiss
          setTimeout(() => {
            this.ejectionStage.innerHTML = '';
            AppState.isCapturing = false;
            this.shutterBtn.disabled = false;
          }, 600);
        }, 2000);
      }, 200);

      // Update film counter
      AppState.photoCount--;
      this.filmCounter.textContent = Math.max(0, AppState.photoCount);
    } catch (err) {
      console.error('Capture error:', err);
      AppState.isCapturing = false;
      this.shutterBtn.disabled = false;
    }
  },

  flashScreen() {
    this.sceneFlash.classList.remove('active');
    void this.sceneFlash.offsetWidth; // Trigger reflow
    this.sceneFlash.classList.add('active');
  },

  addToGallery(_element, canvas) {
    this.addPhotoToGallery(canvas, AppState.currentStyle);
    PhotoStorage.save(AppState.photos);
  },

  addPhotoToGallery(canvas, styleKey, skipAnimation) {
    const galleryCard = PolaroidRenderer.buildPolaroidElement(canvas, styleKey, true);
    galleryCard.classList.add('gallery-photo');
    const devOverlay = galleryCard.querySelector('.develop-overlay');
    if (devOverlay) devOverlay.remove();

    const rotation = (Math.random() - 0.5) * 7;
    galleryCard.style.setProperty('--scatter-rotate', rotation + 'deg');
    if (!skipAnimation) {
      galleryCard.style.animationDelay = `${AppState.photos.length * 0.08}s`;
    }

    AppState.photos.push({ element: galleryCard, canvas, styleKey, timestamp: Date.now() });

    this.galleryGrid.appendChild(galleryCard);
    this.updatePhotoStack();
  },

  updatePhotoStack() {
    this.rebuildPhotoStack();

    // Animate the latest thumb (last child) flying in
    const stack = this.photoStack;
    const latest = stack.querySelector('.stack-thumb:last-child');
    if (latest) {
      latest.classList.add('flying');
      const stackRect = stack.getBoundingClientRect();
      const startX = (window.innerWidth / 2) - stackRect.left - (stackRect.width / 2);
      const startY = (window.innerHeight / 2) - stackRect.top - (stackRect.height / 2);
      latest.style.setProperty('--fly-start-x', startX + 'px');
      latest.style.setProperty('--fly-start-y', startY + 'px');
      setTimeout(() => latest.classList.remove('flying'), 500);
    }
  },

  openGallery() {
    AppState.transition('gallery');
    this.sceneGallery.classList.add('active');
  },

  closeGallery() {
    this.sceneGallery.classList.remove('active');
    AppState.transition('viewfinder');
  },

  deletePhoto(cardElement) {
    // Find and remove from AppState.photos
    const idx = AppState.photos.findIndex(p => p.element === cardElement);
    if (idx !== -1) {
      AppState.photos.splice(idx, 1);
    }
    // Remove from DOM with fade
    cardElement.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';
    cardElement.style.opacity = '0';
    cardElement.style.transform = 'scale(0.8)';
    setTimeout(() => cardElement.remove(), 200);

    // Update counter — give back a shot
    AppState.photoCount++;
    this.filmCounter.textContent = Math.max(0, AppState.photoCount);
    this.filmCounter.classList.remove('limit-reached');
    // Count shown in film counter (top-left)

    // Update photo stack
    this.rebuildPhotoStack();

    // Hide stack if no photos left
    if (AppState.photos.length === 0) {
      this.photoStack.classList.remove('has-photos');
    }

    // Persist
    PhotoStorage.save(AppState.photos);
  },

  rebuildPhotoStack() {
    // Remove existing thumbs
    this.photoStack.querySelectorAll('.stack-thumb').forEach(t => t.remove());

    if (AppState.photos.length === 0) {
      this.photoStack.classList.remove('has-photos');
      return;
    }

    // Show the stack
    this.photoStack.classList.add('has-photos');

    // Show last 3
    const last3 = AppState.photos.slice(-3);
    for (const photo of last3) {
      const thumb = document.createElement('div');
      thumb.className = 'stack-thumb';
      const mini = PolaroidRenderer.copyCanvas(photo.canvas);
      thumb.appendChild(mini);
      this.photoStack.appendChild(thumb);
    }
  },

  exportAll() {
    if (AppState.photos.length === 0) return;

    // Download each photo individually with a slight delay
    AppState.photos.forEach((photo, i) => {
      setTimeout(() => {
        PolaroidRenderer.downloadCanvas(photo.canvas, photo.styleKey || 'polaroid');
      }, i * 300);
    });
  },

  showLightbox(canvas, styleKey) {
    // Remove existing lightbox if any
    const existing = document.querySelector('.photo-lightbox');
    if (existing) existing.remove();

    const lightbox = document.createElement('div');
    lightbox.className = 'photo-lightbox';

    // Build a large polaroid card for display
    const card = PolaroidRenderer.buildPolaroidElement(canvas, styleKey, true);
    const devOverlay = card.querySelector('.develop-overlay');
    if (devOverlay) devOverlay.remove();
    const actionsOverlay = card.querySelector('.photo-actions');
    if (actionsOverlay) actionsOverlay.remove();

    lightbox.appendChild(card);
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
      setTimeout(() => lightbox.remove(), 200);
    });
    // Prevent closing when clicking the card itself
    card.addEventListener('click', (e) => e.stopPropagation());

    document.body.appendChild(lightbox);
    requestAnimationFrame(() => lightbox.classList.add('active'));
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  UIController.init();
});

// Allow AudioContext to be resumed on first user gesture if needed
document.addEventListener('click', () => {
  SoundEngine.ensureContext();
}, { once: true });

document.addEventListener('touchstart', () => {
  SoundEngine.ensureContext();
}, { once: true });

// Re-check camera when page becomes visible again (device wake, tab switch)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && AppState.isCameraReady) {
    // Check if stream is still active
    const stream = CameraManager.stream;
    if (!stream || stream.getTracks().every(t => t.readyState === 'ended')) {
      console.log('Camera stream lost after visibility change');
      AppState.isCameraReady = false;
      UIController.showPermissionPrompt();
    }
  }
});
