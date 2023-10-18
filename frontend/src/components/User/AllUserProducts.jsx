import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AllUserProducts.css'
import { useNavigate } from 'react-router-dom'

const AllUserProducts = () => {
    const [allproducts, setallproducts] = useState([])
    const [productstoShow, setproductstoShow] = useState([])
    const [category, setCategory] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getProducts();
    }, [allproducts])

    useEffect(() => {
        FilterProducts()
    }, [category])

    const FilterProducts = () => {
        console.log(category);
        let filteredProducts = allproducts.filter((product) => {
            return product.category == category
        })

        if (category == "All") {
            console.log("alll");
            filteredProducts = allproducts
        }
        console.log(filteredProducts);
        setproductstoShow(filteredProducts)
        // window.location.reload()
        setTimeout(() => {
            console.log(productstoShow);
        }, 2000);
    }


    const getProducts = async () => {
        let response = await axios.get("http://localhost:4000/product/")
        setallproducts(response.data);
        setproductstoShow(allproducts)
    }

    return (
        <div className='allproducts'>
            <h1>All Products</h1>
            <div className='filtersection'>
                <span>Category: </span>
                <select defaultValue="All" onChange={(e) => setCategory(e.target.value)}>
                    <option value="All" >All</option>
                    <option value="Mobile">Mobiles</option>
                    <option value="Laptop">Laptops</option>
                    <option value="camera">Camera</option>
                </select>
            </div>
            <div className='product-cont'>
                {
                    productstoShow.map((product) => {
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
                                    <button className='addtocartbtn'>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllUserProducts