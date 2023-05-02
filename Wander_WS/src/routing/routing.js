const express = require('express')
const userService = require('../service/service')
const router = express.Router()
const UserRegister = require('../model/beanclass/userregister')
const packageService = require('../service/packageSevice')
const Bookings = require('../model/beanclass/bookings')
const bookingService = require('../service/booking')


router.post('/login', (req, res, next) => {
    let phoneNumber = req.body.phoneNumber
    let password = req.body.password
    userService.login(phoneNumber, password).then((result) => {
        res.send(result)
    }).catch((err) => {
        next(err)
    })

})

router.post('/register', (req, res, next) => {
    let data = new UserRegister(req.body)
    userService.register(data).then((userDetails) => {
        res.send(userDetails)
    }).catch((err) => {
        next(err)
    })

})

router.get('/hotDeals', (req, res, next) => {
    packageService.hotDeals().then((hotDeals) => {
        res.send(hotDeals)
    }).catch((err) => {
        next(err)
    })
})

router.get('/searchPackages/:keyword', (req, res, next) => {
    let keyword = req.params.keyword
    packageService.destination(keyword).then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})

router.post('/booking', (req, res, next) => {
    let booking = new Bookings(req.body)
    bookingService.book(booking).then((bid) => {
        res.send(bid)
    }).catch((err) => {
        next(err)
    })
})


module.exports = router