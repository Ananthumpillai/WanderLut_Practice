import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const url = "http://localhost:1050/"


export default function ViewBookings() {


    const [userId, updateUserId] = useState(sessionStorage.getItem('userId'))
    const [bookings, updateBookings] = useState(null)
    const [messages, updateMessages] = useState({
        successMsg: "",
        errorMsg: ""
    })
    //console.log(userId);
    {/* {bookingId:"B1002",userId:"U1001",destId:"D1002",destinationName:"Romantic Europe: Paris, Venice & 
Vienna",checkInDate:"2019-1-10",checkOutDate:"2019-1-24",noOfPersons:1 ,totalCharges:4549,timeStamp:new Date().getTime().toString()}, */ }

    let getBookings = () => {
        axios.get(url + 'viewBookings/' + userId).then((res) => {

            updateBookings(res.data)
            updateMessages({ ...messages, errorMsg: "" })
        }).catch((err) => {
            updateBookings(null)
           
            // updateMessages({ ...messages, errorMsg: err.response.data.message })
            if (err.response) {
                updateMessages({ ...messages, errorMsg: err.response.data.message })
            }
            else {
                updateMessages({ ...messages, errorMsg: err.message })
            }

        })
    }
    console.log(messages);
    useEffect(() => {
        if (userId) {
            getBookings()
        }
    }, [])

    let deleteBooking = (bId) => {
        axios.delete(url + 'deleteBooking/' + bId).then((res) => {
            updateMessages({ ...messages, successMsg: res.message, errorMsg: "" })
            getBookings()
        }).catch((err) => {
        
            if (err.response) {
                updateMessages({ ...messages, errorMsg: err.response.data.message })
            }
            else {
                updateMessages({ ...messages, errorMsg: err.message })
            }
        })
    }
   
    let refundFun = (e, bId) => {

        e.preventDefault()
        deleteBooking(bId)
    }


    let displayBookings = () => {


        if (bookings) {
            return bookings.map((data, index) => {
                return < div className="col-md-10 mx-auto p-3 m-3" >

                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title text-success">Booking Id : {data.bookingId}</h4>
                        </div>
                        <div className="card-body">
                            <div className="row ">
                                <div className="col-md-5 offset-md-1">

                                    <h5>Trip Starts On: {new Date(data.checkInDate).toDateString()}</h5>
                                    <h5>Trip Ends On: {new Date(data.checkOutDate).toDateString()}</h5>
                                    <h5>Travelers : {data.noOfPersons}</h5>
                                </div>
                                <div className="col-md-3 offset-md-3">
                                    <h5>Price: {data.totalCharges}</h5>

                                    <button type="button" className="btn btn-link text-danger" onClick={(e) => refundFun(e, data.bookingId)}>Claim Refund</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            })
        }
    }


    if (!userId) {
        return <div className="container">
            <div className="row text-center">
                <div className="col-md-9 m-5">
                    <h2>Please login to view your bookings</h2>
                    <h3><Link to={'/login'}>Click here to Login</Link></h3>
                </div>
            </div>
        </div>
    }
    else {
        return <div className="container mt-5 mb-5">
            <div className="row ">
             
                  
                 
                {displayBookings()}
                <h2 className="text-danger text-center">{messages.errorMsg}</h2>

            </div>
        </div>
    }

}