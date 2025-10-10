import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaTruck, FaCoins, FaLeaf, FaUsers, FaChartLine } from 'react-icons/fa';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title">
              <FaLeaf /> Turning Waste into Wealth 🌱
            </h1>
            <p className="hero-subtitle">
              Join the circular economy revolution. Connect with recyclers and turn your waste into valuable resources.
            </p>
            <div className="mt-4">
              {user ? (
                <Link to={`/${user.role.toLowerCase()}-dashboard`} className="btn btn-primary-custom btn-lg me-3">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary-custom btn-lg me-3">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-outline-custom btn-lg">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary-green fw-bold">How It Works</h2>
            <p className="text-muted">Simple steps to start recycling and earning</p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-icon">
                  <FaRecycle />
                </div>
                <h3 className="step-title">List Your Waste</h3>
                <p className="step-description">
                  Register and list your recyclable items (plastic, metal, paper, e-waste) with details and quantity.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-icon">
                  <FaTruck />
                </div>
                <h3 className="step-title">Recycler Picks Up</h3>
                <p className="step-description">
                  Verified recyclers accept your request and schedule a convenient pickup time for collection.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-icon">
                  <FaCoins />
                </div>
                <h3 className="step-title">Earn Rewards</h3>
                <p className="step-description">
                  Get rewarded for your contribution to sustainability and help build a circular economy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding" style={{ background: '#f5f5f5' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary-green fw-bold">Why Choose Us?</h2>
            <p className="text-muted">Making recycling easy, transparent, and rewarding</p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card-custom text-center p-4">
                <FaUsers size={50} className="text-primary-green mb-3" />
                <h4 className="fw-bold">Verified Network</h4>
                <p className="text-muted">
                  Connect with verified recyclers and waste donors in a trusted marketplace.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card-custom text-center p-4">
                <FaChartLine size={50} className="text-primary-green mb-3" />
                <h4 className="fw-bold">Track Progress</h4>
                <p className="text-muted">
                  Monitor your recycling impact and track all transactions in real-time.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card-custom text-center p-4">
                <FaLeaf size={50} className="text-primary-green mb-3" />
                <h4 className="fw-bold">Eco-Friendly</h4>
                <p className="text-muted">
                  Contribute to environmental sustainability and reduce carbon footprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding">
        <div className="container">
          <div className="card-custom p-5 text-center" style={{ background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)', color: 'white' }}>
            <h2 className="fw-bold mb-3">Ready to Make a Difference?</h2>
            <p className="mb-4" style={{ fontSize: '1.2rem' }}>
              Join thousands of users contributing to a sustainable future
            </p>
            {!user && (
              <Link to="/register" className="btn btn-lg" style={{ background: 'white', color: '#2E7D32', fontWeight: 'bold', padding: '1rem 3rem', borderRadius: '10px' }}>
                Join Now - It's Free!
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
