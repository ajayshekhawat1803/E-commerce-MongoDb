import React from 'react'
import { Link } from 'react-router-dom'

const AccountSettings = () => {
    return (
        <>
            <h1>Account Settings</h1>
            <h4></h4>
            <div className="details-cont">
                <p>Set up your Account here...</p>
                <div className="details">
                    <div className="div">
                        <h3>Username</h3>
                        <input type="text" value="ajayshekhawat" />
                    </div>
                    <div className="div">
                        <h3>Password</h3>
                        <input type="password" value="ajayshekhawat" />
                        <Link>Change Password</Link>
                    </div>
                </div>
            </div>
            <button>Save & Update</button>
        </>
    )
}

export default AccountSettings
