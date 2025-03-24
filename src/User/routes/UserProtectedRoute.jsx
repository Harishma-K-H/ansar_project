import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('user_access_token') !== null;
};

function UserProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/" />;
}

export default UserProtectedRoute;
