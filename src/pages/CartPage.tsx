import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="page cart-page" style={{
      marginTop: '6rem',
      minHeight: '80vh',
      background: 'linear-gradient(135deg, #18181b 0%, #23232b 100%)',
      padding: '2rem 0'
    }}>
      <h1 style={{
        color: '#fff',
        marginBottom: '2rem',
        fontSize: '2.3rem',
        fontWeight: 800,
        textShadow: '0 8px 16px rgba(0,0,0,0.8)'
      }}>Your Cart</h1>
      {items.length === 0 ? (
        <div style={{
          color: '#ccc',
          fontSize: '1.2rem',
          textAlign: 'center',
          marginTop: '4rem'
        }}>Your cart is empty.</div>
      ) : (
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          borderRadius: '18px',
          background: 'rgba(24,24,27,0.95)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          padding: '2rem'
        }}>
          {items.map(item => (
            <div key={item.id + item.color} style={{
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #23232b 0%, #18181b 100%)',
              borderRadius: '1.2rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
              marginBottom: '1.5rem',
              padding: '1.2rem 2rem'
            }}>
              <img src={item.image} alt={item.name} style={{
                width: '80px',
                height: '80px',
                borderRadius: '1rem',
                objectFit: 'contain',
                marginRight: '2rem',
                background: 'none',
                boxShadow: '0 2px 12px rgba(255,255,255,0.08)'
              }} />
              <div style={{flex: 1}}>
                <div style={{
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: '1.2rem',
                  marginBottom: '0.2rem'
                }}>{item.name}</div>
                <div style={{
                  color: '#ccc',
                  fontSize: '1rem',
                  marginBottom: '0.5rem'
                }}>Color: <span style={{
                  background: item.color === 'white' ? '#fff' : '#222',
                  color: item.color === 'white' ? '#222' : '#fff',
                  borderRadius: '8px',
                  padding: '2px 10px',
                  fontWeight: 600,
                  marginLeft: '4px'
                }}>{item.color}</span></div>
                <div style={{
                  color: '#60A5FA',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  marginBottom: '0.2rem'
                }}>{item.price}</div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem'
              }}>
                <button 
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#222', fontWeight: 700, fontSize: '1.2rem', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                  }}
                  onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                >-</button>
                <span style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  minWidth: '32px',
                  textAlign: 'center'
                }}>{item.quantity}</span>
                <button 
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#222', fontWeight: 700, fontSize: '1.2rem', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                  }}
                  onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                >+</button>
                <button 
                  style={{
                    marginLeft: '1rem',
                    background: 'none',
                    color: '#f00',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={() => removeFromCart(item.id, item.color)}
                >Remove</button>
              </div>
            </div>
          ))}
          <div style={{
            textAlign: 'right',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#fff',
            marginTop: '2rem',
            borderTop: '1px solid #333',
            paddingTop: '1.2rem'
          }}>
            Total: <span style={{
              color: '#60A5FA',
              fontWeight: 800,
              fontSize: '1.4rem'
            }}>
              Rs. {totalPrice.toLocaleString('en-IN', {maximumFractionDigits: 2})}/-
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
