import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserCircle, FaRecycle } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Mock successful login for demo
      setTimeout(() => {
        // ✅ Extract user & token from backend response
        const { user, token } = response.data;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        
        setTimeout(() => {
          navigate(`/${formData.role.toLowerCase()}-dashboard`);
        }, 1000);
        
        setLoading(false);
      }, 1500);

    } catch (error) {
      setLoading(false);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Login failed. Please try again.' 
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
                <h2>Welcome Back!</h2>
                <p>Login to access your dashboard</p>
              </div>
              <div className="auth-body">
                {message.text && (
                  <div className={`alert ${message.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'} alert-custom`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
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
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div className="mb-4">
                    <label className="form-label-custom">
                      <FaUserCircle /> Login As
                    </label>
                    <select
                      className={`form-control form-control-custom ${errors.role ? 'is-invalid' : ''}`}
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="User">User (Waste Donor)</option>
                      <option value="Recycler">Recycler</option>
                      {/* <option value="Admin">Admin</option> */}
                    </select>
                    {errors.role && (
                      <div className="invalid-feedback">{errors.role}</div>
                    )}
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
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>

                  {/* Register Link */}
                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-primary-green fw-bold">
                        Register here
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

export default Login;
