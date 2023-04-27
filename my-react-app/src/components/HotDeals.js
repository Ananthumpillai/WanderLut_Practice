import React, { useEffect, useState } from "react";
import axios from 'axios'
import { TextField, Button } from '@mui/material';




const url = "http://localhost:1050/"
// const img="my-react-app\public\"

export default function HotDeals() {


    const [data, updateData] = useState([])
    const [messages, updateMessage] = useState({
        successMessage: "",
        errorMessage: ""
    })

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        axios.get(url + 'hotDeals').then((res) => {
            updateData(res.data)
            updateMessage({ ...messages, errorMessage: "" })
        }).catch((err) => {
            updateData([])
            updateMessage({ ...messages, errorMessage: err.response.data.message })
        })
    }
    console.log(data);
    return (
        <div className="container-fluid">

            {data.map((singlePackage, index) => {


                return <div className="card m-5">
                    <div className="card-body p-5">
                        <div className="row ">
                            <div className="col-md-4">

                                <img className="package-image" src={process.env.PUBLIC_URL +singlePackage.imageUrl} alt="image"></img>
                            </div>
                            <div className="col-md-5">


                                <div className="featured-text text-lg-left">
                                <h4>{singlePackage.name}</h4>
                                <div className="badge bg-info">{singlePackage.noOfNights}<em> Nights</em></div>
                                {singlePackage.discount ? <div className="discount text-danger">{singlePackage.discount}% Instant Discount</div> : null}
                                <p className="text-dark mb-0">{singlePackage.details.about}</p>
                                </div>
                                <br />
                            </div>
                            <div className="col-md-3">
                            <h4>Prices Starting From:</h4>
                            <div className="text-center text-success"><h6>₹ {singlePackage.chargesPerPerson}</h6></div><br /><br />
                           <div>
                             <Button
                                               
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                              
                                            >
                                               View Details
                                           </Button></div> 
                            {/* <div><button className="btn btn-primary book" onClick={() => this.getItinerary(singlePackage)}>View Details</button></div><br /> */}
                            {/* <div><br/><button className="btn btn-primary book" onClick={() => this.openBooking(singlePackage)}>Book </button>  </div> */}
                           <div><br/>
                            <Button
                                               
                                               fullWidth
                                               variant="contained"
                                               color="primary"
                                             
                                           >
                                            Book
                                          </Button> 
                                          </div>

                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

