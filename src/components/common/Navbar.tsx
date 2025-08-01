import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navTabs = [
  { id: 'home', label: 'Home', path: '/home' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'technology', label: 'Technology', path: '/technology' },
  { id: 'contact', label: 'Contact', path: '/contact' }
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container" style={{maxWidth: '100%', margin: 0, paddingLeft: '2rem', paddingRight: '2rem'}}>
        <Link to="/home" className="navbar-logo">Gada Electronics</Link>
        <nav className="navbar-tabs">
          {navTabs.map(tab => (
            <Link 
              key={tab.id} 
              to={tab.path} 
              className={`navbar-tab ${location.pathname === tab.path ? 'active' : ''}`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        <button
          className={`navbar-hamburger${mobileOpen ? ' open' : ''}`}
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={`navbar-mobile${mobileOpen ? ' open' : ''}`}>
        {navTabs.map(tab => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`navbar-mobile-tab ${location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;