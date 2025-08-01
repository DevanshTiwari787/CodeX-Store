import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="page cart-page" style={{
      marginTop: '6rem',
      minHeight: '80vh',
      background: '#111',
      padding: '2rem 1rem'
    }}>
      <h1 style={{
        color: '#fff',
        marginBottom: '2rem',
        fontSize: '2.5rem',
        fontWeight: 800,
        textAlign: 'center',
        letterSpacing: '-1px',
        textShadow: '0 4px 12px rgba(0,0,0,0.5)'
      }}>Your Cart</h1>
      {items.length === 0 ? (
        <div style={{
          color: '#ccc',
          fontSize: '1.2rem',
          textAlign: 'center',
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(24,24,27,0.5)',
          borderRadius: '1rem',
          maxWidth: '500px',
          margin: '4rem auto'
        }}>Your cart is currently empty.</div>
      ) : (
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {items.map(item => (
            <div key={item.id + item.color} style={{
              display: 'flex',
              alignItems: 'center',
              background: '#18181b',
              borderRadius: '1rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              marginBottom: '1.5rem',
              padding: '1.5rem',
              border: '1px solid #2a2a2e',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div style={{
                background: '#2a2a2e',
                borderRadius: '0.75rem',
                padding: '0.5rem',
                marginRight: '1.5rem'
              }}>
                <img src={item.image} alt={item.name} style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                }} />
              </div>
              <div style={{flex: 1}}>
                <div style={{
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: '1.2rem',
                  marginBottom: '0.2rem'
                }}>{item.name}</div>
                <div style={{
                  color: '#aaa',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>Color: {item.color}</div>
                <div style={{
                  color: '#60A5FA',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>{item.price}</div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}>
                <button 
                  style={{
                    width: '30px', height: '30px', borderRadius: '50%', background: '#333', color: '#fff', fontWeight: 700, fontSize: '1.2rem', border: 'none', cursor: 'pointer'
                  }}
                  onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                >-</button>
                <span style={{
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  minWidth: '30px',
                  textAlign: 'center'
                }}>{item.quantity}</span>
                <button 
                  style={{
                    width: '30px', height: '30px', borderRadius: '50%', background: '#333', color: '#fff', fontWeight: 700, fontSize: '1.2rem', border: 'none', cursor: 'pointer'
                  }}
                  onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                >+</button>
                <button 
                  style={{
                    marginLeft: '1.5rem', background: 'none', color: '#ff4d4d', border: 'none', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer'
                  }}
                  onClick={() => removeFromCart(item.id, item.color)}
                >Remove</button>
              </div>
            </div>
          ))}
          <div style={{
            textAlign: 'right',
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#fff',
            marginTop: '2.5rem',
            background: '#18181b',
            padding: '1.5rem 2rem',
            borderRadius: '1rem',
            border: '1px solid #2a2a2e',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}>
            Total Price: <span style={{
              color: '#60A5FA',
              fontWeight: 800,
              fontSize: '1.5rem',
              marginLeft: '1rem'
            }}>
              ${totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};


export default CartPage;
