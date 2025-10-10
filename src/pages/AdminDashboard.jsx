import React, { useState } from 'react';
import { FaUsers, FaTruck, FaCheckCircle, FaRecycle, FaTrash, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', joined: '2025-09-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', joined: '2025-09-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', joined: '2025-10-01', status: 'Active' }
  ]);

  // Mock data for recyclers
  const [recyclers, setRecyclers] = useState([
    { id: 1, name: 'Green Recyclers', email: 'green@recyclers.com', role: 'Recycler', joined: '2025-08-10', status: 'Active' },
    { id: 2, name: 'EcoMetal Ltd', email: 'eco@metal.com', role: 'Recycler', joined: '2025-08-25', status: 'Active' }
  ]);

  // Mock data for all transactions
  const [transactions, setTransactions] = useState([
    { id: 1, item: 'Plastic Bottles', user: 'John Doe', recycler: 'Green Recyclers', quantity: '50 kg', status: 'Completed', date: '2025-10-05' },
    { id: 2, item: 'Old Newspapers', user: 'Jane Smith', recycler: 'Green Recyclers', quantity: '30 kg', status: 'Accepted', date: '2025-10-07' },
    { id: 3, item: 'Metal Cans', user: 'Mike Johnson', recycler: 'EcoMetal Ltd', quantity: '20 kg', status: 'Completed', date: '2025-10-06' }
  ]);

  const handleDeleteUser = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'user') {
        setUsers(prev => prev.filter(u => u.id !== id));
      } else {
        setRecyclers(prev => prev.filter(r => r.id !== id));
      }
      setMessage({ type: 'success', text: `${type} deleted successfully!` });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Pending': 'badge-pending',
      'Accepted': 'badge-accepted',
      'Completed': 'badge-completed'
    };
    return badges[status] || 'badge-pending';
  };

  return (
    <div className="container my-5">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <FaChartLine /> Admin Dashboard
        </h1>
        <p className="dashboard-subtitle">Welcome, {user?.name}! Monitor and manage the entire system</p>
      </div>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'} alert-custom`}>
          {message.text}
        </div>
      )}

      {/* Overview Stats */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="stats-card">
            <div className="stats-icon"><FaUsers /></div>
            <div className="stats-number">{users.length}</div>
            <div className="stats-label">Total Users</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stats-card">
            <div className="stats-icon"><FaTruck /></div>
            <div className="stats-number">{recyclers.length}</div>
            <div className="stats-label">Total Recyclers</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stats-card">
            <div className="stats-icon"><FaRecycle /></div>
            <div className="stats-number">{transactions.length}</div>
            <div className="stats-label">Total Requests</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stats-card">
            <div className="stats-icon"><FaCheckCircle /></div>
            <div className="stats-number">{transactions.filter(t => t.status === 'Completed').length}</div>
            <div className="stats-label">Completed</div>
          </div>
        </div>
      </div>

      {/* Users Management */}
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <FaUsers /> User Management
        </div>
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td className="fw-bold">{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className="item-category">{u.role}</span></td>
                  <td>{u.joined}</td>
                  <td><span className="badge-completed">{u.status}</span></td>
                  <td>
                    <button
                      className="btn btn-danger-custom btn-sm"
                      onClick={() => handleDeleteUser(u.id, 'user')}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recyclers Management */}
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <FaTruck /> Recycler Management
        </div>
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recyclers.map(r => (
                <tr key={r.id}>
                  <td className="fw-bold">{r.name}</td>
                  <td>{r.email}</td>
                  <td><span className="item-category">{r.role}</span></td>
                  <td>{r.joined}</td>
                  <td><span className="badge-completed">{r.status}</span></td>
                  <td>
                    <button
                      className="btn btn-danger-custom btn-sm"
                      onClick={() => handleDeleteUser(r.id, 'recycler')}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Transactions */}
      <div className="card-custom">
        <div className="card-header-custom">
          <FaRecycle /> All Transactions
        </div>
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Item</th>
                <th>User</th>
                <th>Recycler</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td className="fw-bold">{t.item}</td>
                  <td>{t.user}</td>
                  <td>{t.recycler}</td>
                  <td>{t.quantity}</td>
                  <td><span className={getStatusBadge(t.status)}>{t.status}</span></td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
