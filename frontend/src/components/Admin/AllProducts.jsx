import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AllProducts.css'
import { useNavigate } from 'react-router-dom'

const AllProducts = () => {
  const [allproducts, setallproducts] = useState([])
  const [token, settoken] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const adminauth = localStorage.getItem("adminData");
    if (!adminauth) {
      navigate("/")
    }
    getProducts();
    settoken(JSON.parse(adminauth).token)
  }, [])

  const getProducts = async () => {
    let response = await axios.get("http://localhost:4000/product/")
    setallproducts(response.data);
  }

  const HandleEdit = async(id) => {
    let AuthorizationResult = await axios.get(`http://localhost:4000/product/${token}`)
    if (AuthorizationResult.status==200) {
      navigate(`/edit/${id}`)
    }
    else{
      alert("Session Expired \nPlease Login Again...!!!")
      localStorage.clear()
      navigate("/adminlogin")
    }
  }
  const HandleDelete = async (id) => {
    let result = await axios.delete(`http://localhost:4000/product/del/${id}`,
      {
        headers: {
          'Authorization': `${token}`
        },
      })
    console.log(result.data);
    if (result.data.acknowledged) {
      alert(`Product with ID: ${id} has been deleted`)
      navigate("/allProducts")
      window.location.reload()
    }
    if (result.data.message=="Token is invalid") {
      alert("Session Expired !!! \nPlease Login Again....")
      localStorage.clear()
      navigate("/adminlogin")
    }
  }
  return (
    <div className='allproducts'>
      <h1>All Products</h1>
      <div className='product-cont'>
        {
          allproducts.map((product) => {
            return (
              <div className='product' key={product._id}>
                <div className="img-cont">
                  <img src={`http://localhost:4000/uploads/products/${product.image.filename}`} alt="Not Loaded" />
                </div>
                <div className='items'>
                  <h2 className='label'>Product:</h2>
                  <h2>{product.name}</h2>
                </div>
                <div className="items">
                  <h3 className='label'>Price:</h3>
                  <h4>{product.price}</h4>
                </div>
                <div className="items">
                  <h3 className='label'>Category:</h3>
                  <h4>{product.category}</h4>
                </div>
                <div className="items">
                  <h3 className='label'>Company:</h3>
                  <h4>{product.company}</h4>
                </div>
                <div className="actions">
                  <button className="edit btns" onClick={() => HandleEdit(product._id)}>Edit</button>
                  <button className="delete btns" onClick={() => HandleDelete(product._id)}>Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllProducts
