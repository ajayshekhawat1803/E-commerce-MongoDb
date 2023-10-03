import React, { useEffect, useState } from 'react'
import './Admin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminSignup = () => {
    const navigate = useNavigate();
    const [AdminUsername, setAdminUsername] = useState("")
    const [AdminPassword, setAdminPassword] = useState("")
    const [AdminName, setAdminName] = useState("")
    const [AdminEmail, setAdminEmail] = useState("")

useEffect(()=>{
    const adminAuth =localStorage.getItem("adminData")
    if (adminAuth) {
        navigate("/")
    }
})

    const RegisterUser = async () => {
        let admindetails={
            name:AdminName,
            email:AdminEmail,
            username:AdminUsername,
            password:AdminPassword
        }
        let result =await axios.post("http://localhost:4000/admin/register", admindetails)
        result=result.data
        if (result.name) {
            alert("New Admin Registered")
            navigate("/adminlogin")
        }
    }
    return (
        <div className='admin'>
            <h1>Admin Sign Up</h1>
            <form action="" >
                <input type="text" placeholder='Name' value={AdminName} onChange={(e) => setAdminName(e.target.value)} />
                <input type="email" placeholder='Email' value={AdminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                <input type="text" placeholder='Username' value={AdminUsername} onChange={(e) => setAdminUsername(e.target.value)} />
                <input type="password" placeholder='Password' value={AdminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                <div className='login-signup-btn-cont'>
                    <button className='signupBtn' 
                    onClick={(e)=>{
                        e.preventDefault()
                        RegisterUser()
                    }}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default AdminSignup
