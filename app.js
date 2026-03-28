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
    photoFilter: 'saturate(0.7) hue-rotate(-20deg) brightness(0.9)',
    tint: { color: 'rgba(100, 60, 150, 0.08)', op: 'overlay' },
    grain: 0.016,
    lightLeak: { corner: 'topLeft', color: 'rgba(180, 120, 220, 0.25)' },
    vignette: true,
  },
};

const OUTPUT_W = 800;
const OUTPUT_H = 960;
const PHOTO_X = 30;
const PHOTO_Y = 30;
const PHOTO_SIZE = 740;

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

  capture() {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoEl.videoWidth || 1280;
    canvas.height = this.videoEl.videoHeight || 960;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.videoEl, 0, 0);
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
    canvas.width = OUTPUT_W;
    canvas.height = OUTPUT_H;
    const ctx = canvas.getContext('2d');

    // Layer 1: Border fill
    ctx.fillStyle = style.borderColor;
    ctx.fillRect(0, 0, OUTPUT_W, OUTPUT_H);

    // Layer 2: Photo (center-cropped square)
    ctx.filter = style.photoFilter;
    this.drawCroppedSquare(ctx, photoCanvas, PHOTO_X, PHOTO_Y, PHOTO_SIZE, PHOTO_SIZE);
    ctx.filter = 'none';

    // Layer 3: Tint
    if (style.tint) {
      ctx.globalCompositeOperation = style.tint.op;
      ctx.fillStyle = style.tint.color;
      ctx.fillRect(PHOTO_X, PHOTO_Y, PHOTO_SIZE, PHOTO_SIZE);
      ctx.globalCompositeOperation = 'source-over';
    }

    // Layer 4: Film grain (FIX: use write-only approach, never read tainted canvas)
    if (style.grain > 0) {
      this.applyGrainWriteOnly(ctx, OUTPUT_W, OUTPUT_H, style.grain);
    }

    // Layer 5: Light leak
    if (style.lightLeak) {
      this.applyLightLeak(ctx, OUTPUT_W, OUTPUT_H, style.lightLeak);
    }

    // Layer 6: Vignette
    if (style.vignette) {
      this.applyVignette(ctx, OUTPUT_W, OUTPUT_H);
    }

    // Layer 7: Branding
    ctx.fillStyle = '#999';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Polaroid', OUTPUT_W / 2, OUTPUT_H - 16);

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

  buildPolaroidElement(canvas, styleKey) {
    const style = STYLES[styleKey];
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    // Apply the style's paper color as background
    card.style.background = style.paperColor || '#f5f0e8';

    const photoWrap = document.createElement('div');
    photoWrap.className = 'photo-wrap';
    photoWrap.appendChild(canvas);

    const developOverlay = document.createElement('div');
    developOverlay.className = 'develop-overlay';
    photoWrap.appendChild(developOverlay);

    // Thick bottom border (signature Polaroid)
    const bottom = document.createElement('div');
    bottom.className = 'polaroid-bottom';

    const caption = document.createElement('div');
    caption.className = 'polaroid-caption';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    caption.innerHTML = `
      <span class="style-label">${style.name}</span>
      <span class="capture-time">${time}</span>
    `;
    bottom.appendChild(caption);

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.textContent = 'SAVE';
    downloadBtn.addEventListener('click', () => this.downloadCanvas(canvas, styleKey));

    card.appendChild(photoWrap);
    card.appendChild(bottom);
    card.appendChild(downloadBtn);

    return card;
  },

  downloadCanvas(canvas, styleKey) {
    try {
      canvas.toBlob((blob) => {
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
    this.galleryCountBadge = document.querySelector('.gallery-count-badge');
    this.irisOverlay = document.querySelector('.iris-overlay');
  },

  initStylePicker() {
    const picker = document.getElementById('style-picker');
    for (const [key, style] of Object.entries(STYLES)) {
      const option = document.createElement('div');
      option.className = 'style-option';
      if (key === 'classic') option.classList.add('selected');
      option.style.backgroundColor = style.borderColor;
      option.title = style.name;
      option.addEventListener('click', () => this.selectStyle(key, option));
      picker.appendChild(option);
    }
  },

  selectStyle(key, element) {
    document.querySelectorAll('.style-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    AppState.currentStyle = key;
    this.styleName.textContent = STYLES[key].name.toUpperCase();
  },

  bindShutterButton() {
    this.shutterBtn.addEventListener('click', () => this.capture());
  },

  bindCameraToggle() {
    const toggleBtn = document.getElementById('toggle-camera');
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const cameras = devices.filter(d => d.kind === 'videoinput');
        if (cameras.length < 2) {
          toggleBtn.classList.add('hidden');
        } else {
          toggleBtn.addEventListener('click', () => this.toggleCamera());
        }
      });
    } else {
      toggleBtn.classList.add('hidden');
    }
  },

  async toggleCamera() {
    this.shutterBtn.disabled = true;
    await CameraManager.toggleFacingMode();
    this.shutterBtn.disabled = false;
  },

  bindGalleryButtons() {
    document.getElementById('open-gallery-btn').addEventListener('click', () => this.openGallery());
    document.getElementById('close-gallery-btn').addEventListener('click', () => this.closeGallery());
    this.allowCameraBtn.addEventListener('click', () => this.requestCameraPermission());
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
    if (AppState.isCapturing || !AppState.isCameraReady) {
      console.log('Capture ignored - capturing:', AppState.isCapturing, 'camera ready:', AppState.isCameraReady);
      return;
    }

    console.log('Capturing photo...');
    AppState.isCapturing = true;
    this.shutterBtn.disabled = true;

    try {
      // Sound and flash
      SoundEngine.trigger('full');
      this.flashScreen();

      // Capture photo synchronously
      const photoCanvas = CameraManager.capture();

      // Render polaroid
      const polaroidCanvas = PolaroidRenderer.render(photoCanvas, AppState.currentStyle);
      const polaroidElement = PolaroidRenderer.buildPolaroidElement(polaroidCanvas, AppState.currentStyle);

      // Inject into eject stage and animate
      setTimeout(() => {
        this.ejectionStage.innerHTML = '';
        polaroidElement.classList.add('ejecting');
        this.ejectionStage.appendChild(polaroidElement);

        // Re-enable shutter immediately after eject starts (user can shoot again)
        setTimeout(() => {
          AppState.isCapturing = false;
          this.shutterBtn.disabled = false;
        }, 1200);

        // After eject settles, dismiss it to gallery
        setTimeout(() => {
          polaroidElement.classList.remove('ejecting');
          polaroidElement.classList.add('dismissing');
          this.addToGallery(polaroidElement, polaroidCanvas);

          // Clean up eject stage after dismiss animation
          setTimeout(() => {
            this.ejectionStage.innerHTML = '';
          }, 600);
        }, 2200);
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

  addToGallery(element, canvas) {
    // Clone the element for gallery (remove animation classes)
    const clonedElement = element.cloneNode(true);
    clonedElement.classList.remove('ejecting');
    clonedElement.className = 'polaroid-card gallery-photo';

    // Random scatter rotation
    const rotation = (Math.random() - 0.5) * 7; // -3.5 to 3.5 degrees
    clonedElement.style.setProperty('--scatter-rotate', rotation + 'deg');
    clonedElement.style.animationDelay = `${AppState.photos.length * 0.08}s`;

    // Store photo data
    AppState.photos.push({ element: clonedElement, canvas });

    this.galleryGrid.appendChild(clonedElement);
    this.galleryCountBadge.textContent = AppState.photos.length;
  },

  openGallery() {
    AppState.transition('gallery');
    this.sceneGallery.classList.add('active');
  },

  closeGallery() {
    this.sceneGallery.classList.remove('active');
    AppState.transition('viewfinder');
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
