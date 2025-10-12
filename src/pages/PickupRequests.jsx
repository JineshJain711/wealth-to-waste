import React, { useState, useEffect } from 'react';
import { FaTruck, FaFilter } from 'react-icons/fa';
import axios from 'axios';

const PickupRequests = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [statusFilter, setStatusFilter] = useState('All');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [requests, setRequests] = useState([]);
  // const [acceptedJobs, setAcceptedJobs] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/items/accepted",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching pickup requests:", error);
      }
    };
    fetchRequests();
  }, [token]);

  // Filter requests
  const filteredRequests = requests.filter(req => 
    statusFilter === 'All' || req.status === statusFilter
  );
  

  const fetchAcceptedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items/accepted', {
          headers: { Authorization: `Bearer ${token}`}
        });
  
        setRequests(response.data);
      }
      catch (error) {
        console.error('Error in fetching accepted jobs: ', error);
      }
    };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      if (newStatus === "Accepted") {
        await axios.put(
          `http://localhost:5000/api/items/accept/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (newStatus === "Completed") {
        await axios.put(
          `http://localhost:5000/api/items/complete/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setMessage({ type: "success", text: `Status updated to ${newStatus}` });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);

      // Refresh requests from backend
      const response = await axios.get("http://localhost:5000/api/items/accepted", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error updating status",
      });
    }
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
                {/* <th>Location</th> */}
                <th>Status</th>
                <th>Date</th>
                {canUpdateStatus() && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <tr key={request._id}>
                    <td className="fw-bold">{request.name}</td>
                    <td>{request.user.name}</td>
                    <td>{request.recycler ? request.recycler.name : 'Not assigned'}</td>
                    <td>{request.quantity}</td>
                    {/* <td>{request.location}</td> */}
                    <td>
                      <span className={getStatusBadge(request.status)}>
                        {request.status}
                      </span>
                    </td>
                    <td>
                      {new Date(request.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                    </td>
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
                            onClick={() => handleUpdateStatus(request._id, 'Completed')}
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
