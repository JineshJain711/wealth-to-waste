import React, { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      // Simulate API call
      setTimeout(() => {
        setSubmitMessage({ 
          type: 'success', 
          text: 'Thank you for contacting us! We will get back to you soon.' 
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Failed to send message. Please try again.' 
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '3rem 0' }}>
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>
              <FaEnvelope /> Get In Touch
            </h1>
            <p className="hero-subtitle">
              We'd love to hear from you. Send us a message!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-7 mb-4">
              <div className="card-custom p-4">
                <h3 className="text-primary-green fw-bold mb-4">Send Us a Message</h3>
                
                {submitMessage.text && (
                  <div className={`alert ${submitMessage.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'} alert-custom`}>
                    {submitMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Your Name</label>
                      <input
                        type="text"
                        className={`form-control form-control-custom ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Your Email</label>
                      <input
                        type="email"
                        className={`form-control form-control-custom ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label-custom">Subject</label>
                    <input
                      type="text"
                      className={`form-control form-control-custom ${errors.subject ? 'is-invalid' : ''}`}
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                    />
                    {errors.subject && (
                      <div className="invalid-feedback">{errors.subject}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="form-label-custom">Message</label>
                    <textarea
                      className={`form-control form-control-custom ${errors.message ? 'is-invalid' : ''}`}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      placeholder="Write your message here..."
                    ></textarea>
                    {errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary-custom" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-5 mb-4">
              <div className="card-custom p-4 mb-4" style={{ background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)', color: 'white' }}>
                <h3 className="fw-bold mb-4">Contact Information</h3>
                <div className="mb-4">
                  <h5 className="mb-2">
                    <FaEnvelope /> Email
                  </h5>
                  <p className="mb-0" style={{ opacity: 0.9 }}>
                    info@wastetwealth.com<br />
                    support@wastetwealth.com
                  </p>
                </div>
                <div className="mb-4">
                  <h5 className="mb-2">
                    <FaPhone /> Phone
                  </h5>
                  <p className="mb-0" style={{ opacity: 0.9 }}>
                    +91 1234567890<br />
                    +91 0987654321
                  </p>
                </div>
                <div className="mb-4">
                  <h5 className="mb-2">
                    <FaMapMarkerAlt /> Address
                  </h5>
                  <p className="mb-0" style={{ opacity: 0.9 }}>
                    [Your Institute Name]<br />
                    Department of Computer Science<br />
                    City, State - PIN Code
                  </p>
                </div>
              </div>

              <div className="card-custom p-4">
                <h4 className="fw-bold mb-3 text-primary-green">Connect With Us</h4>
                <div className="d-flex gap-3">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-custom"
                    style={{ flex: 1 }}
                  >
                    <FaGithub size={24} />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-custom"
                    style={{ flex: 1 }}
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a 
                    href="mailto:info@wastetwealth.com"
                    className="btn btn-outline-custom"
                    style={{ flex: 1 }}
                  >
                    <FaEnvelope size={24} />
                  </a>
                </div>
                <p className="mt-3 mb-0 text-muted text-center">
                  Follow us on social media for updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
