import React from 'react';
import { useCart } from '../contexts/CartContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const isMobile = window.innerWidth <= 900;

  if (isMobile) {
    // Mobile-friendly cart layout
    return (
      <div className="page cart-page" style={{
        marginTop: '6rem',
        minHeight: '80vh',
        background: '#111',
        padding: '1rem 0.2rem'
      }}>
        <h1 style={{
          color: '#fff',
          marginBottom: '1rem',
          fontSize: '1.3rem',
          fontWeight: 800,
          textAlign: 'center',
          letterSpacing: '-1px',
          textShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>Your Cart</h1>
        {items.length === 0 ? (
          <div style={{
            color: '#ccc',
            fontSize: '1rem',
            textAlign: 'center',
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(24,24,27,0.5)',
            borderRadius: '0.7rem',
            maxWidth: '95vw',
            margin: '2rem auto'
          }}>Your cart is currently empty.</div>
        ) : (
          <div style={{
            maxWidth: '100vw',
            margin: '0 auto',
          }}>
            {items.map(item => (
              <div key={item.id + item.color} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                background: '#18181b',
                borderRadius: '0.7rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.18)',
                marginBottom: '1rem',
                padding: '1rem',
                border: '1px solid #2a2a2e',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <div style={{
                  background: '#2a2a2e',
                  borderRadius: '0.5rem',
                  padding: '0.3rem',
                  marginBottom: '0.7rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <img src={item.image} alt={item.name} style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'contain',
                  }} />
                </div>
                <div style={{
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: '1rem',
                  marginBottom: '0.1rem',
                  width: '100%',
                  textAlign: 'center'
                }}>{item.name}</div>
                <div style={{
                  color: '#aaa',
                  fontSize: '0.85rem',
                  marginBottom: '0.3rem',
                  width: '100%',
                  textAlign: 'center'
                }}>Color: {item.color}</div>
                <div style={{
                  color: '#60A5FA',
                  fontWeight: 700,
                  fontSize: '1rem',
                  marginBottom: '0.7rem',
                  width: '100%',
                  textAlign: 'center'
                }}>{item.price}</div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: '0.5rem'
                }}>
                  <button 
                    style={{
                      width: '24px', height: '24px', borderRadius: '50%', background: '#333', color: '#fff', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer'
                    }}
                    onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                  >-</button>
                  <span style={{
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    minWidth: '24px',
                    textAlign: 'center'
                  }}>{item.quantity}</span>
                  <button 
                    style={{
                      width: '24px', height: '24px', borderRadius: '50%', background: '#333', color: '#fff', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer'
                    }}
                    onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                  >+</button>
                  <button 
                    style={{
                      marginLeft: '0.5rem', background: 'none', color: '#ff4d4d', border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', padding: '0.3rem 0.7rem'
                    }}
                    onClick={() => removeFromCart(item.id, item.color)}
                  >Remove</button>
                </div>
              </div>
            ))}
            <div style={{
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#fff',
              marginTop: '1.2rem',
              background: '#18181b',
              padding: '1rem',
              borderRadius: '0.7rem',
              border: '1px solid #2a2a2e',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.18)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              Total Price: <span style={{
                color: '#60A5FA',
                fontWeight: 800,
                fontSize: '1.2rem',
                marginLeft: '0.5rem'
              }}>
                ${totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

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
      
      <style>
        {`
          @media (max-width: 900px) {
            .cart-page {
              padding: 1rem 0.2rem !important;
              margin-top: 5rem !important;
            }
            .cart-page h1 {
              font-size: 1.3rem !important;
              margin-bottom: 1rem !important;
            }
            /* ...existing responsive styles... */
          }
        `}
      </style>
    </div>
  );
};


export default CartPage;
