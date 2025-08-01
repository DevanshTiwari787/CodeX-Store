import React from 'react';
import './Page.css';

const ContactPage: React.FC = () => {
  return (
    <div className="page contact-page">
      <h1>Contact Us</h1>
      <p>Get in touch with our team for support, inquiries, or to learn more about our products and services.</p>
      <div className="contact-form">
        <form>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message" rows={5}></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
