import React, { useState, useEffect } from 'react';
import { FaPlus, FaList, FaRecycle, FaTruck, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [activeTab, setActiveTab] = useState('list-item');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  
  // Form state for listing items
  const [itemForm, setItemForm] = useState({
    name: '',
    category: '',
    quantity: '',
    description: ''
  });

  // Mock data for user's requests
  const [myRequests, setMyRequests] = useState([]);

  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:5000/api/items/my', {
        headers: {Authorization: `Bearer ${token}`}
      });

      setMyRequests(response.data);

    }
    catch (error) {
      console.error('Error fetching items: ', error);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const handleItemFormChange = (e) => {
    const { name, value } = e.target;
    setItemForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      // await axios.post('/api/items', itemForm);

      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/items',
        itemForm,
        {
          headers: { Authorization: `Bearer ${token}`}
        }
      );
      
      setMessage({ type: 'success', text: response.data.message });
      setItemForm({ name: '', category: 'Plastic', quantity: '', description: '' });
      setLoading(false);

      // refresh item list
      fetchMyItems();

    } catch (error) {
      setLoading(false);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to list item..!!' });
    }
  };

  const handleCancelRequest = async (id) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.delete(`http://localhost:5000/api/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setMessage({ type: 'success', text: response.data.message });
        fetchMyItems();
      }
      catch (error) {
        setMessage({ type: 'error', text: 'Failed to cancel request..!!'});
      }
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

  return (
    <div className="container my-5">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <FaRecycle /> Welcome, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="dashboard-subtitle">
          Manage your recyclable items and track pickup requests
        </p>
      </div>

      {message.text && (
        <div
          className={`alert ${
            message.type === "success"
              ? "alert-success-custom"
              : "alert-error-custom"
          } alert-custom`}
        >
          {message.text}
        </div>
      )}

      {/* Tab Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "list-item" ? "active" : ""}`}
            onClick={() => setActiveTab("list-item")}
          >
            <FaPlus /> List New Item
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "my-requests" ? "active" : ""
            }`}
            onClick={() => setActiveTab("my-requests")}
          >
            <FaList /> My Requests
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === "list-item" && (
        <div className="card-custom p-4">
          <h3 className="mb-4 text-primary-green">
            <FaRecycle /> List Recyclable Item
          </h3>
          <form onSubmit={handleSubmitItem}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label-custom">Item Name</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  name="name"
                  value={itemForm.name}
                  onChange={handleItemFormChange}
                  placeholder="e.g., Plastic Bottles"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label-custom">Category</label>
                <select
                  className="form-control form-control-custom"
                  name="category"
                  value={itemForm.category}
                  onChange={handleItemFormChange}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Plastic">Plastic</option>
                  <option value="Metal">Metal</option>
                  {/* <option value="Paper">Paper</option> */}
                  <option value="E-Waste">E-Waste</option>
                  {/* <option value="Glass">Glass</option>
                  <option value="Other">Other</option> */}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label-custom">Quantity (units)</label>
                <input
                  type="number"
                  className="form-control form-control-custom"
                  name="quantity"
                  value={itemForm.quantity}
                  onChange={handleItemFormChange}
                  placeholder="Enter quantity in kg"
                  min="1"
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label-custom">Description</label>
                <textarea
                  className="form-control form-control-custom"
                  name="description"
                  value={itemForm.description}
                  onChange={handleItemFormChange}
                  rows="4"
                  placeholder="Provide details about the item condition, location, etc."
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary-custom"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Listing Item...
                </>
              ) : (
                <>
                  <FaPlus /> List Item
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {activeTab === "my-requests" && (
        <div className="card-custom">
          <div className="card-header-custom">
            <FaTruck /> My Pickup Requests
          </div>
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Recycler</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.length > 0 ? (
                  myRequests.map((request) => (
                    <tr key={request._id}>
                      <td className="font-bold text-gray-700">
                        {request.name}
                      </td>
                      <td>
                        <span className="item-category">
                          {request.category}
                        </span>
                      </td>
                      <td>{request.quantity}</td>
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
                      <td>
                        {request.recycler ? (
                          request.recycler.name
                        ) : (
                          <span className="text-muted">Not assigned</span>
                        )}
                      </td>
                      <td>
                          <button
                            className={request.status === "Pending" ? "btn btn-danger-custom btn-sm" : "btn btn-danger-custom1"}
                            onClick={() => handleCancelRequest(request._id)}
                            disabled={request.status !== "Pending"}
                          >
                            <FaTrash /> Cancel
                          </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No requests found. Start by listing an item!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
