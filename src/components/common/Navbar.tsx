import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import CartIcon from '../ui/CartIcon';

const navTabs = [
  { id: 'home', label: 'Home', path: '/home' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'products', label: 'Products', path: '/products' },
  { id: 'contact', label: 'Contact', path: '/contact' }
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container" style={{maxWidth: '100%', margin: 0, paddingLeft: '2rem', paddingRight: '2rem'}}>
        <a href="/home" className="navbar-logo">SoundSpace</a>
        <nav className="navbar-tabs">
          {navTabs.map(tab => (
            <a 
              key={tab.id} 
              href={tab.path} 
              className={`navbar-tab ${location.pathname === tab.path ? 'active' : ''}`}
            >
              {tab.label}
            </a>
          ))}
        </nav>
        <button
          className={`navbar-hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(open => !open)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <CartIcon />
      </div>
      {/* Mobile dropdown */}
      <nav className={`navbar-mobile${mobileOpen ? ' open' : ''}`}>
        {navTabs.map(tab => (
          <a
            key={tab.id}
            href={tab.path}
            className={`navbar-mobile-tab${location.pathname === tab.path ? ' active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {tab.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;