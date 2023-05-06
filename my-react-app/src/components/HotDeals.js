import React, { useEffect, useState } from "react";
import axios from 'axios'
import { TextField, Button, Link as Links } from '@mui/material';
import BookingComponent from "./BookingComponent";
import { Redirect, Link } from 'react-router-dom';

// import "primereact/resources/primereact.min.css";
import { TabView, TabPanel } from 'primereact/tabview';
// import "primereact/resources/themes/rhea/theme.css"

import 'primeicons/primeicons.css';
import RenderPackages from "./RenderPackages";

import { Sidebar } from 'primereact/sidebar';



const url = "http://localhost:1050/"
// const img="my-react-app\public\"

export default function HotDeals(props) {


    const [data, updateData] = useState()
    const [messages, updateMessage] = useState({
        successMessage: "",
        errorMessage: ""
    })

    // const [index, updateIndex] = useState(0)
    // const [sidebar, updateSidebar] = useState(false)
    // const [selectedPackage, updateSelectedPackage] = useState()
    // const [bookForm, updateBookForm] = useState({
    //     noOfTravelers: "1",
    //     date: "",
    //     includeFlight: false,
    // })
    // const [formErrors, updateFormErrors] = useState({
    //     noOfTravelersError: "",
    //     dateError: "",
    // })

    // const [formValid, updateFormValid] = useState({
    //     noOfTravelersValid: false,
    //     dateValid: false,
    //     button: false
    // })
    // const [formErrorMessages, updateFormErrorMessages] = useState({
    //     successMsg: "",
    //     errorMsg: ""
    // })
    // const [totalCost, updateTotalCost] = useState("")
    // const [endDate, updateEndDate] = useState("")
    // const [bookPage, udpateBookPage] = useState(false)


    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        axios.get(url + 'hotDeals').then((res) => {
            updateData(res.data)
            updateMessage({ ...messages, errorMessage: "" })
        }).catch((err) => {
            console.log("err",err.message);
            updateData()
            if(err.response){
                updateMessage({ ...messages, errorMessage: err.response.data.message })
            }
            else{
                updateMessage({ ...messages, errorMessage: err.message })
            }
            
        })
    }
    
    if (data) {
   
        return <RenderPackages selectedPackage={data}> </RenderPackages>
    }
    else if (messages.errorMessage) {
      
        return <div className="container">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <h1 className="text-danger p-5">{messages.errorMessage}</h1>
                </div>
            </div>
        </div>
    }


    
  
}

