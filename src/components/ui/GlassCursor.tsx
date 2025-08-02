import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './GlassCursor.css';

// Function to generate a wobbly, blob-like SVG path
const generateBlobPath = (radius: number, segments: number, variation: number): string => {
  const angleStep = (Math.PI * 2) / segments;
  const points = [];

  for (let i = 0; i < segments; i++) {
    const angle = angleStep * i;
    const r = radius + (Math.random() - 0.5) * variation;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < segments; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % segments];
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    path += ` Q ${p1.x} ${p1.y} ${midX} ${midY}`;
  }
  path += ' Z';
  return path;
};

const GlassCursor: React.FC = () => {
  const innerDotRef = useRef<HTMLDivElement>(null);
  const outerSplashRef = useRef<HTMLDivElement>(null);
  const splashPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Generate keyframes for the wobbly animation and inject them
    const keyframes = `
      @keyframes wobble {
        0% { d: "${generateBlobPath(50, 8, 20)}"; }
        25% { d: "${generateBlobPath(50, 8, 25)}"; }
        50% { d: "${generateBlobPath(50, 8, 20)}"; }
        75% { d: "${generateBlobPath(50, 8, 25)}"; }
        100% { d: "${generateBlobPath(50, 8, 20)}"; }
      }
    `;
    const styleTag = document.createElement('style');
    styleTag.id = 'cursor-wobble-keyframes';
    styleTag.innerHTML = keyframes;
    document.head.appendChild(styleTag);

    // Mouse move listener to update cursor position
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(innerDotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.2,
        ease: 'power3.out',
      });
      gsap.to(outerSplashRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    // Splash effect on click
    const handleMouseDown = () => {
      if (!outerSplashRef.current) return;
      gsap.to(outerSplashRef.current, {
        scale: 1.4,
        duration: 0.2,
        ease: 'power3.out'
      });
    };

    const handleMouseUp = () => {
      if (!outerSplashRef.current) return;
      gsap.to(outerSplashRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      const styleElement = document.getElementById('cursor-wobble-keyframes');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={innerDotRef} className="cursor-inner-dot"></div>
      <div ref={outerSplashRef} className="cursor-outer-splash">
        <svg viewBox="-60 -60 120 120">
          <path ref={splashPathRef} className="cursor-splash-path" />
        </svg>
      </div>
    </>
  );
};

export default GlassCursor;
