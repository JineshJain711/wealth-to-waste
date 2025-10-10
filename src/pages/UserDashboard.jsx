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
    category: 'Plastic',
    quantity: '',
    description: ''
  });

  // Mock data for user's requests
  const [myRequests, setMyRequests] = useState([
    { id: 1, itemName: 'Plastic Bottles', category: 'Plastic', quantity: '50 kg', status: 'Pending', date: '2025-10-08', recycler: 'Not assigned' },
    { id: 2, itemName: 'Old Newspapers', category: 'Paper', quantity: '30 kg', status: 'Accepted', date: '2025-10-07', recycler: 'Green Recyclers' },
    { id: 3, itemName: 'Metal Cans', category: 'Metal', quantity: '20 kg', status: 'Completed', date: '2025-10-05', recycler: 'EcoMetal Ltd' }
  ]);

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
      
      setTimeout(() => {
        setMessage({ type: 'success', text: 'Item listed successfully!' });
        setItemForm({ name: '', category: 'Plastic', quantity: '', description: '' });
        setLoading(false);
        
        // Add to requests
        const newRequest = {
          id: myRequests.length + 1,
          itemName: itemForm.name,
          category: itemForm.category,
          quantity: itemForm.quantity + ' kg',
          status: 'Pending',
          date: new Date().toISOString().split('T')[0],
          recycler: 'Not assigned'
        };
        setMyRequests(prev => [newRequest, ...prev]);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setMessage({ type: 'error', text: 'Failed to list item. Please try again.' });
    }
  };

  const handleCancelRequest = (id) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      setMyRequests(prev => prev.filter(req => req.id !== id));
      setMessage({ type: 'success', text: 'Request cancelled successfully!' });
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
          <FaRecycle /> Welcome, {user?.name}!
        </h1>
        <p className="dashboard-subtitle">Manage your recyclable items and track pickup requests</p>
      </div>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'} alert-custom`}>
          {message.text}
        </div>
      )}

      {/* Tab Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'list-item' ? 'active' : ''}`}
            onClick={() => setActiveTab('list-item')}
          >
            <FaPlus /> List New Item
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'my-requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-requests')}
          >
            <FaList /> My Requests
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === 'list-item' && (
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
                  <option value="Plastic">Plastic</option>
                  <option value="Metal">Metal</option>
                  <option value="Paper">Paper</option>
                  <option value="E-Waste">E-Waste</option>
                  <option value="Glass">Glass</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label-custom">Quantity (kg)</label>
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
            <button type="submit" className="btn btn-primary-custom" disabled={loading}>
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

      {activeTab === 'my-requests' && (
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
                  myRequests.map(request => (
                    <tr key={request.id}>
                      <td className="fw-bold">{request.itemName}</td>
                      <td>
                        <span className="item-category">{request.category}</span>
                      </td>
                      <td>{request.quantity}</td>
                      <td>
                        <span className={getStatusBadge(request.status)}>
                          {request.status}
                        </span>
                      </td>
                      <td>{request.date}</td>
                      <td>{request.recycler}</td>
                      <td>
                        {request.status === 'Pending' && (
                          <button
                            className="btn btn-danger-custom btn-sm"
                            onClick={() => handleCancelRequest(request.id)}
                          >
                            <FaTrash /> Cancel
                          </button>
                        )}
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
