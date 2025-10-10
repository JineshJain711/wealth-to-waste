import React, { useState } from 'react';
import { FaTruck, FaCheckCircle, FaList, FaRecycle } from 'react-icons/fa';

const RecyclerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Mock data for available requests
  const [availableRequests, setAvailableRequests] = useState([
    { id: 1, itemName: 'Plastic Bottles', category: 'Plastic', quantity: '50 kg', user: 'John Doe', location: 'Mumbai', date: '2025-10-08', status: 'Available' },
    { id: 2, itemName: 'Cardboard Boxes', category: 'Paper', quantity: '40 kg', user: 'Jane Smith', location: 'Delhi', date: '2025-10-08', status: 'Available' },
    { id: 3, itemName: 'Aluminum Cans', category: 'Metal', quantity: '25 kg', user: 'Mike Johnson', location: 'Bangalore', date: '2025-10-07', status: 'Available' }
  ]);

  // Mock data for accepted jobs
  const [acceptedJobs, setAcceptedJobs] = useState([
    { id: 4, itemName: 'Old Newspapers', category: 'Paper', quantity: '30 kg', user: 'Sarah Williams', location: 'Chennai', date: '2025-10-07', status: 'Accepted' },
    { id: 5, itemName: 'E-Waste', category: 'E-Waste', quantity: '15 kg', user: 'David Brown', location: 'Pune', date: '2025-10-06', status: 'Accepted' }
  ]);

  const handleAcceptRequest = (id) => {
    const request = availableRequests.find(req => req.id === id);
    if (request) {
      setAcceptedJobs(prev => [...prev, { ...request, status: 'Accepted' }]);
      setAvailableRequests(prev => prev.filter(req => req.id !== id));
      setMessage({ type: 'success', text: 'Request accepted successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleMarkCompleted = (id) => {
    if (window.confirm('Mark this pickup as completed?')) {
      setAcceptedJobs(prev => prev.filter(job => job.id !== id));
      setMessage({ type: 'success', text: 'Pickup marked as completed!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const getStatusBadge = (status) => {
    return status === 'Available' ? 'badge-pending' : 'badge-accepted';
  };

  return (
    <div className="container my-5">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <FaTruck /> Recycler Dashboard
        </h1>
        <p className="dashboard-subtitle">Welcome, {user?.name}! Manage pickup requests and collections</p>
      </div>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'} alert-custom`}>
          {message.text}
        </div>
      )}

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="stats-card">
            <div className="stats-icon"><FaList /></div>
            <div className="stats-number">{availableRequests.length}</div>
            <div className="stats-label">Available Requests</div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="stats-card">
            <div className="stats-icon"><FaTruck /></div>
            <div className="stats-number">{acceptedJobs.length}</div>
            <div className="stats-label">Accepted Jobs</div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="stats-card">
            <div className="stats-icon"><FaCheckCircle /></div>
            <div className="stats-number">12</div>
            <div className="stats-label">Completed Pickups</div>
          </div>
        </div>
      </div>

      {/* Available Requests */}
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <FaRecycle /> Available Pickup Requests
        </div>
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>User</th>
                <th>Location</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {availableRequests.length > 0 ? (
                availableRequests.map(request => (
                  <tr key={request.id}>
                    <td className="fw-bold">{request.itemName}</td>
                    <td><span className="item-category">{request.category}</span></td>
                    <td>{request.quantity}</td>
                    <td>{request.user}</td>
                    <td>{request.location}</td>
                    <td>{request.date}</td>
                    <td>
                      <button
                        className="btn btn-success-custom btn-sm"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        <FaCheckCircle /> Accept
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No available requests at the moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accepted Jobs */}
      <div className="card-custom">
        <div className="card-header-custom">
          <FaTruck /> My Accepted Jobs
        </div>
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>User</th>
                <th>Location</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {acceptedJobs.length > 0 ? (
                acceptedJobs.map(job => (
                  <tr key={job.id}>
                    <td className="fw-bold">{job.itemName}</td>
                    <td><span className="item-category">{job.category}</span></td>
                    <td>{job.quantity}</td>
                    <td>{job.user}</td>
                    <td>{job.location}</td>
                    <td>{job.date}</td>
                    <td>
                      <button
                        className="btn btn-primary-custom btn-sm"
                        onClick={() => handleMarkCompleted(job.id)}
                      >
                        <FaCheckCircle /> Mark Completed
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No accepted jobs yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecyclerDashboard;
