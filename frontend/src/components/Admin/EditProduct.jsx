import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import './EditProduct.css'


const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [image, setImage] = useState(null);
    const [updatedimage, setupdatedImage] = useState(null);
    const [err, seterr] = useState(false);
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        getProductDetails()
    }, [])

    const getProductDetails = async () => {
        let result = await axios.get(`http://localhost:4000/product/edit/${params.id}`)
        result = result.data
        // console.log(result);
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
        setImage(result.image)
    }
    // console.log(image);
    const update = async () => {
        if (updatedimage) {
            let result = await axios.put(`http://localhost:4000/product/update/${params.id}`, {
                name: name,
                price: price,
                category: category,
                company: company,
                image: updatedimage
            }, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            console.log(result);
        }
        if (!updatedimage) {
            const UpdatedData = { name, price, category, company, image }
            let result = await axios.put(`http://localhost:4000/product/update/${params.id}`, UpdatedData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            console.log(result);
        }
        alert("Product has been Updated")
        navigate("/allProducts")
    }
    return (
        <div className='edit-products'>
            <h1>Update Product</h1>

            <input type="text" placeholder='Name of Product' value={name} onChange={(e) => setName(e.target.value)} />

            <input type="text" placeholder='Price of Product' value={price} onChange={(e) => setPrice(e.target.value)} />

            <input type="text" placeholder='Category of Product' value={category} onChange={(e) => setCategory(e.target.value)} />

            <input type="text" placeholder='Company of product' value={company} onChange={(e) => setCompany(e.target.value)} />

            <input type="file" onChange={(e) => {
                setupdatedImage(e.target.files[0])
            }} />

            {/* <input type="hidden" value={image}/> */}

            <button onClick={(e) => { e.preventDefault(); update() }}>Update</button>
        </div>
    )
}
export default EditProduct

