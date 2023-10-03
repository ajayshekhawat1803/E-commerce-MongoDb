import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminComponents = () => {
    const adminAuth = localStorage.getItem("adminData")
    return adminAuth ? < Outlet /> : <Navigate to="/Adminlogin" />
}

export default AdminComponents
