import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 300;

function getFrameUrl(index: number): string {
  const paddedIndex = String(index).padStart(6, '0');
  return `/frames/frame_${paddedIndex}.jpg`;
}

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const frames: (ImageBitmap | HTMLImageElement)[] = new Array(TOTAL_FRAMES);
    const loadedStatus: boolean[] = new Array(TOTAL_FRAMES).fill(false);
    let loadedCount = 0;

    let currentFrameIndex = 0;
    let targetFrameIndex = 0;
    let lastDrawnIndex = -1;
    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      lastDrawnIndex = -1;
      renderFrame(Math.round(currentFrameIndex));
    };

    const renderFrame = (index: number) => {
      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
      if (clampedIndex === lastDrawnIndex && lastDrawnIndex !== -1) return;

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
      const imgWidth = imgToDraw.width || (imgToDraw as HTMLImageElement).naturalWidth;
      const imgHeight = imgToDraw.height || (imgToDraw as HTMLImageElement).naturalHeight;

      if (!imgWidth || !imgHeight) return;

      const canvasAspect = canvasWidth / canvasHeight;
      const imgAspect = imgWidth / imgHeight;

      let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

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

      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);
      lastDrawnIndex = clampedIndex;
    };

    const updateTargetFrame = () => {
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
    };

    const animate = () => {
      const diff = targetFrameIndex - currentFrameIndex;
      if (Math.abs(diff) > 0.001) {
        currentFrameIndex += diff * 0.12;
        renderFrame(Math.round(currentFrameIndex));
      } else if (Math.round(currentFrameIndex) !== Math.round(targetFrameIndex)) {
        currentFrameIndex = targetFrameIndex;
        renderFrame(Math.round(currentFrameIndex));
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const preloadFrames = () => {
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
          const progressPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          setLoadProgress(progressPercent);

          if (i === 0) {
            renderFrame(0);
          }

          if (loadedCount === TOTAL_FRAMES) {
            setTimeout(() => setIsLoaded(true), 300);
          }
        };

        img.onerror = () => {
          setTimeout(() => {
            img.src = getFrameUrl(i);
          }, 800);
        };
      }
    };

    resizeCanvas();
    preloadFrames();
    updateTargetFrame();
    animate();

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('orientationchange', resizeCanvas, { passive: true });
    window.addEventListener('scroll', updateTargetFrame, { passive: true });
    window.addEventListener('wheel', updateTargetFrame, { passive: true });
    window.addEventListener('touchmove', updateTargetFrame, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('scroll', updateTargetFrame);
      window.removeEventListener('wheel', updateTargetFrame);
      window.removeEventListener('touchmove', updateTargetFrame);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 translate-z-0 backface-hidden contain-strict"
      />
      {!isLoaded && (
        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all duration-150"
          style={{ width: `${loadProgress}%` }}
        />
      )}
    </>
  );
};
