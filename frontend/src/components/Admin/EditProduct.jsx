import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios';
import './EditProduct.css'


const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [err, seterr] = useState(false);
    const navigate = useNavigate()
    const params= useParams()

    useEffect(()=>{
        getProductDetails()
    },[])
    
    const getProductDetails=async()=>{
        let result = await axios.get(`http://localhost:4000/product/edit/${params.id}`)
        result=result.data
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const update = async () => {
        let result = await axios.put(`http://localhost:4000/product/update/${params.id}`,{name,price,category,company})
        console.log(result);
        navigate("/allProducts")
    }
    return (
        <div className='edit-products'>
            <h1>Update Product</h1>

            <input type="text" placeholder='Name of Product' value={name} onChange={(e) => setName(e.target.value)} />

            <input type="text" placeholder='Price of Product' value={price} onChange={(e) => setPrice(e.target.value)} />

            <input type="text" placeholder='Category of Product' value={category} onChange={(e) => setCategory(e.target.value)} />

            <input type="text" placeholder='Company of product' value={company} onChange={(e) => setCompany(e.target.value)} />

            <button onClick={(e)=>{e.preventDefault();update()}}>Update</button>
        </div>
    )
}
export default EditProduct

