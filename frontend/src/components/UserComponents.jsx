import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserComponents = () => {
    const userAuth = localStorage.getItem("userData")
    return userAuth ? < Outlet /> : <Navigate to="/userLogin" />
}

export default UserComponents

