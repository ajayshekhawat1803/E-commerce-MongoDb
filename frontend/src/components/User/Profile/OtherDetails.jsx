import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const OtherDetails = () => {
    const [userAuth, setuserauth] = useState({})
    const [addline1, setAddline1] = useState("")
    const [city, setCity] = useState("")
    const [tehsil, setTehsil] = useState("")
    const [dist, setDist] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setuserauth(JSON.parse(localStorage.getItem("userData")))
    }, [])
    useEffect(() => {
        setTimeout(() => {
            setAddline1(userAuth.address.addline1)
            setCity(userAuth.address.city)
            setTehsil(userAuth.address.tehsil)
            setDist(userAuth.address.dist)
            setState(userAuth.address.state)
            setPincode(userAuth.address.pincode)
            // console.log(userAuth.address);
        }, 100);
    }, [userAuth])

    const updateAddress = async () => {
        let result = await axios.patch(`http://localhost:4000/user/update/address/${userAuth._id}`, { addline1, city, tehsil, dist, state, pincode })
        result = result.data
        // console.log(result);
        let userUpdateddata = await axios.get(`http://localhost:4000/user/${userAuth._id}`)
        localStorage.setItem("userData", JSON.stringify(userUpdateddata.data));
        setuserauth(JSON.parse(localStorage.getItem("userData")))
        if (result.message == 'Address updated successfully') {
            alert("Address Modified")
            navigate("/profile/")
        }
    }

    return (
        <>
            <h1>Other Details</h1>
            <h4>Address</h4>
            <div className="details-cont">
                <p>Details About Your address is here</p>
                <div className="details">
                    <div className="div">
                        <h3>Address Line 1</h3>
                        <input type="text" value={addline1} onChange={(e) => setAddline1(e.target.value)} />
                    </div>
                    <div className="div">
                        <h3>City</h3>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="div">
                        <h3>Tehsil</h3>
                        <input type="text" value={tehsil} onChange={(e) => setTehsil(e.target.value)} />
                    </div>
                    <div className="div">
                        <h3>District</h3>
                        <input type="text" value={dist} onChange={(e) => setDist(e.target.value)} />
                    </div>
                    <div className="div">
                        <h3>state</h3>
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="div">
                        <h3>Pin Code</h3>
                        <input type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                    </div>
                </div>
            </div>
            <button onClick={updateAddress}>Save & Update</button>
        </>
    )
}

export default OtherDetails
