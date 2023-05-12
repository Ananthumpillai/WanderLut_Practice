import React, { useEffect, useState } from "react"
import { Fieldset } from 'primereact/fieldset';
import { Link, Redirect, Router, withRouter } from 'react-router-dom'
import axios from "axios";
import Login from "./login";

const url = "http://localhost:1050/"
export default function BookingComponent(props) {
    // const [searchValue, updateSearchValue] = useState(props.match.params.keyword)
    const [bookForm, updateBookForm] = useState(props.form)

    const [endDate, updateEndDate] = useState(props.date)

    const [totalCost, updateTotalCost] = useState(props.cost)

    const [selectedPackage, updateSelectedPackage] = useState(props.selectedPackage)

    const [formErrorMessages, updateFormErrorMessages] = useState({
        errorMsg: "",
        successMsg: ""
    })

    const [formErrors, updateFormErrors] = useState({
        noOfTravelersError: "",
        dateError: "",
    })
    const [cnfButton, updatecnfButton] = useState(true)
    const [goBack, updateGoBack] = useState(false)
    let handleChange = (e) => {
        let name = e.target.name
        let value
        if (e.target.checked) {
            value = e.target.checked
        }
        else if (e.target.value == 'on') {
            value = false
        }
        else {
            value = e.target.value
        }
        let formCopy = { ...bookForm }
        formCopy[name] = value
        updateBookForm(formCopy)
        validateBookForm(name, value)
    }


    useEffect(() => {
        calculateCharges()
        updateFormErrorMessages({ ...formErrorMessages, successMsg: "", errorMsg: "" })
    }, [bookForm])

    let validateBookForm = (name, value) => {

        let formErrorCopy = { ...formErrors }
        let formValidCopy = cnfButton
        switch (name) {

            case 'noOfTravelers':
                if (!value) {

                    formErrorCopy.noOfTravelersError = "This field can't be empty!"
                    formValidCopy = false

                }
                else if (value < 1 || value > 5) {
                    formErrorCopy.noOfTravelersError = "No. of persons can't be more than 5 and less than 1."
                    formValidCopy = false

                }
                else {
                    formErrorCopy.noOfTravelersError = ""
                    formValidCopy = true

                }
                break
            case 'date':
                let date = new Date(value).setHours(0, 0, 0, 0)
                let today = new Date().setHours(0, 0, 0, 0)
                if (!value) {
                    formErrorCopy.dateError = "This field can't be empty!"
                    formValidCopy = false
                }
                else if (date < today) {
                    formErrorCopy.dateError = "Please select future date!"
                    formValidCopy = false
                }
                else {
                    formErrorCopy.dateError = ""
                    formValidCopy = true
                }
                break

        }
        updateFormErrors(formErrorCopy)
        updatecnfButton(formValidCopy)
    }



    let calculateCharges = () => {
        // console.log(selectedPackage.availability);
        if (selectedPackage.availability == "0") {
            let msg = "Sorry this trip is full!!!..."
            updateFormErrorMessages({ ...formErrorMessages, errorMsg: msg })
        }
        else if (selectedPackage.availability < bookForm.noOfTravelers) {
            let msg = "Sorry we can only accomodate " + selectedPackage.availability + " more Passengers"
            updateFormErrorMessages({ ...formErrorMessages, errorMsg: msg })
        }
        else {
            updateFormErrorMessages({ ...formErrorMessages, errorMsg: "" })
            if (bookForm.includeFlight === true) {
                let bc = selectedPackage.chargesPerPerson * Number(bookForm.noOfTravelers)
                let total_cost = bc + (Number(bookForm.noOfTravelers) * selectedPackage.flightCharges)
                updateTotalCost(total_cost)
            }
            else {
                let bc = selectedPackage.chargesPerPerson * Number(bookForm.noOfTravelers)
                updateTotalCost(bc)
            }

        }
        let startDate = new Date(bookForm.date)
        let onedayMs = 24 * 60 * 60 * 1000
        let timeMs = startDate.getTime() + (selectedPackage.noOfNights * onedayMs);
        let endDate = new Date(timeMs).toDateString()
        updateEndDate(endDate)
    }

    if (goBack) {

        window.location.reload()
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        if (!sessionStorage.getItem('userId')) {
            alert("Please login to continue")
           
        }
        let postData = {
            userId: sessionStorage.getItem('userId'),
            destId: selectedPackage.destinationId,
            destinationName: selectedPackage.name,
            checkInDate: new Date(bookForm.date),
            checkOutDate: new Date(endDate),
            noOfPersons: bookForm.noOfTravelers,
            totalCharges: totalCost
        }
        axios.post(url + 'booking', postData).then((res) => {
            //console.log(res);
            updateFormErrorMessages({ ...formErrorMessages, successMsg: res.data })
        }).catch((err) => {
            updateFormErrorMessages({ ...formErrorMessages, errorMsg: err.response.data.message })
        })
    }
    if (formErrorMessages.successMsg) {
        return <React.Fragment>
            <div className="container bookingSuccess">
                <div className="row">
                    <div >
                        <h3 className="text-success">Booking Confirmed!!!</h3>

                        <h4 className="text-success">Congratulations Trip planned to {selectedPackage.name}</h4>
                        <h4> Trip starts on: {bookForm.date}</h4>
                        <h4> Trip ends on: {endDate}</h4>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
    return <React.Fragment>
        <div className="container">
            <div className="row">
                <div className="col-md-7 mt-5">
                    <Fieldset legend="Overview" className="mb-5" toggleable collapsed={true}>

                        {selectedPackage.details.about}


                    </Fieldset>

                    <Fieldset legend="Package Inclusions" className="mb-5" toggleable collapsed={true}>

                        <ul>
                            {selectedPackage.details.itinerary.packageInclusions.map((data, index) => {

                                return <li key={index}>{data}</li>

                            })}
                        </ul>

                    </Fieldset>

                    <Fieldset legend="Itinerary" className="mb-5" toggleable={true} collapsed={true}>

                        <h4>Day Wise Itinerary</h4>
                        <h6>Day 1</h6>
                        <p>{selectedPackage.details.itinerary.dayWiseDetails.firstDay}</p>
                        {selectedPackage.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((data, index) => {
                            return <React.Fragment key={index}>
                                <h6>Day {index + 2}</h6>
                                <p>{data}</p>
                            </React.Fragment>

                        })}
                        <h6>Day {selectedPackage.details.itinerary.dayWiseDetails.restDaysSightSeeing.length + 2}</h6>
                        <p>{selectedPackage.details.itinerary.dayWiseDetails.lastDay}</p>
                        <span className="text-danger"> **This itinerary is just a suggestion, itinerary can be modified as per requirement.<Link to="contactUs">Contact us</Link> for more details.</span>

                    </Fieldset>


                </div>
                <div className="col-md-5">
                    <form className="bookingForm shadow" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="noOfTravelers">Number of Travelers</label>
                            <input onChange={handleChange} type="number" name="noOfTravelers" className="form-control" value={bookForm.noOfTravelers}></input>
                            <span className="text-danger">{formErrors.noOfTravelersError}</span>

                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="TripStartDate">Trip Start Date</label>

                            <input onChange={handleChange} type="date" name="date" className="form-control" value={bookForm.date}></input>
                            <span className="text-danger">{formErrors.dateError}</span>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="includeFlight">Include Flight</label> &nbsp;
                            <input onChange={handleChange} type="checkbox" name="includeFlight" className="form-check-input" checked={bookForm.includeFlight} ></input>
                        </div>
                        <h5>Your trip ends on {endDate} and you will pay ₹ {totalCost}</h5>
                        <br></br>
                        <button type="submit" className="btn btn-primary" disabled={!cnfButton}>Confirm Booking</button><br /><br />
                        <button type="button" className="btn btn-primary" onClick={() => updateGoBack(true)}>Go Back</button>
                    </form>

                </div>
            </div>
        </div>
    </React.Fragment >
}