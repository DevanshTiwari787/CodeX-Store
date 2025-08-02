import React from 'react';
import './Page.css';

const ContactPage: React.FC = () => {
  return (
    <div
      className="page contact-page"
      style={{
        minHeight: '100vh',
        background: '#111',
        color: '#fff',
        padding: '0',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          margin: '6rem auto 0 auto',
          padding: '2rem',
          background: 'linear-gradient(145deg, #18181b 0%, #23232a 100%)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          border: '1px solid #222',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '1.5rem',
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #fff 0%, #60A5FA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            color: '#ccc',
            fontSize: '1.15rem',
            textAlign: 'center',
            marginBottom: '2.5rem',
            lineHeight: 1.7
          }}
        >
          We'd love to hear from you! Fill out the form below and our team will get back to you soon.
        </p>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #333',
              background: '#18181b',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #333',
              background: '#18181b',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #333',
              background: '#18181b',
              color: '#fff',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '1rem',
              borderRadius: '50px',
              border: 'none',
              background: 'linear-gradient(135deg, #fff 0%, #60A5FA 100%)',
              color: '#111',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(96,165,250,0.10)',
              transition: 'background 0.3s'
            }}
          >
            Send Message
          </button>
        </form>
        <div
          style={{
            marginTop: '2.5rem',
            textAlign: 'center',
            color: '#60A5FA',
            fontSize: '1rem',
            opacity: 0.7
          }}
        >
          <a href="mailto:devanshtiwari2610@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>Reach out via email</a>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            .contact-page > div {
              max-width: 98vw !important;
              padding: 1rem !important;
              border-radius: 14px !important;
            }
            .contact-page h1 {
              font-size: 1.5rem !important;
            }
            .contact-page p {
              font-size: 1rem !important;
            }
            .contact-page form input,
            .contact-page form textarea {
              font-size: 0.95rem !important;
              padding: 0.7rem !important;
            }
            .contact-page form button {
              font-size: 1rem !important;
              padding: 0.8rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ContactPage;
