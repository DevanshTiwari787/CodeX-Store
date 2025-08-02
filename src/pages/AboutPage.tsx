import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Page.css';

gsap.registerPlugin(ScrollTrigger);

const aboutCards = [
  {
    title: 'Premium Audio Engineering',
    icon: '🎵',
    desc: 'Meticulously crafted soundscapes that transform ordinary moments into extraordinary experiences. Every frequency tuned to perfection.',
    feature: 'Studio-Grade Quality'
  },
  {
    title: 'Next-Gen Technology',
    icon: '🔊',
    desc: 'Revolutionary acoustic innovations powered by AI-driven sound optimization and cutting-edge wireless protocols for seamless connectivity.',
    feature: 'AI-Powered Sound'
  },
  {
    title: 'Global Sound Community',
    icon: '🤝',
    desc: 'Join millions of audio enthusiasts worldwide who choose excellence. Share experiences, discover new sounds, create lasting connections.',
    feature: 'Happy Customers'
  },
  {
    title: 'Ergonomic Perfection',
    icon: '🎧',
    desc: 'Scientifically designed for extended comfort sessions. Premium materials that adapt to your lifestyle, engineered for marathon listening.',
    feature: 'Comfortable Design'
  }
];

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Horizontal scroll animation similar to your "TRADE ENERGY ONLINE" example
      gsap.to("#about-cards-container", {
        transform: "translateX(-75%)", // Move all cards horizontally
        scrollTrigger: {
          trigger: "#about-page",
          scroller: "body",
          start: "top 0%",
          end: "top -300%", // Extended scroll distance to show all cards
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update active card based on scroll progress
            const progress = self.progress;
            const newIndex = Math.floor(progress * aboutCards.length);
            const clampedIndex = Math.min(newIndex, aboutCards.length - 1);
            setActiveCardIndex(clampedIndex);
          }
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      id="about-page"
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        background: '#111',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Cards Container - Horizontal Scroll */}
      <div 
        id="about-cards-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          width: `${aboutCards.length * 100}vw`, // Width = number of cards * 100vw
          position: 'absolute',
          marginTop: '1rem',
          marginBottom: '1rem',
          top: 0,
          left: 0
        }}
      >
        {aboutCards.map((card, idx) => (
          <div
            key={card.title}
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              background: '#111',
              padding: '2rem'
            }}
          >
            {/* Modern Large Card */}
            <div style={{
              background: 'linear-gradient(145deg, #000 0%, #1a1a1a 100%)',
              color: 'white',
              borderRadius: '32px',
              padding: '4rem 3rem',
              width: '85vw',
              maxWidth: '800px',
              height: '75vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              position: 'relative',
              overflow: 'hidden',
              margin: '1rem'
            }}>
              {/* Background Gradient Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at ${30 + idx * 20}% ${40 + idx * 15}%, rgba(96,165,250,0.1) 0%, transparent 70%)`,
                zIndex: 1
              }} />
              
              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                

                {/* Card Icon */}
                <div style={{
                  fontSize: '5rem',
                  marginBottom: '2rem',
                  textShadow: '0 8px 32px rgba(96,165,250,0.4)',
                  filter: 'drop-shadow(0 0 20px rgba(96,165,250,0.3))'
                }}>
                  {card.icon}
                </div>
                
                {/* Card Title */}
                <h2 style={{
                  fontSize: '2.8rem',
                  fontWeight: 800,
                  marginBottom: '2rem',
                  color: 'white',
                  letterSpacing: '-2px',
                  lineHeight: 1.1,
                  background: 'linear-gradient(135deg, #fff 0%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  padding : '0.6rem'
                }}>
                  {card.title}
                </h2>
                
                {/* Card Description */}
                <p style={{
                  fontSize: '1.4rem',
                  color: '#e2e8f0',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                  maxWidth: '600px',
                  margin: '0 auto 2rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}>
                  {card.desc}
                </p>

                {/* Decorative Elements */}
                
              </div>

              {/* Corner Accents */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                width: '60px',
                height: '60px',
                border: '2px solid rgba(96,165,250,0.3)',
                borderRight: 'transparent',
                borderBottom: 'transparent',
                borderRadius: '16px 0 0 0'
              }} />
              
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                width: '60px',
                height: '60px',
                border: '2px solid rgba(96,165,250,0.3)',
                borderLeft: 'transparent',
                borderTop: 'transparent',
                borderRadius: '0 0 16px 0'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Progress Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '1.2rem',
        zIndex: 10,
        background: 'rgba(0,0,0,0.3)',
        padding: '0.8rem 1.5rem',
        borderRadius: '25px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        {aboutCards.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: idx === activeCardIndex ? '#fff' : 'rgba(0, 0, 0, 0.6)',
              transition: 'all 0.3s',
              boxShadow: idx === activeCardIndex ? '0 0 12px rgba(255,255,255,0.5)' : 'none',
              transform: idx === activeCardIndex ? 'scale(1.2)' : 'scale(1)'
            }}
          />
        ))}
      </div>

      <style>
        {`
          #about-page {
            overflow-x: hidden !important;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          
          @media (max-width: 900px) {
            #about-cards-container > div > div {
              padding: 2.5rem 2rem !important;
              width: 95vw !important;
              height: 80vh !important;
              max-width: none !important;
            }
            
            #about-cards-container > div > div h2 {
              font-size: 2rem !important;
            }
            
            #about-cards-container > div > div p {
              font-size: 1.1rem !important;
            }
            
            #about-cards-container > div > div > div:nth-child(2) > div:first-child {
              fontSize: 3.5rem !important;
            }

            #about-cards-container > div > div > div:nth-child(2) > div:first-child {
              position: static !important;
              margin-bottom: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AboutPage;
