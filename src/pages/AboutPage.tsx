import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ansukshaImg from "../assets/anushka.jpg"
import devanshImg from "../assets/devansh.jpg"
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

const teamMembers = [
  {
    name: 'Devansh Tiwari',
    role: 'Full Stack Developer',
    image: devanshImg
  },
  {
    name: 'Anushka Yadav',
    role: 'Frontend Developer',
    image: ansukshaImg
  },
];

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

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
        minHeight: '100vh',
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
          width: `${aboutCards.length * 100}vw`,
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
            <div
              style={{
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
              }}
              // Responsive styles for small screens
              className="about-card"
            >
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
                  padding: '0.6rem'
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

      {/* Enhanced Progress Indicator - move outside the absolute container, below the card section */}
      <div style={{
        position: 'relative',
        width: '100vw',
        marginTop: 'calc(92vh)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          gap: '1.2rem',
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
      </div>

      {/* Team Section */}
      <div
        style={{
          width: '100vw',
          marginTop: '4rem',
          padding: '0 0 6rem 0',
          background: 'transparent',
          position: 'relative',
          zIndex: 2
        }}
        className="about-team-section"
      >
        <h1 style={{
          fontSize: '2.7rem',
          fontWeight: 800,
          color: '#fff',
          textAlign: 'center',
          marginBottom: '3.5rem',
          letterSpacing: '-1px',
          background: 'linear-gradient(135deg, #fff 0%, #60A5FA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Meet the incredible team
        </h1>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          position: 'relative',
          background: 'none'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            position: 'relative'
          }}>
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: hoveredMember === idx ? '#2563EB' : 'transparent',
                  color: hoveredMember === idx ? '#fff' : '#fff',
                  borderRadius: '8px',
                  padding: '0.7rem 2rem',
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.3s, color 0.3s',
                  objectFit: 'cover',
                }}
                onMouseEnter={() => setHoveredMember(idx)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <span style={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: hoveredMember === idx ? '#fff' : '#60A5FA',
                  marginRight: '1.5rem',
                  width: '40px',
                  textAlign: 'center',
                  opacity: hoveredMember === idx ? 1 : 0.7,
                  fontFamily: 'sans-serif',  
                  verticalAlign: 'middle'
                }}>
                  {String(idx + 1).padStart(2 , '0')}
                </span>
                <span style={{
                  flex: 1,
                  color: hoveredMember === idx ? '#fff' : '#fff',
                  fontFamily: 'sans-serif',  
                  letterSpacing: '0.5px'
                }}>
                  {member.name}
                </span>
                <span style={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: hoveredMember === idx ? '#fff' : '#ccc',
                  marginLeft: '2rem',
                  opacity: hoveredMember === idx ? 1 : 0.7
                }}>
                  {member.role}
                </span>
                {/* Floating Image */}
                {hoveredMember === idx && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -60%)',
                      zIndex: 10,
                      pointerEvents: 'none',
                      transition: 'opacity 0.25s, transform 0.25s',
                      opacity: 1
                    }}
                  >
                    <div style={{
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.13)',
                      boxShadow: '0 8px 32px rgba(96,165,250,0.18)',
                      border: '2px solid #fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      transition: 'box-shadow 0.25s, border 0.25s'
                    }}>
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          borderRadius: '50%',
                          filter: 'none',

                          // Anti-pixelation properties
                          WebkitBackfaceVisibility: 'hidden', // Prevents blurriness in webkit
                          backfaceVisibility: 'hidden',
                          WebkitTransform: 'translateZ(0)', // Hardware acceleration

                          // Ensure crisp edges
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale',

                      

                          // Smooth transitions if any transforms are applied
                          transition: 'transform 0.3s ease',

                          // Ensure no unwanted scaling
                          maxWidth: '100%',
                          maxHeight: '100%',

                        }}

                       
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          #about-page {
            overflow-x: hidden !important;
          }
          @media (max-width: 1200px) {
            #about-cards-container > div > .about-card {
              max-width: 600px !important;
              padding: 2.2rem 1.2rem !important;
              height: 60vh !important;
            }
            #about-cards-container > div > .about-card h2 {
              font-size: 1.6rem !important;
            }
            #about-cards-container > div > .about-card p {
              font-size: 1rem !important;
            }
          }
          @media (max-width: 900px) {
            #about-cards-container > div > .about-card {
              max-width: 400px !important;
              min-width: 180px !important;
              padding: 1.2rem 0.6rem !important;
              height: 45vh !important;
              border-radius: 18px !important;
            }
            #about-cards-container > div > .about-card h2 {
              font-size: 1.2rem !important;
              padding: 0.2rem !important;
            }
            #about-cards-container > div > .about-card p {
              font-size: 0.95rem !important;
              margin-bottom: 0.8rem !important;
            }
            #about-cards-container > div > .about-card > div:nth-child(2) > div:first-child {
              font-size: 2.2rem !important;
              margin-bottom: 0.7rem !important;
            }
            .about-team-section {
              padding: 0 0 3rem 0 !important;
            }
            .about-team-section h1 {
              font-size: 1.5rem !important;
              margin-bottom: 2rem !important;
            }
            .about-team-section > div > div {
              font-size: 1rem !important;
              padding: 0.5rem 1rem !important;
            }
            .about-team-section > div > div > div {
              width: 120px !important;
              height: 120px !important;
            }
          }
          @media (max-width: 600px) {
            #about-cards-container > div > .about-card {
              max-width: 95vw !important;
              min-width: 120px !important;
              padding: 0.7rem 0.2rem !important;
              border-radius: 12px !important;
              height: 35vh !important;
            }
            #about-cards-container > div > .about-card h2 {
              font-size: 1rem !important;
              padding: 0.1rem !important;
            }
            #about-cards-container > div > .about-card p {
              fontSize: 0.85rem !important;
              margin-bottom: 0.5rem !important;
            }
            #about-cards-container > div > .about-card > div:nth-child(2) > div:first-child {
              font-size: 1.5rem !important;
              margin-bottom: 0.5rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AboutPage;
