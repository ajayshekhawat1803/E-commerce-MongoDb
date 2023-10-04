import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AllProducts.css'
import { useNavigate } from 'react-router-dom'

const AllProducts = () => {
  const [allproducts, setallproducts] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    let response = await axios.get("http://localhost:4000/product/")
    setallproducts(response.data);
  }

  const HandleEdit = (id) => {
    navigate(`/edit/${id}`)
  }
  const HandleDelete = async (id) => {
    let result = await axios.delete(`http://localhost:4000/product/del/${id}`)
    if (result.data.acknowledged) {
      alert(`Product with ID: ${id} has been deleted`)
      navigate("/allProducts")
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
