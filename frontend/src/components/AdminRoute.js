// src/components/AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const AdminRoute = () => {
  const { user } = useAuth();

  // If user is logged in and their role is 'admin', allow access. Otherwise, redirect to home.
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;