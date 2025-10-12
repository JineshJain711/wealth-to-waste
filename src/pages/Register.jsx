import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserCircle, FaRecycle } from 'react-icons/fa';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
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
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
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
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call - Replace with actual API endpoint
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      // Mock successful registration for demo
      setTimeout(() => {
        setMessage({ 
          type: 'success', 
          text: 'Registration successful! Redirecting to login...' 
        });
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        
        setLoading(false);
      }, 1500);

    } catch (error) {
      setLoading(false);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Registration failed. Please try again.' 
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="auth-card">
              <div className="auth-header">
                <FaRecycle size={50} />
                <h2>Join Us Today!</h2>
                <p>Create your account and start making a difference</p>
              </div>
              <div className="auth-body">
                {message.text && (
                  <div className={`alert ${message.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'} alert-custom`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="mb-3">
                    <label className="form-label-custom">
                      <FaUser /> Full Name
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-custom ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label-custom">
                      <FaEnvelope /> Email Address
                    </label>
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

                  {/* Password Field */}
                  <div className="mb-3">
                    <label className="form-label-custom">
                      <FaLock /> Password
                    </label>
                    <input
                      type="password"
                      className={`form-control form-control-custom ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="mb-3">
                    <label className="form-label-custom">
                      <FaLock /> Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control form-control-custom ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div className="mb-4">
                    <label className="form-label-custom">
                      <FaUserCircle /> Register As
                    </label>
                    <select
                      className={`form-control form-control-custom ${errors.role ? 'is-invalid' : ''}`}
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="User">User (Waste Donor)</option>
                      <option value="Recycler">Recycler</option>
                    </select>
                    {errors.role && (
                      <div className="invalid-feedback">{errors.role}</div>
                    )}
                    <small className="text-muted">
                      {formData.role === 'User' 
                        ? 'List recyclable items and request pickups' 
                        : 'Accept pickup requests and collect recyclables'}
                    </small>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary-custom w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Register'
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="mb-0">
                      Already have an account?{' '}
                      <Link to="/login" className="text-primary-green fw-bold">
                        Login here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
