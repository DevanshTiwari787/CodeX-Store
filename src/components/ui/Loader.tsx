import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.css"; // External CSS for cleaner code

const Loader: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const percentageRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    const barEl = barRef.current;
    const percentageEl = percentageRef.current;

    if (!titleEl || !barEl || !percentageEl) return;

    const text = titleEl.textContent?.trim() || "";
    titleEl.innerHTML = "";

    for (let char of text) {
      const span = document.createElement("span");
      span.textContent = char;
      if (char === " ") {
        span.classList.add("space");
        span.innerHTML = "&nbsp;";
      }
      titleEl.appendChild(span);
    }

    gsap.to(".loading-title span", {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1.2,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
    });

    const boxCount = 50;
    for (let i = 0; i < boxCount; i++) {
      const box = document.createElement("div");
      box.classList.add("loading-visual-bar-part");
      barEl.appendChild(box);
    }

    const boxes = barEl.querySelectorAll<HTMLDivElement>(".loading-visual-bar-part");
    let percent = 0;

    const interval = setInterval(() => {
      if (percent > 100) {
        clearInterval(interval);
        return;
      }

      percentageEl.textContent = percent.toString();

      const boxesToActivate = Math.floor((percent / 100) * boxCount);
      boxes.forEach((box, index) => {
        if (index < boxesToActivate) {
          box.classList.add("active");
        }
      });

      percent++;
    }, 18);
  }, []);

  return (
    <div className="loading-screen">
      <h1 className="loading-title" ref={titleRef}>
        initializing Experience
      </h1>
      <div className="loading-visual-progress">
        <p className="loading-visual-percentage" ref={percentageRef}>0</p>
        <p>%</p>
      </div>
      <div className="loading-visual-bar" ref={barRef}></div>
    </div>
  );
};

export default Loader;