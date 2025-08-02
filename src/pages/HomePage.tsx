import React, { useRef, useEffect, useState } from 'react';
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
import { useCart } from '../contexts/CartContext';

gsap.registerPlugin(ScrollTrigger);

const productData = {
    airpods: {
        name: 'AirPods Pro',
        price: '$249',
        description: 'AirPods Pro deliver premium wireless audio with active noise cancellation, adaptive EQ, and Transparency mode. Enjoy up to 24 hours of battery life with the charging case, sweat and water resistance, and effortless pairing across Apple devices. Perfect for music, calls, and on-the-go listening.',
        colors: {
            white: airpodsImg,
            black: airpodsBlack,
        }
    },
    headphones: {
        name: 'Premium Headphones',
        price: '$299',
        description: 'Premium Headphones feature studio-quality sound with deep bass, crisp highs, and active noise cancellation. The ergonomic over-ear design ensures comfort for long listening sessions, while Bluetooth 5.0 provides seamless wireless connectivity. Includes built-in microphone and intuitive touch controls.',
        colors: {
            white: headphonesImg,
            black: headphonesBlack,
        }
    },
    speakers: {
        name: 'Smart Speakers',
        price: '$199',
        description: 'Smart Speakers combine powerful audio with voice assistant integration for hands-free control. Enjoy rich, room-filling sound, multi-room connectivity, and modern design that fits any space. Stream music, control smart home devices, and get answers instantly with built-in voice recognition.',
        colors: {
            white: speakersImg,
            black: speakersBlack,
        }
    },
    neckband: {
        name: 'Wireless Neckband',
        price: '$129',
        description: 'Wireless Neckband earphones offer lightweight comfort and up to 18 hours of battery life. Magnetic earbuds, quick charging, and sweat resistance make them ideal for workouts and daily commutes. Enjoy clear calls and dynamic sound with advanced Bluetooth technology.',
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
  
  const headphonesImageRef = useRef<HTMLDivElement>(null);
  const headphonesTextRef = useRef<HTMLDivElement>(null);
  const headphonesContainerRef = useRef<HTMLDivElement>(null);

  const speakersImageRef = useRef<HTMLDivElement>(null);
  const speakersTextRef = useRef<HTMLDivElement>(null);
  const speakersContainerRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();

  const [showProduct, setShowProduct] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<'white' | 'black'>('white');
  const [showPopup, setShowPopup] = useState<{ name: string } | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const openProduct = (id: string) => {
    setSelectedColor('white');
    setShowProduct(id);
  };

  const closeProduct = () => {
    setShowProduct(null);
  };

  // Fix: Make addToCart synchronous and avoid async/await, simplify logic
  const handleAddToCart = (event: React.MouseEvent, productId: string, product: typeof productData[keyof typeof productData]) => {
    event.preventDefault();
    event.stopPropagation();

    // Add to cart (synchronous)
    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.colors[selectedColor],
      color: selectedColor
    });

    // Show popup
    setShowPopup({ name: product.name });

    // Close modal after a short delay (ensures popup is visible)
    setTimeout(() => {
      setShowProduct(null);
    }, 300);

    // Hide popup after a longer delay
    setTimeout(() => setShowPopup(null), 1800);
  };

  // Disable scroll on mobile when modal is open or navbar mobile is open
  useEffect(() => {
    const handleNavbarMobile = () => {
      const navbarMobile = document.querySelector('.navbar-mobile.open');
      if (navbarMobile && window.innerWidth <= 900) {
        document.body.style.overflow = 'hidden';
      } else if (!showProduct) {
        document.body.style.overflow = 'auto';
      }
    };

    handleNavbarMobile();

    // Listen for navbar mobile open/close
    const observer = new MutationObserver(handleNavbarMobile);
    const navbarMobile = document.querySelector('.navbar-mobile');
    if (navbarMobile) {
      observer.observe(navbarMobile, { attributes: true, attributeFilter: ['class'] });
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (observer) observer.disconnect();
    };
  }, [showProduct]);

  useEffect(() => {
    // Clean up any existing ScrollTriggers first
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.globalTimeline.clear();

    const isMobile = window.innerWidth <= 900;

    if (!isMobile) {
      if (imageRef.current && textRef.current && containerRef.current) {
        gsap.fromTo(imageRef.current, { y: '-100vh', opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: "power3.out", delay: 0.5 });
        gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '+=100vh', scrub: 1, pin: true, anticipatePin: 1 } })
          .to(imageRef.current, { x: '-25vw', scale: 0.8, duration: 1, ease: "none" })
          .fromTo(textRef.current, { opacity: 0, x: '25vw' }, { opacity: 1, x: 0, duration: 1, ease: "none" }, 0.5);
      }
      if (headphonesImageRef.current && headphonesTextRef.current && headphonesContainerRef.current) {
        gsap.timeline({ scrollTrigger: { trigger: headphonesContainerRef.current, start: 'top top', end: '+=400vh', scrub: 1, pin: true, anticipatePin: 1 } })
          .to(headphonesImageRef.current, { x: '25vw', scale: 0.8, duration: 1, ease: "none" })
          .fromTo(headphonesTextRef.current, { opacity: 0, x: '-25vw' }, { opacity: 1, x: 0, duration: 1, ease: "none" }, 0.5);
      }
      if (speakersImageRef.current && speakersTextRef.current && speakersContainerRef.current) {
        gsap.timeline({ scrollTrigger: { trigger: speakersContainerRef.current, start: 'top top', end: '+=400vh', scrub: 1, pin: true, anticipatePin: 1 } })
          .to(speakersImageRef.current, { x: '-25vw', scale: 1.2, duration: 1, ease: "none" })
          .fromTo(speakersTextRef.current, { opacity: 0, x: '25vw' }, { opacity: 1, x: 0, duration: 1, ease: "none" }, 0.5);
      }
    } else {
      // Only scale images on scroll for mobile, keep positions unchanged
      const imageSections = [
        imageRef.current,
        headphonesImageRef.current,
        speakersImageRef.current
      ];
      imageSections.forEach(section => {
        if (section) {
          gsap.fromTo(
            section.querySelector('img'),
            { scale: 1 },
            {
              scale: 1.2,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "top 20%",
                scrub: true
              }
            }
          );
        }
      });
    }
    // Cleanup function - this is crucial for proper navigation
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.clear();
      // Reset any transforms that might interfere
      if (imageRef.current) gsap.set(imageRef.current, { clearProps: "all" });
      if (textRef.current) gsap.set(textRef.current, { clearProps: "all" });
      if (headphonesImageRef.current) gsap.set(headphonesImageRef.current, { clearProps: "all" });
      if (headphonesTextRef.current) gsap.set(headphonesTextRef.current, { clearProps: "all" });
      if (speakersImageRef.current) gsap.set(speakersImageRef.current, { clearProps: "all" });
      if (speakersTextRef.current) gsap.set(speakersTextRef.current, { clearProps: "all" });
    };
  }, []);

  const marqueeItems = [
    { id: '1', image: airpodsImg, alt: 'AirPods', name: 'AirPods' },
    { id: '2', image: headphonesImg, alt: 'Headphones', name: 'Headphones' },
    { id: '3', image: speakersImg, alt: 'Speakers', name: 'Speakers' },
    { id: '4', image: neckbandImg, alt: 'Neckband', name: 'Neckband' },
    { id: '5', image: headphonesImg, alt: 'Headphones', name: 'Headphones' },
    { id: '6', image: speakersImg, alt: 'Speakers', name: 'Speakers' },
  ];

  const ProductModal = () => {
    if (!showProduct) return null;
    const product = productData[showProduct as keyof typeof productData];
    if (!product) return null;

    // Responsive modal styles for small screens
    const isMobile = window.innerWidth < 900;

    return ReactDOM.createPortal(
      <div
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)'
        }}
        onClick={closeProduct}
      >
        <div
          style={{
            width: isMobile ? '98vw' : '90vw',
            height: isMobile ? '98vh' : '90vh',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            background: 'none',
            borderRadius: isMobile ? '1rem' : '2rem',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '0.5rem' : '0',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1rem 0.5rem' : '2rem'
          }}>
            <img
              src={product.colors[selectedColor]}
              alt={product.name}
              style={{
                width: isMobile ? '90vw' : '100%',
                maxWidth: isMobile ? '320px' : '420px',
                height: isMobile ? '32vh' : '50vh',
                objectFit: 'contain',
                marginBottom: '2rem',
                filter: 'drop-shadow(0 10px 30px rgba(255,255,255,0.15))'
              }}
            />
            <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.5rem' }}>
              {colorOptions.map(option => (
                <button key={option.key} style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: selectedColor === option.key ? '3px solid #fff' : '2px solid #fff',
                  background: option.color,
                  cursor: 'pointer',
                  boxShadow: selectedColor === option.key ? '0 0 12px #fff' : 'none',
                  transition: 'box-shadow 0.2s, border 0.2s'
                }} aria-label={option.label} onClick={() => setSelectedColor(option.key as 'white' | 'black')} />
              ))}
            </div>
          </div>
          <div style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'flex-start',
            padding: isMobile ? '1rem 0.5rem' : '2rem',
            overflowY: 'auto',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.3rem' : '2.5rem',
              color: '#fff',
              marginBottom: '1.2rem',
              fontWeight: 800,
              textShadow: '0 8px 16px rgba(0,0,0,0.8)'
            }}>{product.name}</h2>
            <div style={{
              fontSize: isMobile ? '1.1rem' : '1.7rem',
              color: '#fff',
              fontWeight: 700,
              marginBottom: '1.2rem',
              background: 'linear-gradient(135deg, #fff 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>{product.price}</div>
            <div style={{
              fontSize: isMobile ? '0.95rem' : '1.18rem',
              color: '#ccc',
              marginBottom: '2rem',
              lineHeight: '1.7',
              maxWidth: '90%'
            }}>{product.description}</div>
            <button
              className="airpods-cta"
              style={{
                width: isMobile ? '90vw' : '180px',
                maxWidth: isMobile ? '320px' : '180px',
                background: 'none',
                border: '2px solid white',
                color: '#fff',
                fontSize: isMobile ? '1rem' : '1.1rem',
                padding: isMobile ? '0.8rem 0' : '1rem 0',
                margin: isMobile ? '0 auto' : '0',
                display: 'block',
                borderRadius: '50px',
                transition: 'background 0.3s, color 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #fff 0%, #000 100%)';
                e.currentTarget.style.color = '#111';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#fff';
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeProduct();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="products-showcase">
      {showPopup && (
        <div style={{ 
          position: 'fixed', 
          top: '2.5rem', 
          right: '2.5rem', 
          background: '#fff', 
          color: '#222', 
          borderRadius: '12px', 
          boxShadow: '0 2px 16px rgba(0,0,0,0.10)', 
          padding: '0.8rem 1.6rem', 
          fontWeight: 600, 
          fontSize: '1.05rem', 
          zIndex: 10001, 
          letterSpacing: '0.5px', 
          transition: 'opacity 0.3s', 
          opacity: showPopup ? 1 : 0 
        }}>
          {showPopup.name} added to cart
        </div>
      )}
      <ProductModal />
      <div className="home-main" ref={containerRef}>
        <section className="airpods-section" ref={imageRef}>
          <img src={airpodsImg} alt="AirPods" className="airpods-image" />
        </section>
        <section className="airpods-text-section" ref={textRef}>
          <h1 className="airpods-title">Experience true wireless freedom, keep listening without charging breaks</h1>
          <button className="airpods-cta" onClick={() => openProduct('airpods')}>Learn More</button>
        </section>
      </div>
      <div className="headphones-main" ref={headphonesContainerRef}>
        <section className="headphones-section" ref={headphonesImageRef}>
          <img src={headphonesImg} alt="Headphones" className="headphones-image" />
        </section>
        <section className="headphones-text-section" ref={headphonesTextRef}>
          <h1 className="headphones-title">Premium sound quality with comfortable design </h1>
          <button className="headphones-cta" onClick={() => openProduct('headphones')}>Discover</button>
        </section>
      </div>
      <div className="speakers-main" ref={speakersContainerRef}>
        <section className="speakers-section" ref={speakersImageRef}>
          <img src={speakersImg} alt="Speakers" className="speakers-image" />
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
        <InfiniteMarquee items={marqueeItems} direction="left" speed={30} />
      </div>
    </div>
  );
};

export default HomePage;