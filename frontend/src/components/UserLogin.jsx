import React, { useState, useEffect } from 'react'
import './User.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")

  useEffect(() => {
    const userAuth = localStorage.getItem("userData");
    if (userAuth) {
      navigate("/")
    }
  }, [])

  const loginHandle = async () => {
    let result = await axios.post("http://localhost:4000/user/login", {
      username: Username,
      password: Password
    })
    result = result.data
    if (result.name) {
      localStorage.setItem("userData", JSON.stringify(result))
      navigate("/")
    }
    else {
      alert("Please Enter Correct Detils")
    }
  }

  return (
    <div className='user'>
      <h1>Login</h1>
      <form action="">
        <input type="text" placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
        <div className='login-signup-btn-cont'>
          <button className='signupBtn' onClick={() => navigate("/userSignUp")}>Sign Up</button>
          <button type='submit' className='loginBtn' onClick={(e) => {
            e.preventDefault()
            loginHandle()
          }}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default UserLogin