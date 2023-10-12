import React, { useState, useEffect } from 'react'
import './User.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
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
    if (result.usertologin.name) {
      localStorage.setItem("userData", JSON.stringify(result))
      navigate("/")
    }
    else {
      alert("Please Enter Correct Detils")
    }
    console.log(result.token);
    // if (result.message === "Password Incorrect") {
    //   alert("Enter valid password")
    // }
  }

  return (
    <div className='user'>
      <Outlet />
      <h1>Login</h1>
      <form action="">
        <input type="text" placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
        <Link id='fgtpass' to="Password-reset-User">Forgot Passworrd</Link>
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