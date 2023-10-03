import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AllProducts.css'
const AllProducts = () => {
  const [allproducts, setallproducts] = useState([])
  let imgpath = "";


  useEffect(() => {
    getProducts();
  }, [])

  console.log(allproducts);
  const getProducts = async () => {
    let response = await axios.get("http://localhost:4000/product/")
    setallproducts(response.data);
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
                  <img src={"http://localhost:4000/" + product.imagepath.split("\\")[0] + "/" + product.imagepath.split("\\")[1]} alt="Not Loaded" />
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
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllProducts
