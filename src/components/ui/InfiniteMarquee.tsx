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
    if (marqueeRef.current && contentRef.current) {
      const marqueeWidth = contentRef.current.offsetWidth;
      const animationDirection = direction === 'left' ? -marqueeWidth : marqueeWidth;
      animationRef.current = gsap.to(contentRef.current, {
        x: animationDirection,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    }
    return () => {
      if (animationRef.current) animationRef.current.kill();
    };
  }, [direction, speed]);

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
