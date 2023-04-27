const express = require('express')
const userService = require('../service/service')
const router = express.Router()
const UserRegister = require('../model/beanclass/userregister')
const packageService = require('../service/packageSevice')

router.post('/login', async (req, res, next) => {
    let phoneNumber = req.body.phoneNumber
    let password = req.body.password
    userService.login(phoneNumber, password).then((result) => {
        res.send(result)
    }).catch((err) => {
        next(err)
    })

})

router.post('/register', async (req, res, next) => {
    let data = new UserRegister(req.body)
    userService.register(data).then((userDetails) => {
        res.send(userDetails)
    }).catch((err) => {
        next(err)
    })

})

router.get('/hotDeals', async (req, res, next) => {
    packageService.hotDeals().then((hotDeals) => {
        res.send(hotDeals)
    }).catch((err) => {
        next(err)
    })



})



module.exports = router