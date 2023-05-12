import React, { useEffect, useState } from "react";
import HotDeals from "./HotDeals";
import { Link, Redirect } from "react-router-dom"


export default function Home() {


    const [searchValue, updadateSearchValue] = useState("")
    const [search, updateSearch] = useState(false)
    // console.log(search);
    let handleClick = () => {
        updateSearch(true)
    }

    if (search) {
        let uri = '/searchPackages/' + searchValue
        return    < Redirect to = { uri } /> 
    }
    return <React.Fragment>



        <header className="masthead " >
            <div className="container d-flex h-100 align-items-center">
                <div className="mx-auto text-center">
                    <h1 className="mx-auto my-0 text-uppercase">Wanderlust</h1>
                    <h2 className="text-white-50 mx-auto mt-2 mb-5">All that is gold does not glitter,
                        Not all those who wander are lost.</h2>
                    <div className="form-inline d-flex">



                        <input type="text" className="form-control-lg flex-fill text-uppercase"
                            placeholder="Where?" onChange={(e) => updadateSearchValue(e.target.value)}
                        ></input> &nbsp;
                        <button className="btn btn-primary btn-lg mx-auto" onClick={handleClick}>Search</button>


                    </div>
                </div>
            </div>
        </header>
        <section className="about-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h2 className="text-white mb-2">Unleash the traveller inside you</h2>
                        <p className="about-paragraph mb-5">When someone makes a travel plan, the first few things they want to sort out, are flights, accommodation, and other amenities for a convenient holiday. To enjoy holidays,
                            you want to have the basics taken care of, especially for family vacations and honeymoon trips. You want your accommodation, return flight bookings, meals of the days,
                            and other traveling formalities sorted beforehand. At <Link to="/home">Wanderlust</Link>,
                            we take care of all the requirements to ensure that you get to enjoy the best of your holiday, exploring and experiencing the destination.</p>

                    </div>
                </div>
            </div>

        </section>
        <HotDeals />
        <section className="footer-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h2 className="text-white">Subscribe to receive updates!</h2>
                        <div className="form-inline d-flex mt-5">
                            <input type="text" className="subscribe-textbox flex-fill" placeholder="ENTER AN EMAIL ADDRESS..."></input> &nbsp; &nbsp;
                            <button className="btn btn-primary">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="about-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="card py-4 bg-white">
                            <div className="card-body">
                                <h4 className="text-uppercase m-0">ADDRESS</h4>
                                <hr className="my-4"></hr>
                                <div className="small text-black-50">Qburst TVM</div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card py-4 bg-white">
                            <div className="card-body">
                                <h4 className="text-uppercase m-0">EMAIL</h4>
                                <hr className="my-4"></hr>
                                <div className="small text-black-50">ananthu998@gmail.com</div>
                            </div>

                        </div>
                    </div>


                    <div className="col-md-4 mb-3">
                        <div className="card py-4 bg-white">
                            <div className="card-body">
                                <h4 className="text-uppercase m-0">PHONE</h4>
                                <hr className="my-4"></hr>
                                <div className="small text-black-50">+91 9567805039</div>
                            </div>

                        </div>
                    </div>



                </div>
            </div>

        </section>


    </React.Fragment>

}