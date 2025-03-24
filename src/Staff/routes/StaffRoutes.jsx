import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthStaff from '../pages/AuthStaff'
import StaffLayout from '../components/layout/StaffLayout'
import StaffHome from '../pages/StaffHome'
import StaffProfile from '../pages/StaffProfile'
import StaffProtectedRoute from './StaffProtectedRoute'
import RequestHandle from '../pages/RequestHandle'
import ComplaintHandle from '../pages/ComplaintHandle'

function StaffRoutes() {
  return (
      <Routes>
      <Route path='tech-support-login' element={<AuthStaff />} />
      <Route
        path='tech-support-home'
        element={
          <StaffProtectedRoute element={<StaffLayout><StaffHome /></StaffLayout>}/>
        }
      />
      <Route
        path='tech-support-tasks'
        element={
          <StaffProtectedRoute element={<StaffLayout><ComplaintHandle/></StaffLayout>} />
        }
      />
      <Route
        path='tech-support-request'
        element={
          <StaffProtectedRoute element={<StaffLayout><RequestHandle/></StaffLayout>} />
        }
      />
      <Route
        path='tech-support-profile'
        element={
          <StaffProtectedRoute element={<StaffLayout><StaffProfile /></StaffLayout>} />
        }
      />

    </Routes>
  )
}

export default StaffRoutes