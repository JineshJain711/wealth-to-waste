import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaRecycle, FaHome, FaInfoCircle, FaEnvelope, FaSignOutAlt, FaTachometerAlt, FaList, FaTruck } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaRecycle /> Waste-to-Wealth
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                <FaHome /> Home
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive(`/${user.role.toLowerCase()}-dashboard`)}`} 
                    to={`/${user.role.toLowerCase()}-dashboard`}
                  >
                    <FaTachometerAlt /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/items')}`} to="/items">
                    <FaList /> Items
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/pickup-requests')}`} to="/pickup-requests">
                    <FaTruck /> Pickups
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/about')}`} to="/about">
                    <FaInfoCircle /> About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
                    <FaEnvelope /> Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout ({user.name})
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/about')}`} to="/about">
                    <FaInfoCircle /> About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
                    <FaEnvelope /> Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/login')}`} to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/register')}`} to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
