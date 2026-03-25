import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const PrivateRoute: React.FC = () => {
  // Check auth state from Zustand
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If not authenticated, redirect to the login page immediately
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child route components (the protected views)
  return <Outlet />;
};

export default PrivateRoute;
