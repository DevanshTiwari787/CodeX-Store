import React from 'react';
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
        <CartIcon />
        {/* Remove hamburger and mobile nav for simplicity */}
      </div>
    </header>
  );
};

export default Navbar;