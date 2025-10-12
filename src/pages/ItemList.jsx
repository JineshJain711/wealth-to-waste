import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaRecycle, FaUser, FaClock, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const ItemList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [message, setMessage] = useState({ type: '', text: '' });

  // Mock data for items
  const [items, setItems] = useState([]);

  const token  = localStorage.getItem('token');

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
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchItems();
  }, []);

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAcceptRequest = async (id) => {
      try {
        const response = await axios.put(`http://localhost:5000/api/items/accept/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        setMessage({ type: 'success', text: response.data.message });
        // fetchAvailableRequests();
        // fetchAcceptedJobs();
        window.location.reload();
      }
      catch (error) {
        setMessage({ type: 'error', text: error.response?.data?.message || 'Error accepting request' });
      }
    };

  const getStatusBadge = (status) => {
    const badges = {
      'Available': 'badge-pending',
      'Accepted': 'badge-accepted',
      'Completed': 'badge-completed'
    };
    return badges[status] || 'badge-pending';
  };

  return (
    <div className="container my-5">
      <div className="dashboard-header mb-4">
        <h1 className="dashboard-title">
          <FaRecycle /> Browse Recyclable Items
        </h1>
        <p className="dashboard-subtitle">
          Explore available items for recycling
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="input-group">
              <span
                className="input-group-text"
                style={{
                  background: "#2E7D32",
                  color: "white",
                  borderRadius: "10px 0 0 10px",
                }}
              >
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: "0 10px 10px 0" }}
              />
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <select
              className="form-control form-control-custom"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Plastic">Plastic</option>
              <option value="Metal">Metal</option>
              {/* <option value="Paper">Paper</option> */}
              <option value="E-Waste">E-Waste</option>
              {/* <option value="Glass">Glass</option> */}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <select
              className="form-control form-control-custom"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="row">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4 mb-4">
              <div className="item-card">
                <div className="item-card-header">{item.name}</div>
                <div className="item-card-body">
                  <span className="item-category">{item.category}</span>
                  <h5 className="mt-3 mb-2 fw-bold">
                    Quantity: {item.quantity}
                  </h5>
                  <p className="text-muted mb-3">{item.description}</p>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">
                      <FaUser /> {item.user?.name}
                    </small>
                    <small className="text-muted">
                      <FaClock />{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className={getStatusBadge(item.status)}>
                      {item.status}
                    </span>
                    {item.status === "Available" && (
                      <button className="btn btn-success-custom btn-sm">
                        Request Pickup
                      </button>
                    )}
                    <button
                      className="btn btn-success-custom btn-sm"
                      onClick={() => handleAcceptRequest(item._id)}
                    >
                      <FaCheckCircle /> Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="card-custom p-5 text-center">
              <FaRecycle size={60} className="text-muted mb-3" />
              <h4 className="text-muted">No items found</h4>
              <p className="text-muted">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
