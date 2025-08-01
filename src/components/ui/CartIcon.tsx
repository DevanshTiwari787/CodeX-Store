import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const CartIcon: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-icon-link" style={{marginLeft: '2rem', position: 'relative'}}>
      <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1.5"/>
        <circle cx="20" cy="21" r="1.5"/>
        <path d="M1 1h3l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61l1.6-9.39H6"/>
      </svg>
      {totalItems > 0 && (
        <span style={{
          position: 'absolute',
          top: '-6px',
          right: '-8px',
          background: '#fff',
          color: '#222',
          borderRadius: '50%',
          fontSize: '0.8rem',
          fontWeight: 700,
          padding: '2px 7px',
          minWidth: '22px',
          textAlign: 'center'
        }}>{totalItems}</span>
      )}
    </Link>
  );
};

export default CartIcon;
