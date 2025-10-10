import React from 'react';
import { FaRecycle, FaLeaf, FaUsers, FaGlobe, FaLightbulb, FaHandshake } from 'react-icons/fa';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '3rem 0' }}>
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>
              <FaRecycle /> About Waste-to-Wealth
            </h1>
            <p className="hero-subtitle">
              Promoting circular economy and sustainability through technology
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4">
              <h2 className="text-primary-green fw-bold mb-4">Our Mission</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Waste-to-Wealth is a digital marketplace designed to connect waste donors with recyclers, 
                creating a sustainable ecosystem where recyclable materials are efficiently collected and processed.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                We believe that waste is not just garbage—it's a valuable resource waiting to be transformed. 
                Our platform makes recycling accessible, transparent, and rewarding for everyone involved.
              </p>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card-custom p-4" style={{ background: 'linear-gradient(135deg, #A5D6A7 0%, #81C784 100%)' }}>
                <FaLeaf size={80} style={{ color: '#2E7D32', marginBottom: '1rem' }} />
                <h3 className="fw-bold" style={{ color: '#1B5E20' }}>Turning Waste into Wealth</h3>
                <p style={{ color: '#2E7D32', fontSize: '1.1rem' }}>
                  Every piece of waste has potential. Together, we're building a cleaner, greener future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="section-padding" style={{ background: '#f5f5f5' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary-green fw-bold">The Challenge We Address</h2>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card-custom p-4 h-100">
                <h4 className="text-danger fw-bold mb-3">❌ The Problem</h4>
                <ul style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                  <li>Improper disposal of recyclables causes pollution and resource loss</li>
                  <li>No efficient platform connecting waste donors with recyclers</li>
                  <li>Existing systems lack transparency and tracking</li>
                  <li>Recyclable materials end up in landfills instead of being reused</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card-custom p-4 h-100" style={{ borderLeft: '5px solid #2E7D32' }}>
                <h4 className="text-primary-green fw-bold mb-3">✓ Our Solution</h4>
                <ul style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                  <li>Digital marketplace for listing and collecting recyclables</li>
                  <li>Role-based access for Users, Recyclers, and Admins</li>
                  <li>Real-time tracking of pickup requests and transactions</li>
                  <li>Secure, transparent, and efficient waste management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary-green fw-bold">What We Offer</h2>
            <p className="text-muted">Comprehensive features for sustainable recycling</p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="step-card">
                <div className="step-icon"><FaGlobe /></div>
                <h4 className="step-title">Circular Economy</h4>
                <p className="step-description">
                  Recycling and reuse of waste supports item listing and pickup tracking, 
                  creating a closed-loop system.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-card">
                <div className="step-icon"><FaLeaf /></div>
                <h4 className="step-title">Sustainability</h4>
                <p className="step-description">
                  Promotes eco-friendly disposal and encourages responsible user participation 
                  in environmental conservation.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-card">
                <div className="step-icon"><FaHandshake /></div>
                <h4 className="step-title">Digital Marketplace</h4>
                <p className="step-description">
                  Treats waste as a tradable resource with features for request pickups, 
                  accept listings, and monitor transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section-padding" style={{ background: '#f5f5f5' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary-green fw-bold">
              <FaLightbulb /> Technology Stack
            </h2>
            <p className="text-muted">Built with modern, reliable technologies</p>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card-custom p-4">
                <h4 className="fw-bold mb-3 text-primary-green">Frontend</h4>
                <ul style={{ fontSize: '1.05rem' }}>
                  <li><strong>React.js + Bootstrap:</strong> User-friendly interface for registration, login, item listing, and pickup requests</li>
                  <li><strong>React Router DOM:</strong> Seamless navigation between pages</li>
                  <li><strong>Axios:</strong> Efficient API communication</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card-custom p-4">
                <h4 className="fw-bold mb-3 text-primary-green">Backend (Planned)</h4>
                <ul style={{ fontSize: '1.05rem' }}>
                  <li><strong>Node.js + Express.js:</strong> Handles authentication (JWT), APIs, and business logic</li>
                  <li><strong>MongoDB:</strong> Stores users, recyclable items, pickup requests, and transaction details</li>
                  <li><strong>Role-based Access Control:</strong> Secure data management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary-green fw-bold">
              <FaUsers /> Our Team
            </h2>
            <p className="text-muted">Passionate developers committed to sustainability</p>
          </div>
          <div className="card-custom p-5 text-center">
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              This project is developed as part of our semester project to demonstrate 
              the power of technology in solving real-world environmental challenges. 
              We are students dedicated to creating innovative solutions for a sustainable future.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              <strong>Institution:</strong> [Your Institute Name]<br />
              <strong>Department:</strong> Computer Science & Engineering<br />
              <strong>Year:</strong> 2025
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)', color: 'white' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Join the Movement</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Be part of the solution. Start recycling responsibly today.
          </p>
          <div>
            <FaRecycle size={60} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
