import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import womensimg from '../assets/women.webp'
import mensimg from '../assets/mens.webp'
import accessoriesimg from '../assets/accessories.webp'


const Home = () => {
  const adminAuth = localStorage.getItem("adminData")
  const userAuth = localStorage.getItem("userData")
  const navigate = useNavigate()
  return (
    <div className="home">
      <div className="hero-section">
        <span>Limited Time: Offer Only</span>
        <h1>FINAL CLEARANCE</h1>
        <h3>Take 20% Off &nbsp;'Sale-Must_Have'</h3>
        <button
          onClick={() => {
            adminAuth ?
              navigate("/allProducts")
              : userAuth ?
                navigate("/allUserProducts") :
                alert("You have to login First")
          }}>Shop Now</button>
      </div>
      <div className="cont-2-home">
        <div className="box" id="box1">
          <img src={womensimg} alt="Image not Loaded" />
          <h3>Women's</h3>
        </div>
        <div className="box" id="box2">
          <img src={mensimg} alt="Image not Loaded" />
          <h3>Men's</h3>
        </div>
        <div className="box" id="box3">
          <img src={accessoriesimg} alt="Image not Loaded" />
          <h3>Accessories</h3>
        </div>
      </div>
    </div>
  )
}

export default Home
