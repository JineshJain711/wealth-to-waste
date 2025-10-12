import React, { useEffect, useState } from 'react';
import { FaTruck, FaCheckCircle, FaList, FaRecycle } from 'react-icons/fa';
import axios from 'axios';
// import { set } from 'mongoose';

const RecyclerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [message, setMessage] = useState({ type: '', text: '' });
  const [availableRequests, setAvailableRequests] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [completedPickups, setCompletedPickups] = useState([]);

  const token = localStorage.getItem('token');

  // Fetch available requests from backend
  const fetchCompletedRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items/completed', {
        headers: { Authorization: `Bearer ${token}`}
      });
      setCompletedPickups(response.data);
    }
    catch (error) {
      console.error('Error fetching available requests: ', error);
    }
  }

  // fetch accepted jobs from backend
  const fetchAcceptedJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items/accepted', {
        headers: { Authorization: `Bearer ${token}`}
      });

      setAcceptedJobs(response.data);
    }
    catch (error) {
      console.error('Error in fetching accepted jobs: ', error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/items/available",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAvailableRequests(response.data);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    // fetchAvailableRequests();
    fetchCompletedRequests();
    fetchAcceptedJobs();
  }, [fetchCompletedRequests, fetchAcceptedJobs]);

  const handleAcceptRequest = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/items/accept/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ type: 'success', text: response.data.message });
      // fetchAvailableRequests();
      fetchAcceptedJobs();
    }
    catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error accepting request' });
    }
  };

  const handleMarkCompleted = async (id) => {
    if (window.confirm('Mark this pickup as completed...')) {
      try {
        const response = await axios.put(`http://localhost:5000/api/items/complete/${id}`, 
          {},
          { headers: ({ Authorization: `Bearer ${token}` }) }
        );

        setMessage({ type: 'success', text: response.data.message });
        fetchAcceptedJobs();
      }
      catch (error) {
        setMessage({ type: 'error', text: error.response?.data?.message || 'Error marking as completed'})
      }
    }
  };

  // const formateDate = (date) => {
  //   new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric'});
  // }

  // const getStatusBadge = (status) => {
  //   return status === 'Available' ? 'badge-pending' : 'badge-accepted';
  // };

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
            <div className="stats-number">{completedPickups.length}</div>
            <div className="stats-label">Completed Pickups</div>
          </div>
        </div>
      </div>

      {/* Available Requests */}
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <FaRecycle /> Completed Requests
        </div>
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>User</th>
                {/* <th>Location</th> */}
                <th>Date</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {completedPickups.length > 0 ? (
                completedPickups.map(complete => (
                  <tr key={complete._id}>
                    <td className="fw-bold">{complete.name}</td>
                    <td><span className="item-category">{complete.category}</span></td>
                    <td>{complete.quantity}</td>
                    <td>{complete.user?.name}</td>
                    {/* <td>{complete.location}</td> */}
                    <td>
                      {new Date(complete.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                    </td>
                    {/* <td>
                      <button
                        className="btn btn-success-custom btn-sm"
                        onClick={() => handleAcceptRequest(request._id)}
                      >
                        <FaCheckCircle /> Accept
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No completed pickups yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accepted Jobs */}
      {/* <div className="card-custom">
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
                  <tr key={job._id}>
                    <td className="fw-bold">{job.name}</td>
                    <td><span className="item-category">{job.category}</span></td>
                    <td>{job.quantity}</td>
                    <td>{job.user?.name}</td>
                    <td>{job.location}</td>
                    <td>
                      {new Date(job.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary-custom btn-sm"
                        onClick={() => handleMarkCompleted(job._id)}
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
      </div> */}
    </div>
  );
};

export default RecyclerDashboard;
