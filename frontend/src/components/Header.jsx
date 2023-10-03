import React from 'react'
import './Header-footer.css'
import { Link } from 'react-router-dom'

const Header = () => {
  const adminAuth = localStorage.getItem("adminData")
  const userAuth = localStorage.getItem("userData")
  return (
    <header>
      <Link to="/">Home</Link>
      {
        adminAuth ?
          <>
            <Link to="/allProducts">All Products</Link>
            <Link to="/add-product">Add Product</Link>
            <Link to="/edit">Edit Product</Link>

          </> : ""
      }
      {
        userAuth ?
          <>
            <Link to="/allProducts">All Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
          </> : ""

      }

      {
        userAuth || adminAuth ?
          <Link to="/" onClick={() => { localStorage.clear() }}>Logout</Link>
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
