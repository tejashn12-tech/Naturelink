const TOTAL_FRAMES = 300;
const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
const loaderBar = document.getElementById('loader-bar');

const frames = new Array(TOTAL_FRAMES);
const loadedStatus = new Array(TOTAL_FRAMES).fill(false);
let loadedCount = 0;

let currentFrameIndex = 0;
let targetFrameIndex = 0;
let lastDrawnIndex = -1;

function getFrameUrl(index) {
  const paddedIndex = String(index).padStart(6, '0');
  return `/frames/frame_${paddedIndex}.jpg`;
}

// Universal Responsive Canvas Sizing (Mobile, Tablet, Desktop)
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  lastDrawnIndex = -1; // Force redraw on orientation change / resize
  renderFrame(Math.round(currentFrameIndex));
}

window.addEventListener('resize', resizeCanvas, { passive: true });
window.addEventListener('orientationchange', () => {
  setTimeout(resizeCanvas, 100);
}, { passive: true });

// Universal Object-Fit Cover Math for Portrait & Landscape viewports
function renderFrame(index) {
  const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
  
  if (clampedIndex === lastDrawnIndex && lastDrawnIndex !== -1) {
    return;
  }

  let imgToDraw = frames[clampedIndex];
  if (!loadedStatus[clampedIndex]) {
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      if (clampedIndex - offset >= 0 && loadedStatus[clampedIndex - offset]) {
        imgToDraw = frames[clampedIndex - offset];
        break;
      }
      if (clampedIndex + offset < TOTAL_FRAMES && loadedStatus[clampedIndex + offset]) {
        imgToDraw = frames[clampedIndex + offset];
        break;
      }
    }
  }

  if (!imgToDraw) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = imgToDraw.width || imgToDraw.naturalWidth;
  const imgHeight = imgToDraw.height || imgToDraw.naturalHeight;

  if (!imgWidth || !imgHeight) return;

  const canvasAspect = canvasWidth / canvasHeight;
  const imgAspect = imgWidth / imgHeight;

  let drawWidth, drawHeight, offsetX, offsetY;

  if (canvasAspect > imgAspect) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgAspect;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * imgAspect;
    drawHeight = canvasHeight;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);
  lastDrawnIndex = clampedIndex;
}

// Calculate target frame from current window scroll position
function updateTargetFrame() {
  const scrollHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );
  const scrollableHeight = scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) return;
  
  const currentScroll = Math.max(
    0,
    window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  );
  
  const scrollProgress = Math.min(1, Math.max(0, currentScroll / scrollableHeight));
  targetFrameIndex = scrollProgress * (TOTAL_FRAMES - 1);
}

// Event Listeners for Mobile Touch, Desktop Wheel, and Scroll
window.addEventListener('scroll', updateTargetFrame, { passive: true });
window.addEventListener('wheel', updateTargetFrame, { passive: true });
window.addEventListener('touchmove', updateTargetFrame, { passive: true });
window.addEventListener('touchstart', updateTargetFrame, { passive: true });

// Animation Loop for 60fps linear interpolation (lerp)
function animate() {
  const diff = targetFrameIndex - currentFrameIndex;
  
  if (Math.abs(diff) > 0.001) {
    currentFrameIndex += diff * 0.12;
    renderFrame(Math.round(currentFrameIndex));
  } else if (Math.round(currentFrameIndex) !== Math.round(targetFrameIndex)) {
    currentFrameIndex = targetFrameIndex;
    renderFrame(Math.round(currentFrameIndex));
  }

  requestAnimationFrame(animate);
}

// Async preloader utilizing createImageBitmap for zero-jank GPU decoding
function preloadFrames() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFrameUrl(i);

    img.onload = async () => {
      try {
        const bitmap = await createImageBitmap(img);
        frames[i] = bitmap;
      } catch (e) {
        frames[i] = img;
      }
      
      loadedStatus[i] = true;
      loadedCount++;
      const progressPercent = (loadedCount / TOTAL_FRAMES) * 100;
      loaderBar.style.width = `${progressPercent}%`;

      if (i === 0) {
        renderFrame(0);
      }

      if (loadedCount === TOTAL_FRAMES) {
        setTimeout(() => {
          loaderBar.classList.add('done');
        }, 300);
      }
    };

    img.onerror = () => {
      setTimeout(() => {
        img.src = getFrameUrl(i);
      }, 800);
    };
  }
}

// Initialize application
function init() {
  resizeCanvas();
  preloadFrames();
  updateTargetFrame();
  requestAnimationFrame(animate);
}

init();
