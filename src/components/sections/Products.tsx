import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import airpodsImg from '../../assets/airpods.png';
import headphonesImg from '../../assets/headphones.png';
import speakersImg from '../../assets/speakers.png';
import neckbandImg from '../../assets/neckband.png';
import airpodsBlack from '../../assets/airpods_black.png';
import headphonesBlack from '../../assets/headphones_black.png';
import speakersBlack from '../../assets/speakers_black.png';
import neckbandBlack from '../../assets/neckband_black.png';

const productData = {
  airpods: {
    name: 'AirPods Pro',
    price: '$249',
    description: 'AirPods Pro deliver premium wireless audio with active noise cancellation, adaptive EQ, and Transparency mode. Enjoy up to 24 hours of battery life with the charging case, sweat and water resistance, and effortless pairing across Apple devices.',
    colors: { white: airpodsImg, black: airpodsBlack }
  },
  headphones: {
    name: 'Premium Headphones',
    price: '$299',
    description: 'Premium Headphones feature studio-quality sound with deep bass, crisp highs, and active noise cancellation. The ergonomic over-ear design ensures comfort for long listening sessions, while Bluetooth 5.0 provides seamless wireless connectivity.',
    colors: { white: headphonesImg, black: headphonesBlack }
  },
  speakers: {
    name: 'Smart Speakers',
    price: '$199',
    description: 'Smart Speakers combine powerful audio with voice assistant integration for hands-free control. Enjoy rich, room-filling sound, multi-room connectivity, and modern design that fits any space.',
    colors: { white: speakersImg, black: speakersBlack }
  },
  neckband: {
    name: 'Wireless Neckband',
    price: '$129',
    description: 'Wireless Neckband earphones offer lightweight comfort and up to 18 hours of battery life. Magnetic earbuds, quick charging, and sweat resistance make them ideal for workouts and daily commutes.',
    colors: { white: neckbandImg, black: neckbandBlack }
  }
};

const colorOptions = [
  { key: 'white', label: 'White', color: '#fff' },
  { key: 'black', label: 'Black', color: '#222' }
];

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: 'white' | 'black' }>({
    airpods: 'white',
    headphones: 'white',
    speakers: 'white',
    neckband: 'white'
  });

  const handleColorSelect = (productId: string, color: 'white' | 'black') => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  const handleAddToCart = (productId: string) => {
    const product = productData[productId as keyof typeof productData];
    const color = selectedColors[productId];
    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.colors[color],
      color: color
    });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1800);
  };

  return (
    <div style={{
      background: '#111',
      minHeight: '100vh',
      padding: '8rem 2rem 4rem',
      position: 'relative'
    }}>
      {/* Top-right Success Popup with slide-out animation */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          background: '#fff',
          color: '#111',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
          padding: '1.2rem 2.5rem',
          fontWeight: 700,
          fontSize: '1.15rem',
          zIndex: 10001,
          textAlign: 'center',
          letterSpacing: '0.5px',
          animation: 'slideOutRight 1.8s cubic-bezier(.4,2,.3,1)'
        }}>
          Product added to cart
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #fff 0%, #60A5FA 50%, #A855F7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
          letterSpacing: '-2px'
        }}>
          Explore Our Products
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#94a3b8',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Discover our premium audio devices, available in multiple colors. Select your favorite color and add to cart!
        </p>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 900 ? '1fr' : 'repeat(2, 1fr)',
          gap: '2.5rem',
          maxWidth: window.innerWidth <= 900 ? '100%' : '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        {Object.entries(productData).map(([key, product]) => (
          <div key={key} style={{
            background: '#18181b',
            borderRadius: '24px',
            border: '1px solid #222',
            backdropFilter: 'blur(20px)',
            padding: '2rem',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
            e.currentTarget.style.border = '1px solid #60A5FA';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
            e.currentTarget.style.border = '1px solid #222';
          }}>
            {/* Product Image for selected color */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <img
                src={product.colors[selectedColors[key]]}
                alt={product.name + ' ' + selectedColors[key]}
                style={{
                  width: '140px',
                  height: '140px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))'
                }}
              />
            </div>
            {/* Product Info */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '0.5rem',
                letterSpacing: '-0.5px'
              }}>
                {product.name}
              </h3>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #60A5FA 0%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem'
              }}>
                {product.price}
              </div>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                marginBottom: '1.5rem'
              }}>
                {product.description}
              </p>
            </div>
            {/* Color Selection */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.2rem',
              marginBottom: '1.2rem'
            }}>
              {colorOptions.map(option => (
                <button
                  key={option.key}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: selectedColors[key] === option.key ? '3px solid #60A5FA' : '2px solid #fff',
                    background: option.color,
                    cursor: 'pointer',
                    boxShadow: selectedColors[key] === option.key ? '0 0 12px #60A5FA' : 'none',
                    transition: 'box-shadow 0.2s, border 0.2s'
                  }}
                  aria-label={option.label}
                  onClick={() => handleColorSelect(key, option.key as 'white' | 'black')}
                />
              ))}
            </div>
            {/* Buy Now Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => handleAddToCart(key)}
                style={{
                  padding: '0.95rem 2.2rem',
                  background: 'linear-gradient(135deg, #fff 0%, #f1f5f9 100%)',
                  color: '#1e293b',
                  border: 'none',
                  borderRadius: '18px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.1)';
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes slideOutRight {
            0% {
              opacity: 0;
              transform: translateX(100px);
            }
            10% {
              opacity: 1;
              transform: translateX(0);
            }
            80% {
              opacity: 1;
              transform: translateX(0);
            }
            100% {
              opacity: 0;
              transform: translateX(400px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Products;
