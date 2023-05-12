
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from 'primereact/sidebar';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from "@mui/material";

import CircularProgress from '@mui/material/CircularProgress';
import RenderPackages from "./RenderPackages";

const url = "http://localhost:1050/"
export default function Packages(props) {

    const [searchValue, updateSearchValue] = useState(props.match.params.keyword)
    const [packages, updatepackages] = useState()
    const [messages, updateMessage] = useState({
        successMsg: "",
        errorMsg: ""
    })

    const [spinner, updateSpinner] = useState(false)

    useEffect(() => {
        fetchPackages()
    }, [])


    let fetchPackages = () => {
        updateSpinner(true)
        setTimeout(()=>{
            axios.get(url + "searchPackages/" + searchValue).then((response) => {
                updatepackages(response.data)
                updateSpinner(false)
                // console.log(response.data);
            }).catch((err) => {
                //console.log(err, "err");
                if (err.response) {
                    updateMessage({ ...messages, errorMsg: err.response.data.message })
                }
                else {
                    updateMessage({ ...messages, errorMsg: err.message })
                }
                updateSpinner(false)
    
            })
        },500)
     
    }
    if (spinner) {
        return <div className="spinner">

            <CircularProgress />

        </div>

    }
    else {
        if (packages) {
            return <RenderPackages selectedPackage={packages}></RenderPackages>
        }
        else {
            return <div className="container confirmPage">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h1 className="text-danger p-5">{messages.errorMsg}</h1>
                    </div>
                </div>
            </div>
        }
    }



}