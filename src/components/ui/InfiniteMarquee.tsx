import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './InfiniteMarquee.css';

interface MarqueeItem {
  image: string;
  alt: string;
  id: string;
  name: string;
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  speed?: number;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items,
  direction = 'left',
  speed = 50
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (marqueeRef.current && contentEl) {
      // Infinite marquee: seamless loop using GSAP modifiers
      const marqueeWidth = contentEl.scrollWidth;
      gsap.set(contentEl, { x: 0 });

      if (animationRef.current) animationRef.current.kill();

      animationRef.current = gsap.to(contentEl, {
        x: direction === 'left' ? -marqueeWidth / 2 : marqueeWidth / 2,
        duration: speed,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x) => {
            const px = parseFloat(x);
            if (direction === 'left') {
              return px <= -marqueeWidth / 2 ? '0' : x;
            } else {
              return px >= marqueeWidth / 2 ? '0' : x;
            }
          }
        }
      });

      const handleResize = () => {
        if (animationRef.current) animationRef.current.kill();
        gsap.set(contentEl, { x: 0 });
        const newWidth = contentEl.scrollWidth;
        animationRef.current = gsap.to(contentEl, {
          x: direction === 'left' ? -newWidth / 2 : newWidth / 2,
          duration: speed,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: (x) => {
              const px = parseFloat(x);
              if (direction === 'left') {
                return px <= -newWidth / 2 ? '0' : x;
              } else {
                return px >= newWidth / 2 ? '0' : x;
              }
            }
          }
        });
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationRef.current) animationRef.current.kill();
      };
    }
  }, [direction, speed, items]);

  const handleMouseEnter = () => {
    if (animationRef.current) animationRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (animationRef.current) animationRef.current.resume();
  };

  return (
    <div className="marquee-container" ref={marqueeRef}>
      <div
        className="marquee-content"
        ref={contentRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.concat(items).map((item, idx) => (
          <div key={item.id + idx} className="marquee-item">
            <div className="marquee-img-wrap">
              <img src={item.image} alt={item.alt} className="marquee-image" />
            </div>
            <div className="marquee-name">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
