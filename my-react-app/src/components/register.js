
import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
const url = "http://localhost:1050/"


export default function Register() {

    // let initial_state = {
    //     form: {
    //         name: "",
    //         emailId: "",
    //         contactNo: "",
    //         password: "",
    //         cnfPassword: ""
    //     },
    //     formError: {
    //         name: "",
    //         emailId: "",
    //         contactNo: "",
    //         password: "",
    //         cnfPassword: ""
    //     },
    //     formValid: {
    //         name: false,
    //         emailId: false,
    //         contactNo: false,
    //         password: false,
    //         cnfPassword: false,
    //         button: false
    //     }
    // }

    // const [state, updateState] = useState(initial_state)

    const [form, updateForm] = useState({
        name: "",
        emailId: "",
        contactNo: "",
        password: "",
        cnfPassword: ""
    })

    const [formError, updateFormError] = useState({
        name: "",
        emailId: "",
        contactNo: "",
        password: "",
        cnfPassword: ""
    })

    const [formValid, updateFormValid] = useState({
        name: false,
        emailId: false,
        contactNo: false,
        password: false,
        cnfPassword: false,
        button: false
    })
    const [messages, updateMessage] = useState({
        successMessage: "",
        errorMessage: ""
    })
    let handleChange = (e) => {

        let name = e.target.name
        let value = e.target.value
        // console.log(name,value);
        let formCopy = { ...form }
        formCopy[name] = value
        updateForm(formCopy)
        validate(name, value)

    }
    let handlePassword = (e) => {

        let value = e.target.value
        let formerror = { ...formError }
        let formvalid = { ...formValid }

        if (value != form.password) {
    
            formerror.cnfPassword = "Password doesn't match"
            formvalid.cnfPassword = false
        }
        else {
      
            formerror.cnfPassword = ""
            formvalid.cnfPassword = true
        }
        formvalid.button = formvalid.name && formvalid.emailId && formvalid.password && formvalid.contactNo && formvalid.cnfPassword
        // console.log(formerror);
        updateFormError(formerror)
        updateFormValid(formvalid)
    }

    let validate = (name, value) => {
        let formerror = { ...formError }
        let formvalid = { ...formValid }

        switch (name) {
            case "name":
                if (value === "") {
                    formerror.name = "Please enter a your name"
                    formvalid.name = false
                }
                else if (!value.match(/^[A-z]+(\s|[A-z])*$/)) {
                    formerror.name = "Please enter a valid name"
                    formvalid.name = false
                }
                else {
                    formerror.name = ""
                    formvalid.name = true
                }
                break
            case "emailId":
                if (value === "") {
                    formerror.emailId = "Please enter  your email Id"
                    formvalid.emailId = false
                }
                else if (!value.match(/^[a-z0-9]+@[a-z]{3,}\.com$/)) {
                    formerror.emailId = "Please enter a valid email Id"
                    formvalid.emailId = false
                }
                else {
                    formerror.emailId = ""
                    formvalid.emailId = true
                }
                break
            case "contactNo":
                if (value === "") {
                    formerror.contactNo = "Please enter a your contact number"
                    formvalid.contactNo = false
                }
                else if (!value.match(/^[1-9]{1}[0-9]{9}$/)) {
                    formerror.contactNo = "Please enter a valid number"
                    formvalid.contactNo = false
                }
                else {
                    formerror.contactNo = ""
                    formvalid.contactNo = true
                }
                break
            case "password":
                if (value === "") {
                    formerror.password = "Please enter  your password"
                    formvalid.password = false
                }
                else if (!((value.match(/[a-z]/) && value.match(/[0-9]/) && value.match(/\W/) && value.match(/[A-Z]/) && value.length >= 7 && value.length <= 20))) {
                    formerror.password = "Please enter a valid password"
                    formvalid.password = false
                }
                else {
                    formerror.password = ""
                    formvalid.password = true
                }
                break
            default:
                break

        }
        updateFormError(formerror)
        updateFormValid(formvalid)
        // updateState({...state,formError: formerror, formValid: formvalid })

    }
    let handleSubmit = (e) => {
        e.preventDefault()
        register()
    }
    let register = () => {
        axios.post(url+"register", form).then((res) => {
            updateMessage({ successMessage: res.data.userId })
        }).catch((err) => {
            updateMessage({ errorMessage: err.response.data.message })
        })
    }
    // console.log(form, formError, formValid);
    if (messages.successMessage) {
        return(
        <div className="container center">
           
            <h1 className="text text-success text-center">User Registered Successfully  {messages.successMessage}</h1><br/>
             <h2 className="text text-link text-center"><Link to="/login">Click here to login</Link> </h2>
            </div>
      
        )
    }
    else
    {
    return (

        
        <section id="registerPage" >
            <div className="col-md-4 offset-6 " >
                <form className="form bg-light shadow p-4 mb-4 bg-white rounded-lg" onSubmit={handleSubmit}>
                    <h1 style={{ fontFamily: 'cursive' }}>Sign Up</h1>
                    <TextField
                        margin="normal" required fullWidth name="name" id="name" label="Name" aria-required
                        type="text"
                        onChange={handleChange}
                    />
                    <span className="text text-danger">{formError.name}</span>
                    <TextField
                        margin="normal" required fullWidth name="emailId" id="emailId" label="Email Id" aria-required
                        type="email"
                        onChange={handleChange}
                    />
                    <span className="text text-danger">{formError.emailId}</span>
                    <TextField
                        margin="normal" required fullWidth name="contactNo" id="contactNo" label="Contact No"
                        aria-required
                        type="number"
                        onChange={handleChange}
                    />
                    <span className="text text-danger">{formError.contactNo}</span>
                    <TextField
                        margin='normal' required fullWidth name="password" id="password" label="Password" aria-required
                        type="password"
                        onChange={handleChange}
                    />
                    <span className="text text-danger">{formError.password}</span>
                    <TextField
                        margin="normal" required fullWidth name="cnfPassword" id="cnfPassword" label="Confirm Password" aria-required
                        type="text"
                        onChange={handlePassword}
                    />
                    {formError.cnfPassword ? <span className="text text-danger">{formError.cnfPassword}</span>
                        : null}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!formValid.button}
                    >
                        Register
                    </Button>
                    {/* {messages.successMessage?<span className='text-success'>User Registered Successfully {messages.successMessage}</span>:null} */}
                <span className='text-danger'>{messages.errorMessage}</span>
                </form>
               
            </div>

        </section>
    )
}
}