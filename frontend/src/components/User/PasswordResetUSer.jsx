import React, { useState } from 'react'
import '../user.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PasswordResetUSer = () => {
    const [username, setUsername] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [cnfNewPassword, setCnfNewPassword] = useState("")
    const navigate = useNavigate()

    const ResetPass = () => {
        if (newPassword==cnfNewPassword) {
            alert("Password Matched")
        }
        else{
            alert("Confirm Password MissMatched")

        }
    }

    return (
        <div className='UsrPassReset'>
            <h1>Password Reset</h1>
            <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="text" placeholder='Enter new Password' value={newPassword} onChange={(e) => setnewPassword(e.target.value)} />
            <input type="text" placeholder='Confirm new Password' value={cnfNewPassword} onChange={(e) => setCnfNewPassword(e.target.value)} />
            <div className='btns-cont'>
                <button onClick={() => navigate("/userlogin")}>Cancel</button>
                <button onClick={ResetPass}>Reset Password</button>
            </div>
        </div>
    )
}

export default PasswordResetUSer