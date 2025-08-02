import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './GlassCursorSimple.css';

const GlassCursorSimple: React.FC = () => {
  const innerDotRef = useRef<HTMLDivElement>(null);
  const outerCircleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(innerDotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: 'power3.out',
      });
      gsap.to(outerCircleRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={innerDotRef} className="cursor-simple-inner"></div>
      <div ref={outerCircleRef} className="cursor-simple-outer"></div>
    </>
  );
};

export default GlassCursorSimple;
