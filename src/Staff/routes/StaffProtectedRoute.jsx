import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () =>
{
    return localStorage.getItem('ts_access_token') !== null;
};

function StaffProtectedRoute({ element })
{
    return isAuthenticated() ? element : <Navigate to="/" />;
}

export default StaffProtectedRoute;
