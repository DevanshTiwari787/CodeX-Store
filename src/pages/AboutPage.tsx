import React from 'react';
import './Page.css';

const AboutPage: React.FC = () => {
  return (
    <div className="page about-page">
      <h1>About ElectroNova</h1>
      <p>Learn about our mission to bring you the most innovative and reliable electronic products from around the world.</p>
      <div className="about-content">
        <section>
          <h2>Our Mission</h2>
          <p>To revolutionize the electronics industry through innovation and quality.</p>
        </section>
        <section>
          <h2>Our Vision</h2>
          <p>A world where technology seamlessly enhances everyday life.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
