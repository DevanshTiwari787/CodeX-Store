import React from 'react';
import './Page.css';

const TechnologyPage: React.FC = () => {
  return (
    <div className="page technology-page">
      <h1>Technology</h1>
      <p>Discover the advanced technologies and innovations that power our electronic products and solutions.</p>
      <div className="tech-features">
        <div className="tech-card">
          <h3>AI Integration</h3>
          <p>Smart features powered by artificial intelligence</p>
        </div>
        <div className="tech-card">
          <h3>5G Connectivity</h3>
          <p>Ultra-fast wireless communication</p>
        </div>
        <div className="tech-card">
          <h3>Sustainable Design</h3>
          <p>Eco-friendly materials and processes</p>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;
