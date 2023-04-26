import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const url="http://localhost:1050/"
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
        buttonValid: false
    })
    const[message,updateMessage]=useState({
        successMessage:"",
        errorMessage:""
    })

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
    let formSubmit = (e) => {
        e.preventDefault()
        axios.post(url+'login', form).then((res) => {
            updateMessage({...message,successMessage:res.data,errorMessage:""})
        }).catch((err)=>{
            if(err.response){
                updateMessage({...message,errorMessage:err.response.data.message,successMessage:""})
            }
            else{
                updateMessage({...message,errorMessage:err.message,successMessage:""})
            }
        })
    }
    return <React.Fragment>
        <div className="container mt-4">
            <div className='row'>
                <div className='col-md-5 offset-md-1 '>
                    <div className='card '>
                        <h3 className='card-header text-center'>Login</h3>
                        <div className='card-body' >
                            <form className='form' onSubmit={formSubmit}>
                                <div className='form-group'>
                                    <label name="phoneNumber">Phone Number</label>
                                    <input type='number' placeholder='eg :- +9567808039' name='phoneNumber'
                                        onChange={handleChange} className='form-control'
                                    ></input>
                                    <span className='text-danger'>{formError.phoneNumberError}</span>
                                </div>

                                <div className='form-group'>
                                    <label name="password">Password</label>
                                    <input type='password' placeholder='Please enter your password' name='password'
                                        onChange={handleChange} className='form-control'
                                    ></input>
                                    <span className='text-danger'>{formError.passwordError}</span>
                                </div>


                                <br />
                                <button type='submit' disabled={!formValid.buttonValid} className='btn btn-primary'>Submit</button>
                            </form>
                            <span className='text-danger'><b>{message.errorMessage}</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </React.Fragment>
}