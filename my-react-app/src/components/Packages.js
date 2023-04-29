
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'

const url = "http://localhost:1050/"


export default function Packages(props) {

    const [searchValue, updateSearchValue] = useState(props.match.params.keyword)
    const [packages, updatepackages] = useState()
    const [messages, updateMessage] = useState({
        successMsg: "",
        errorMsg: ""
    })


    useEffect(() => {
        fetchPackages()
    }, [])


    let fetchPackages = () => {
        axios.get(url + "searchPackages/" + searchValue).then((response) => {
            updatepackages(response.data)
        }).catch((err) => {
            updateMessage({ ...messages, errorMsg: err.response.data.message })
        })
    }
    console.log(packages);

    return (
        <React.Fragment>

            {packages ? packages.map((singlePackage, index) => {
                return <div className="card m-5" key={index}>
                    <div className="card-body p-5">
                        <div className="row ">
                            <div className="col-md-4 ">

                                <img className="package-image img-fluid" src={process.env.PUBLIC_URL + singlePackage.imageUrl} alt="image"></img>
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
                                    {/* <Button

                                     fullWidth
                                     variant="contained"
                                     color="primary"
                                    //  onClick={() => viewPackage(singlePackage)}
                                 >
                                     View Details

            //  </Button> */}

                                </div>
                                {/* <div><button className="btn btn-primary book" onClick={() => this.getItinerary(singlePackage)}>View Details</button></div><br /> */}
                                {/* <div><br/><button className="btn btn-primary book" onClick={() => this.openBooking(singlePackage)}>Book </button>  </div> */}
                                <div><br />
                                    {/* <Button

                                     fullWidth
                                     variant="contained"
                                     color="primary"
                                    //  onClick={() => book(singlePackage)}
                                 >
                                     Book
                                 </Button> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }) :
                <div className="container text-center">
                    <div className="row p-5 ">
                        <div className="col-md-8 mx-auto h-100">
                        <span className="text-danger fw-bold ">{messages.errorMsg}</span>
                        </div>
                    </div>
                   
                </div>

            }
        </React.Fragment>
    )

}