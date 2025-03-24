import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from '../pages/Auth'
import UserLayout from '../layout/UserLayout'
import Home from '../pages/Home'
import UserProfile from '../pages/UserProfile'
import UserProtectedRoute from './UserProtectedRoute'
import ComplaintForm from '../pages/ComplaintForm'
import RequestForm from '../pages/RequestForm'
import AllRequests from '../pages/AllRequests'
import AllComplaints from '../pages/AllComplaints'

function UserRoutes()
{

  const navigate = useNavigate();

  useEffect(() =>
  {
    const handleBackButton = () =>
    {
      if (window.location.pathname !== "/user/user-profile")
      {
        navigate("/user/user-home");
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () =>
    {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);


  return (
    <Routes>
      <Route path='user-login' element={<Auth />} />
      <Route
        path='user-home'
        element={
          <UserProtectedRoute element={<UserLayout> <Home /> </UserLayout>} />
        }
      />
      <Route
        path='user-requests'
        element={
          <UserProtectedRoute element={<UserLayout> <RequestForm/> </UserLayout>} />
        }
      />
      <Route
        path='user-complaints'
        element={
          <UserProtectedRoute element={<UserLayout> <ComplaintForm/> </UserLayout>} />
        }
      />
      <Route
        path='user-all-requests'
        element={
          <UserProtectedRoute element={<UserLayout> <AllRequests/> </UserLayout>} />
        }
      />
      <Route
        path='user-all-complaints'
        element={
          <UserProtectedRoute element={<UserLayout> <AllComplaints/> </UserLayout>} />
        }
      />
      <Route
        path='user-profile'
        element={
          <UserProtectedRoute element={<UserLayout> <UserProfile /> </UserLayout>} />
        }
      />
    </Routes>
  )
}

export default UserRoutes