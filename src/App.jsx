import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import RecyclerDashboard from './pages/RecyclerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ItemList from './pages/ItemList';
import PickupRequests from './pages/PickupRequests';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes - User Dashboard */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute allowedRoles={['User']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Recycler Dashboard */}
            <Route
              path="/recycler-dashboard"
              element={
                <ProtectedRoute allowedRoles={['Recycler']}>
                  <RecyclerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Admin Dashboard */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Accessible to all logged-in users */}
            <Route
              path="/items"
              element={
                <ProtectedRoute>
                  <ItemList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/pickup-requests"
              element={
                <ProtectedRoute>
                  <PickupRequests />
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
