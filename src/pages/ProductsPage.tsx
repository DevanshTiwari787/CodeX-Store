import React from 'react';
import './Page.css';

const ProductsPage: React.FC = () => {
  return (
    <div className="page products-page">
      <h1>Our Products</h1>
      <p>Browse our carefully curated collection of premium electronic devices, from smartphones to smart home solutions.</p>
      <div className="products-grid">
        <div className="product-card">
          <h3>Smartphones</h3>
          <p>Latest flagship devices</p>
        </div>
        <div className="product-card">
          <h3>Laptops</h3>
          <p>High-performance computing</p>
        </div>
        <div className="product-card">
          <h3>Smart Home</h3>
          <p>Connected living solutions</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
