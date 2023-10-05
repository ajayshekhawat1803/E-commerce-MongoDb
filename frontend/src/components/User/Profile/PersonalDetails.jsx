import React from 'react'

const PersonalDetails = () => {
    return (
        <>
            <h1>Personal Details</h1>
            <h4>Personal Information</h4>
            <div className="details-cont">
                <p>All your personal details are available in this section</p>

                <div className="details">
                    <div className="div">
                        <h3>Name</h3>
                        <input type="text" value={"Ajay Singh Shekhawat"}/>
                    </div>
                    <div className="div">
                        <h3>DOB</h3>
                        <input type="date" value={"2003-03-18"} />
                    </div>
                    <div className="div">
                        <h3>Mobile</h3>
                        <input type="number" value={"8949370123"} />
                    </div>
                    <div className="div">
                        <h3>Email</h3>
                        <input type="email" value={"ajayshekhawat1803@gmail.com"} />
                    </div>
                </div>
            </div>
            <button>Save & Update</button>
        </>
    )
}

export default PersonalDetails;