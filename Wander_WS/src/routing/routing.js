const express = require('express')
const userService = require('../service/service')
const router = express.Router()


router.post('/login', async (req, res, next) => {
    let phoneNumber = req.body.phoneNumber
    let password = req.body.password
    userService.login(phoneNumber,password).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        next(err)
    })
   
})


module.exports = router