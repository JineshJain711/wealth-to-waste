import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">
              <FaRecycle /> Waste-to-Wealth
            </h5>
            <p style={{ opacity: 0.9 }}>
              Connecting waste donors with recyclers to promote sustainable practices 
              and circular economy. Together, we turn waste into valuable resources.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/items">Browse Items</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Get In Touch</h5>
            <ul className="footer-links">
              <li>
                <FaEnvelope /> Email: info@wastetwealth.com
              </li>
              <li>
                <FaGithub /> GitHub: github.com/waste-to-wealth
              </li>
              <li>
                <FaLinkedin /> LinkedIn: linkedin.com/company/waste-to-wealth
              </li>
            </ul>
            <div className="social-icons">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedin />
              </a>
              <a href="mailto:info@wastetwealth.com" className="social-icon">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="mb-0">
            &copy; {currentYear} Waste-to-Wealth Marketplace. Made with <FaHeart style={{ color: '#ff6b6b' }} /> for a sustainable future.
          </p>
          <p className="mb-0 mt-2" style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Promoting Circular Economy & Sustainability through Technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
