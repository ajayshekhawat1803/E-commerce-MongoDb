import React from 'react'

const OtherDetails = () => {
    return (
        <>
            <h1>Other Details</h1>
            <h4>Address</h4>
            <div className="details-cont">
                <p>Details About Your address is here</p>
                <div className="details">
                    <div className="div">
                        <h3>Address Line 1</h3>
                        <input type="text" value="Kishor singh ji ka Pana" />
                    </div>
                    <div className="div">
                        <h3>City</h3>
                        <input type="text" value="Gudha Gorji " />
                    </div>
                    <div className="div">
                        <h3>Tehsil</h3>
                        <input type="text" value="Udaipurwati" />
                    </div>
                    <div className="div">
                        <h3>District</h3>
                        <input type="text" value="Jhunjhunu" />
                    </div>
                    <div className="div">
                        <h3>state</h3>
                        <input type="text" value="Rajasthan" />
                    </div>
                    <div className="div">
                        <h3>Pin Code</h3>
                        <input type="number" value="333022" />
                    </div>
                </div>
            </div>
            <button>Save & Update</button>
        </>
    )
}

export default OtherDetails
