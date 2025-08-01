import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Page.css';
import airpodsImg from '../assets/airpods.png';
import headphonesImg from '../assets/headphones.png';
import speakersImg from '../assets/speakers.png';
import neckbandImg from '../assets/neckband.png';
import InfiniteMarquee from '../components/ui/InfiniteMarquee';

gsap.registerPlugin(ScrollTrigger);

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
          scale: 1.2,
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
          scale: 1.1,
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

  return (
    <div className="products-showcase">
      {/* AirPods Section - unchanged */}
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
          <button className="airpods-cta">Learn More</button>
        </section>
      </div>

      {/* Headphones Section */}
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
          <button className="headphones-cta">Discover</button>
        </section>
      </div>

      {/* Speakers Section */}
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
          <button className="speakers-cta">Explore</button>
        </section>
      </div>

      {/* Infinite Marquee Section */}
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