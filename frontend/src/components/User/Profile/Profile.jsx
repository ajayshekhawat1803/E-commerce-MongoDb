import React from 'react'
import './Profile.css'
import { Link, Outlet } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='profile'>
      <div className="left-panel">
        <h1>My Account</h1>
        <div className="profile-nav">
          <Link to={""}>Personal Details</Link>
          <Link to={"address"}>Other Details</Link>
          <Link to={"orders"}>My Orders</Link>
          <Link to={"setting"}>Account Settings</Link>
        </div>
      </div>
      <div className="right-panel">
          <Outlet/>
      </div>
    </div>
  )
}

export default Profile
