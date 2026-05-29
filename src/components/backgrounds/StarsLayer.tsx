import React, { useEffect, useRef } from 'react';

// API identical to Animate UI StarsBackground props
export interface StarsBackgroundProps {
  factor?: number; // Parallax density/intensity multiplier
  speed?: number; // Global drift speed multiplier
  starColor?: string; // Default color fallback
  pointerEvents?: boolean; // Mouse movement responsiveness
  className?: string; // Additional classes for the container
}

interface Star {
  x: number;
  y: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  depth: number; // 0.1 to 1.0 (for parallax displacement and size scaling)
  baseOpacity: number;
  opacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
}

export const StarsLayer: React.FC<StarsBackgroundProps> = ({
  factor = 0.015,
  speed = 0.05,
  starColor = '#fff',
  pointerEvents = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    // Track smooth mouse offset for interactive depth/parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    // Track dark mode toggle to smoothly fade stars in/out
    let themeOpacityMultiplier = document.documentElement.classList.contains('dark') ? 1.0 : 0.0;
    let currentThemeOpacity = themeOpacityMultiplier;

    // Set up MutationObserver to detect dark mode transitions dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          themeOpacityMultiplier = isDark ? 1.0 : 0.0;
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    // Accessibility check: prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isMotionReduced = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isMotionReduced = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Track mouse coordinates for interactive parallax movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!pointerEvents || isMotionReduced) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Calculate coordinates relative to screen center
      targetMouseX = -(e.clientX - centerX) * factor;
      targetMouseY = -(e.clientY - centerY) * factor;
    };

    if (pointerEvents) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Initialize/Regenerate stars based on screen size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Scale star count based on screen area to reduce visual noise on small/large screens
      const area = canvas.width * canvas.height;
      const starCount = Math.floor(area / 16000); // 1 star per 16000px²
      initStars(Math.min(Math.max(starCount, 40), 120)); // Keep between 40 and 120 stars for minimal design
    };

    const initStars = (count: number) => {
      stars = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random() * 0.8 + 0.2; // Multi-depth layers (0.2 to 1.0)
        
        // Size scale based on depth to emphasize visual depth perspective
        const baseSize = depth < 0.4 
          ? Math.random() * 0.4 + 0.4 // 0.4px to 0.8px (Micro distant stars)
          : depth < 0.8
            ? Math.random() * 0.6 + 0.8 // 0.8px to 1.4px (Medium stars)
            : Math.random() * 0.8 + 1.4; // 1.4px to 2.2px (Large closer stars)

        // Lower density and very faint base opacities to remain in background without noise
        const baseOpacity = depth < 0.4 
          ? Math.random() * 0.2 + 0.08 // extremely dim micro stars (8% - 28%)
          : depth < 0.8
            ? Math.random() * 0.25 + 0.15 // medium stars (15% - 40%)
            : Math.random() * 0.3 + 0.2; // closer stars (20% - 50%)

        // Astro/tech steel-blue and cyan color palettes (subtle details)
        let color = starColor;
        if (depth > 0.75) {
          const rand = Math.random();
          if (rand < 0.25) color = '#00d8ff'; // Soft Cyan to match brand
          else if (rand < 0.5) color = '#7dd3fc'; // Soft Steel Blue
        }

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseSize,
          speedX: (Math.random() - 0.5) * speed * depth, // Drift based on depth layer
          speedY: (Math.random() - 0.5) * speed * depth,
          depth,
          baseOpacity,
          opacity: baseOpacity,
          twinklePhase: Math.random() * Math.PI * 2, // Random initial phase
          twinkleSpeed: Math.random() * 0.015 + 0.005, // Subtle, slow twinkling
          color,
        });
      }
    };

    const drawAndAnimate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly transition current theme opacity (dark vs. light mode)
      currentThemeOpacity += (themeOpacityMultiplier - currentThemeOpacity) * 0.08;

      // Smoothly damp mouse parallax offsets using spring-like LERP physics
      if (!isMotionReduced) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      } else {
        currentMouseX = 0;
        currentMouseY = 0;
      }

      // Draw all stars only if they are visible
      if (currentThemeOpacity > 0.001) {
        stars.forEach((star) => {
          // Add parallax shift based on depth and lerped mouse displacement
          let drawX = star.x + currentMouseX * star.depth * 5;
          let drawY = star.y + currentMouseY * star.depth * 5;

          // Boundary wraps for mouse displacements
          if (drawX < 0) drawX = canvas.width + (drawX % canvas.width);
          if (drawX > canvas.width) drawX = drawX % canvas.width;
          if (drawY < 0) drawY = canvas.height + (drawY % canvas.height);
          if (drawY > canvas.height) drawY = drawY % canvas.height;

          // Twinkle logic via sine wave oscillation (skipped if reduced motion is requested)
          if (!isMotionReduced) {
            star.twinklePhase += star.twinkleSpeed;
            // Map sine oscillation [-1, 1] to a slight opacity delta
            const twinkleDelta = Math.sin(star.twinklePhase) * 0.15;
            star.opacity = Math.max(0.02, Math.min(star.baseOpacity + twinkleDelta, 0.8));
          } else {
            star.opacity = star.baseOpacity;
          }

          // Render star particle
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.baseSize, 0, Math.PI * 2);
          
          // Apply overall theme fading factor to opacities
          ctx.fillStyle = star.color.startsWith('rgb') 
            ? star.color 
            : star.color === '#fff'
              ? `rgba(255, 255, 255, ${star.opacity * currentThemeOpacity})`
              : star.color === '#00d8ff'
                ? `rgba(0, 216, 255, ${star.opacity * currentThemeOpacity})`
                : `rgba(125, 211, 252, ${star.opacity * currentThemeOpacity})`; // #7dd3fc

          ctx.fill();

          // Continuous slow drift (skipped if prefers-reduced-motion is active)
          if (!isMotionReduced) {
            star.x += star.speedX;
            star.y += star.speedY;

            // Boundary wrap around boundaries
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;
          }
        });
      }

      animationFrameId = requestAnimationFrame(drawAndAnimate);
    };

    // Listeners and Initialization
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawAndAnimate();

    // Cleanups on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (pointerEvents) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      motionQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
    };
  }, [factor, speed, starColor, pointerEvents]);

  return (
    <div 
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-transparent ${className}`}
      aria-hidden="true"
      data-slot="stars-background"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block bg-transparent"
      />
    </div>
  );
};

// Also export as standard default name to match registry compatibility fully
export const StarsBackground = StarsLayer;
export default StarsLayer;
