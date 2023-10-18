import React from 'react'
import './Header-footer.css'
import { Link, json } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const adminAuth = localStorage.getItem("adminData")
  const userAuth = localStorage.getItem("userData")
  const navigate = useNavigate()
  
  // console.log(JSON.parse(adminAuth).token);
  return (
    <header>
      <Link to="/">Home</Link>
      {
        adminAuth ?
          <>
            <Link to="/allProducts">All Products</Link>
            <Link to="/add-product">Add Product</Link>
            {/* <Link to="/edit">Edit Product</Link> */}

          </> : ""
      }
      {
        userAuth ?
          <>
            <Link to="/allUserProducts">All Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
          </> : ""

      }

      {
        // {(JSON.parse(adminAuth).name) || (JSON.parse(userAuth).name)}
        userAuth || adminAuth ?
          <Link to="/" onClick={() => { localStorage.clear(); navigate("/") }}>Logout <span id='loggername'>&#40; {adminAuth ? JSON.parse(adminAuth).admintologin.name : ""}{userAuth ? JSON.parse(userAuth).usertologin.name : ""} &#41;</span> </Link>
          :
          <>
            <Link to="/userLogin">Login</Link>
            <Link to="/adminlogin" >Admin Login</Link>
          </>
      }

    </header>
  )
}

export default Header
