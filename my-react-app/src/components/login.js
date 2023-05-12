import React, { useState } from 'react'
import Home from '../components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';

import { ProgressSpinner } from 'primereact/progressspinner';

import { TextField, Button } from '@mui/material';
const url = "http://localhost:1050/"
export default function Login() {
    const [form, updateForm] = useState({
        phoneNumber: '',
        password: ''
    })
    const [formError, updateFormError] = useState({
        phoneNumberError: '',
        passwordError: ''
    })
    const [formValid, updateFormValid] = useState({
        phoneNumberValid: false,
        passwordValid: false,
        buttonValid: false,
        login: false
    })
    const [message, updateMessage] = useState({
        successMessage: "",
        errorMessage: ""
    })
    const [register, updateRegister] = useState(false)

    const [spinner, updateSpinner] = useState(false)
    let handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        let formCopy = { ...form }
        formCopy[name] = value
        updateForm(formCopy)
        validateForm(name, value)
    }

    let validateForm = (name, value) => {
        let formErrorCopy = { ...formError }
        let formValidCopy = { ...formValid }
        switch (name) {
            case 'phoneNumber':
                if (!value) {
                    formErrorCopy.phoneNumberError = "field required"
                    formValidCopy.phoneNumberValid = false
                }
                else if (!value.match(/^[1-9]{1}[0-9]{9}$/)) {
                    formErrorCopy.phoneNumberError = "Please enter a valid phone number"
                    formValidCopy.phoneNumberValid = false
                }
                else {
                    formErrorCopy.phoneNumberError = ""
                    formValidCopy.phoneNumberValid = true
                }
                break;
            case 'password':
                if (!value) {
                    formErrorCopy.passwordError = "field required"
                    formValidCopy.passwordValid = false
                }
                else if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/)) {
                    formErrorCopy.passwordError = "Please enter a valid password"
                    formValidCopy.passwordValid = false
                }
                else {
                    formErrorCopy.passwordError = ""
                    formValidCopy.passwordValid = true
                }
                break;

        }
        formValidCopy.buttonValid = formValidCopy.phoneNumberValid && formValidCopy.passwordValid
        updateFormError(formErrorCopy)
        updateFormValid(formValidCopy)
    }
    let loginfun = () => {
        updateSpinner(true)
        setTimeout(() => {

            axios.post(url + 'login', form).then((res) => {
                sessionStorage.setItem("login", true)
                // console.log(res.data.userId);
                sessionStorage.setItem('name', res.data.name)
                sessionStorage.setItem('userId', res.data.userId)
                updateSpinner(false)
                updateMessage({ ...message, successMessage: res.data.userId, errorMessage: "" })
                window.location.reload()


            }).catch((err) => {
                if (err.response) {
                    updateMessage({ ...message, errorMessage: err.response.data.message, successMessage: "" })

                }
                else {
                    updateMessage({ ...message, errorMessage: err.message, successMessage: "" })
                }
                updateSpinner(false)
            })

        }, 500)

    }
    let formSubmit = (e) => {
        e.preventDefault()
        loginfun()
    }

    if (sessionStorage.getItem('login')) {

        return <Redirect to='/home'></Redirect>
    }
    else if (register) {
        return <Redirect to='/register'></Redirect>
    }
    else {


        return <React.Fragment>
            {spinner ?

                <div className='spinner'>
                    <ProgressSpinner />
                </div>
                :
                <div id='loginPage'>
                    <div className='row'>
                        <div className='col-md-3 offset-md-4 '>
                            <div className='card ' >
                                <h3 className='card-header text-center' style={{ fontFamily: 'fantasy' }}>Login</h3>
                                <div className='card-body' >
                                    <form className='form' onSubmit={formSubmit}>
                                        <div className='form-group'>
                                            {/* <label name="phoneNumber">Phone Number</label> */}
                                            {/* <input type='number' placeholder='eg :- +9567808039' name='phoneNumber'
                                            onChange={handleChange} className='form-control'
                                        ></input> */}
                                            <TextField
                                                margin="normal" required fullWidth name="phoneNumber" id="phoneNumber" label="Phone Number"
                                                type="tel"
                                                onChange={handleChange}
                                            />
                                            <span className='text-danger'>{formError.phoneNumberError}</span>
                                        </div>

                                        <div className='form-group'>
                                            {/* <label name="password">Password</label>
                                        <input type='password' placeholder='Please enter your password' name='password'
                                            onChange={handleChange} className='form-control'
                                        ></input> */}

                                            <TextField
                                                margin="normal" required fullWidth name="password" id="password" label="Password"
                                                type="text"
                                                onChange={handleChange}
                                            />

                                            <span className='text-danger'>{formError.passwordError}</span>
                                        </div>


                                        <br />


                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            disabled={!formValid.buttonValid}
                                        >
                                            Submit
                                        </Button>

                                        {/* <button type='submit' disabled={!formValid.buttonValid} className='btn btn-primary'>Submit</button> */}
                                    </form>
                                    <br />
                                    {/* <button className='btn btn-warning btn-block' onClick={() => updateRegister(true)}>Register</button> */}<Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="warning"
                                        onClick={() => updateRegister(true)}
                                    >
                                        Register
                                    </Button>


                                    <span className='text-danger mt-3'><b>{message.errorMessage}</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </React.Fragment>
    }
}