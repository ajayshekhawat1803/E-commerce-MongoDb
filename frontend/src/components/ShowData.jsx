import React, { useEffect, useState } from 'react'
import axios from "axios"
import './ShowData.css'
const ShowData = () => {
    const [allproducts, setallproducts] = useState([])

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let response = await axios.get("http://localhost:4000/product/")
        setallproducts(response.data);
    }

    return (
        <div className='all-products'>
            <h1>All Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>Sr.NO</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allproducts.length > 0 ?
                            (
                                allproducts.map((product,index)=>{
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.company}</td>
                                        </tr>
                                    )
                                })
                            ) :
                            <h1> NO Products Available</h1>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShowData
