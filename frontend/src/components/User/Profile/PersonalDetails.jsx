import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PersonalDetails = () => {
    const [userAuth, setuserauth] = useState({})
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [mobile, setmobile] = useState()
    const [dob, setdob] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
        setuserauth(JSON.parse(localStorage.getItem("userData")).usertologin)
    }, [])
    useEffect(() => {
        setname(userAuth.name)
        setemail(userAuth.email)
        setdob(userAuth.dob)
        setmobile(userAuth.mobile)
        // console.log(JSON.parse(localStorage.getItem("userData")).usertologin);
    }, [userAuth])

    const savePersonalDetails = async () => {
        let result = await axios.patch(`http://localhost:4000/user/update/${userAuth._id}`, { name, email, mobile, dob })
        result = result.data

        let userUpdateddata = await axios.get(`http://localhost:4000/user/${userAuth._id}`)
        localStorage.setItem("userData", JSON.stringify(userUpdateddata.data));
        setuserauth(JSON.parse(localStorage.getItem("userData")))

        if (result.modifiedCount) {
            alert("Data Modified")
            navigate("/profile/")
        }
    }

    return (
        <>
            <h1>Personal Details</h1>
            <h4>Personal Information</h4>
            <div className="details-cont">
                <p>All your personal details are available in this section</p>

                <div className="details">
                    <div className="div">
                        <h3>Name</h3>
                        <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="div">
                        <h3>DOB</h3>
                        <input type="date" value={dob} onChange={(e) => setdob(e.target.value)} />
                    </div>
                    <div className="div">
                        <h3>Mobile</h3>
                        <input type="number" value={mobile} onChange={(e) => setmobile(Number(e.target.value))} />
                    </div>
                    <div className="div">
                        <h3>Email</h3>
                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                </div>
            </div>
            <button onClick={savePersonalDetails}>Save & Update</button>
        </>
    )
}

export default PersonalDetails;