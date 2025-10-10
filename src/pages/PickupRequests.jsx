import React, { useState } from 'react';
import { FaTruck, FaFilter, FaEdit } from 'react-icons/fa';

const PickupRequests = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [statusFilter, setStatusFilter] = useState('All');
  const [message, setMessage] = useState({ type: '', text: '' });

  // Mock data for pickup requests
  const [requests, setRequests] = useState([
    { id: 1, itemName: 'Plastic Bottles', user: 'John Doe', recycler: 'Green Recyclers', quantity: '50 kg', status: 'Pending', date: '2025-10-08', location: 'Mumbai' },
    { id: 2, itemName: 'Old Newspapers', user: 'Jane Smith', recycler: 'Green Recyclers', quantity: '30 kg', status: 'Accepted', date: '2025-10-07', location: 'Delhi' },
    { id: 3, itemName: 'Metal Cans', user: 'Mike Johnson', recycler: 'EcoMetal Ltd', quantity: '20 kg', status: 'Completed', date: '2025-10-05', location: 'Bangalore' },
    { id: 4, itemName: 'Cardboard Boxes', user: 'Sarah Williams', recycler: 'Not assigned', quantity: '40 kg', status: 'Pending', date: '2025-10-08', location: 'Chennai' },
    { id: 5, itemName: 'E-Waste', user: 'David Brown', recycler: 'TechRecycle', quantity: '15 kg', status: 'Accepted', date: '2025-10-06', location: 'Pune' }
  ]);

  // Filter requests
  const filteredRequests = requests.filter(req => 
    statusFilter === 'All' || req.status === statusFilter
  );

  const handleUpdateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
    setMessage({ type: 'success', text: `Status updated to ${newStatus}` });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Pending': 'badge-pending',
      'Accepted': 'badge-accepted',
      'Completed': 'badge-completed',
      'Cancelled': 'badge-cancelled'
    };
    return badges[status] || 'badge-pending';
  };

  const canUpdateStatus = () => {
    return user && (user.role === 'Admin' || user.role === 'Recycler');
  };

  return (
    <div className="container my-5">
      <div className="dashboard-header mb-4">
        <h1 className="dashboard-title">
          <FaTruck /> Pickup Requests
        </h1>
        <p className="dashboard-subtitle">View and manage all pickup requests</p>
      </div>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'} alert-custom`}>
          {message.text}
        </div>
      )}

      {/* Filter Section */}
      <div className="search-filter-section mb-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <label className="form-label-custom">
              <FaFilter /> Filter by Status
            </label>
            <select
              className="form-control form-control-custom"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="col-md-8 text-end">
            <p className="mb-0 text-muted">
              Showing {filteredRequests.length} of {requests.length} requests
            </p>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="card-custom">
        <div className="card-header-custom">
          <FaTruck /> All Pickup Requests
        </div>
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>User</th>
                <th>Recycler</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
                {canUpdateStatus() && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <tr key={request.id}>
                    <td className="fw-bold">{request.itemName}</td>
                    <td>{request.user}</td>
                    <td>{request.recycler}</td>
                    <td>{request.quantity}</td>
                    <td>{request.location}</td>
                    <td>
                      <span className={getStatusBadge(request.status)}>
                        {request.status}
                      </span>
                    </td>
                    <td>{request.date}</td>
                    {canUpdateStatus() && (
                      <td>
                        {request.status === 'Pending' && (
                          <button
                            className="btn btn-success-custom btn-sm me-2"
                            onClick={() => handleUpdateStatus(request.id, 'Accepted')}
                          >
                            Accept
                          </button>
                        )}
                        {request.status === 'Accepted' && (
                          <button
                            className="btn btn-primary-custom btn-sm"
                            onClick={() => handleUpdateStatus(request.id, 'Completed')}
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={canUpdateStatus() ? "8" : "7"} className="text-center py-4">
                    No requests found for the selected filter
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

export default PickupRequests;
