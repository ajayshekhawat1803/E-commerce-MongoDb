import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AccountSettings = () => {
    const [userAuth, setuserauth] = useState({})
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [pdisable, setpdisable] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        setuserauth(JSON.parse(localStorage.getItem("userData")))
    }, [])
    useEffect(() => {
        setusername(userAuth.username)
        setpassword(userAuth.password)
    }, [userAuth])

    const saveAccountDetails = async () => {
        let result = await axios.patch(`http://localhost:4000/user/update/${userAuth._id}`, { username, password })
        result = result.data

        let userUpdateddata = await axios.get(`http://localhost:4000/user/${userAuth._id}`)
        localStorage.setItem("userData", JSON.stringify(userUpdateddata.data));
        setuserauth(JSON.parse(localStorage.getItem("userData")))

        if (result.modifiedCount) {
            alert("Data Modified")
            navigate("/profile/")
        }
    }
    return (
        <>
            <h1>Account Settings</h1>
            <h4></h4>
            <div className="details-cont">
                <p>Set up your Account here...</p>
                <div className="details">
                    <div className="div">
                        <h3>Username</h3>
                        <input type="text" value={username} onChange={(e) => setusername(e.target.value)} />
                    </div>
                    <div className="div">
                        <h3>Password</h3>
                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} disabled={pdisable} />
                        <Link onClick={()=>setpdisable(false)}>Change Password</Link>
                    </div>
                </div>
            </div>
            <button onClick={saveAccountDetails}>Save & Update</button>
        </>
    )
}

export default AccountSettings
