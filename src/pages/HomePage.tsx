import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Page.css';
import airpodsImg from '../assets/airpods.png';
import headphonesImg from '../assets/headphones.png';
import speakersImg from '../assets/speakers.png';
import neckbandImg from '../assets/neckband.png';
import airpodsBlack from '../assets/airpods_black.png';
import headphonesBlack from '../assets/headphones_black.png';
import speakersBlack from '../assets/speakers_black.png';
import neckbandBlack from '../assets/neckband_black.png';
import InfiniteMarquee from '../components/ui/InfiniteMarquee';

gsap.registerPlugin(ScrollTrigger);

const productData = {
  airpods: {
    name: 'AirPods Pro',
    price: '$249',
    description: 'Premium wireless earbuds with active noise cancellation and immersive sound.',
    colors: {
      white: airpodsImg,
      black: airpodsBlack,
    }
  },
  headphones: {
    name: 'Premium Headphones',
    price: '$299',
    description: 'Studio-quality over-ear headphones for immersive sound and comfort.',
    colors: {
      white: headphonesImg,
      black: headphonesBlack,
    }
  },
  speakers: {
    name: 'Smart Speakers',
    price: '$199',
    description: 'Voice-controlled smart speakers with premium sound and modern design.',
    colors: {
      white: speakersImg,
      black: speakersBlack,
    }
  },
  neckband: {
    name: 'Wireless Neckband',
    price: '$129',
    description: 'Comfortable wireless neckband earphones with long battery life.',
    colors: {
      white: neckbandImg,
      black: neckbandBlack,
    }
  }
};

const colorOptions = [
  { key: 'white', label: 'White', color: '#fff' },
  { key: 'black', label: 'Black', color: '#222' }
];

const HomePage: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Headphones refs
  const headphonesImageRef = useRef<HTMLDivElement>(null);
  const headphonesTextRef = useRef<HTMLDivElement>(null);
  const headphonesContainerRef = useRef<HTMLDivElement>(null);

  // Speakers refs
  const speakersImageRef = useRef<HTMLDivElement>(null);
  const speakersTextRef = useRef<HTMLDivElement>(null);
  const speakersContainerRef = useRef<HTMLDivElement>(null);

  const [showProduct, setShowProduct] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<'white' | 'black'>('white');

  const openProduct = (id: string) => {
    console.log("Opening product:", id); // Debugging
    setSelectedColor('white');
    setShowProduct(id);
  };

  const closeProduct = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowProduct(null);
  };

  // Add effect to prevent scrolling when modal is open
  useEffect(() => {
    if (showProduct) {
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showProduct]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 900;

    // Kill previous triggers to avoid conflicts on resize
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.globalTimeline.clear();

    if (!isMobile) {
      // Desktop/tablet GSAP animations (original)
      if (imageRef.current && textRef.current && containerRef.current) {
        gsap.fromTo(imageRef.current,
          { y: '-100vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            delay: 0.5
          }
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=100vh',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })
        .to(imageRef.current, {
          x: '-25vw',
          scale: 0.8,
          duration: 1,
          ease: "none"
        })
        .fromTo(textRef.current,
          {
            opacity: 0,
            x: '25vw',
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "none"
          }, 0.5);
      }

      if (headphonesImageRef.current && headphonesTextRef.current && headphonesContainerRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: headphonesContainerRef.current,
            start: 'top top',
            end: '+=400vh',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })
        .to(headphonesImageRef.current, {
          x: '25vw',
          scale: 0.8,
          duration: 1,
          ease: "none"
        })
        .fromTo(headphonesTextRef.current,
          {
            opacity: 0,
            x: '-25vw',
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "none"
          }, 0.5);
      }

      if (speakersImageRef.current && speakersTextRef.current && speakersContainerRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: speakersContainerRef.current,
            start: 'top top',
            end: '+=400vh',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })
        .to(speakersImageRef.current, {
          x: '-25vw',
          scale: 1.2,
          duration: 1,
          ease: "none"
        })
        .fromTo(speakersTextRef.current,
          {
            opacity: 0,
            x: '25vw',
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "none"
          }, 0.5);
      }
    } else {
      // Mobile: Fade in/out text section on scroll up/down
      const sections = [
        { img: imageRef.current, txt: textRef.current },
        { img: headphonesImageRef.current, txt: headphonesTextRef.current },
        { img: speakersImageRef.current, txt: speakersTextRef.current }
      ];

      sections.forEach(section => {
        if (section.txt) {
          gsap.fromTo(section.txt, {
            opacity: 0,
            y: 50,
          }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section.txt,
              start: "top 90%",
              end: "top 40%",
              toggleActions: "play reverse play reverse",
              scrub: true
            }
          });
        }
        if (section.img) {
          gsap.fromTo(section.img, {
            opacity: 0,
            y: 50,
          }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section.img,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play reverse play reverse",
              scrub: true
            }
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Marquee data
  const marqueeItems = [
    { id: '1', image: airpodsImg, alt: 'AirPods', name: 'AirPods' },
    { id: '2', image: headphonesImg, alt: 'Headphones', name: 'Headphones' },
    { id: '3', image: speakersImg, alt: 'Speakers', name: 'Speakers' },
    { id: '4', image: neckbandImg, alt: 'Neckband', name: 'Neckband' },
    { id: '5', image: headphonesImg, alt: 'Headphones', name: 'Headphones' },
    { id: '6', image: speakersImg, alt: 'Speakers', name: 'Speakers' },
  ];

  // Product Card Modal
  // Fix: Render modal above all content, not as page replacement
  const ProductModal = () => {
    if (!showProduct) return null;
    
    const product = productData[showProduct as keyof typeof productData];
    
    return ReactDOM.createPortal(
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.95)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)'
        }}
        onClick={closeProduct}
      >
        <div
          style={{
            width: '90vw',
            height: '90vh',
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            background: 'none',
            borderRadius: '2rem',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Left: Image & Color Buttons */}
          <div style={{
            flex: 1,
            height: window.innerWidth < 768 ? '60%' : '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <img
              src={product.colors[selectedColor]}
              alt={product.name}
              style={{
                width: '100%',
                maxWidth: '420px',
                height: '50vh',
                objectFit: 'contain',
                marginBottom: '2rem',
                filter: 'drop-shadow(0 10px 30px rgba(255,255,255,0.15))'
              }}
            />
            <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.5rem' }}>
              {colorOptions.map(option => (
                <button
                  key={option.key}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: selectedColor === option.key ? '3px solid #fff' : '2px solid #fff',
                    background: option.color,
                    cursor: 'pointer',
                    boxShadow: selectedColor === option.key ? '0 0 12px #fff' : 'none',
                    transition: 'box-shadow 0.2s, border 0.2s'
                  }}
                  aria-label={option.label}
                  onClick={e => { 
                    e.stopPropagation(); 
                    setSelectedColor(option.key as 'white' | 'black');
                  }}
                />
              ))}
            </div>
          </div>
          {/* Right: Info */}
          <div style={{
            flex: 1,
            height: window.innerWidth < 768 ? '40%' : '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '2rem',
            overflowY: 'auto'
          }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '1.8rem' : '2.5rem',
              color: '#fff',
              marginBottom: '1.2rem',
              fontWeight: 800,
              textShadow: '0 8px 16px rgba(0,0,0,0.8)'
            }}>{product.name}</h2>
            <div style={{
              fontSize: window.innerWidth < 768 ? '1.3rem' : '1.7rem',
              color: '#fff',
              fontWeight: 700,
              marginBottom: '1.2rem',
              background: 'linear-gradient(135deg, #fff 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>{product.price}</div>
            <div style={{
              fontSize: window.innerWidth < 768 ? '1rem' : '1.18rem',
              color: '#ccc',
              marginBottom: '2rem',
              lineHeight: '1.7',
              maxWidth: '90%'
            }}>{product.description}</div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button className="airpods-cta" style={{
                width: '180px',
                background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
                color: '#000'
              }}>Buy Now</button>
              <button
                className="airpods-cta"
                style={{
                  width: '180px',
                  background: 'none',
                  border: '2px solid white',
                  color: '#fff'
                }}
                onClick={closeProduct}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // Separate product modal into its own component to prevent DOM conflicts
  return (
    <div className="products-showcase">
      {/* Render the modal using the separate component */}
      <ProductModal />
      
      {/* Main content sections */}
      <div className="home-main" ref={containerRef}>
        <section className="airpods-section" ref={imageRef}>
          <img
            src={airpodsImg}
            alt="AirPods"
            className="airpods-image"
          />
        </section>
        <section className="airpods-text-section" ref={textRef}>
          <h1 className="airpods-title">Experience true wireless freedom, keep listening wihtout charging breaks</h1>
          <button className="airpods-cta" onClick={() => openProduct('airpods')}>Learn More</button>
        </section>
      </div>
      <div className="headphones-main" ref={headphonesContainerRef}>
        <section className="headphones-section" ref={headphonesImageRef}>
          <img
            src={headphonesImg}
            alt="Headphones"
            className="headphones-image"
          />
        </section>
        <section className="headphones-text-section" ref={headphonesTextRef}>
          <h1 className="headphones-title">Premium sound quality with comfortable design </h1>
          <button className="headphones-cta" onClick={() => openProduct('headphones')}>Discover</button>
        </section>
      </div>
      <div className="speakers-main" ref={speakersContainerRef}>
        <section className="speakers-section" ref={speakersImageRef}>
          <img
            src={speakersImg}
            alt="Speakers"
            className="speakers-image"
          />
        </section>
        <section className="speakers-text-section" ref={speakersTextRef}>
          <h1 className="speakers-title">Immersive audio experience for your home</h1>
          <button className="speakers-cta" onClick={() => openProduct('speakers')}>Explore</button>
        </section>
      </div>
      <div className="marquee-section">
        <div className="marquee-header">
          <h2 className="marquee-title">Our Product Range</h2>
        </div>
        <InfiniteMarquee 
          items={marqueeItems} 
          direction="left" 
          speed={30}
        />
      </div>
    </div>
  );
};

export default HomePage;