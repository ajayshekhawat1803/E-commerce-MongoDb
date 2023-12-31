import React, { useState, useEffect } from 'react'
import './AddProduct.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [name, setname] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("")
  const [company, setcompany] = useState("")
  const [image, setimage] = useState("")
  const [token, settoken] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const adminauth = localStorage.getItem("adminData");
    if (!adminauth) {
      navigate("/")
    }
    settoken(JSON.parse(adminauth).token)
  }, [])

  // console.log(token);

  const AddProduct = async () => {
    let result = await axios.post("http://localhost:4000/product/add", { name, price, category, company, image },
      {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
    result = result.data
    if (result.name) {
      alert("Product has been added")
      navigate("/allProducts")
    }
    if (result.message=="Token is invalid") {
      alert("Session Expired !!! \nPlease Login Again....")
      localStorage.clear()
      navigate("/adminlogin")
    }

  }


  return (
    <div className='add-product'>
      <h1>Add Product to Database</h1>
      <form action="" encType='multipart/form-data'>
        <input type="text" placeholder='Product Name' value={name} onChange={(e) => setname(e.target.value)} />
        <input type="text" placeholder='Price of product' value={price} onChange={(e) => setprice(e.target.value)} />
        <input type="text" placeholder='Category' value={category} onChange={(e) => setcategory(e.target.value)} />
        <input type="text" placeholder='Company' value={company} onChange={(e) => setcompany(e.target.value)} />
        <input type="file" onChange={(e) => setimage(e.target.files[0])} />
        <button id='addProductBtn' onClick={(e) => { e.preventDefault(); AddProduct() }}>Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
