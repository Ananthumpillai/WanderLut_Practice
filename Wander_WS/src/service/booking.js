const bookingModel = require('../model/booking')

let bookingService = {}



bookingService.book = async (booking) => {
    let result = await bookingModel.book(booking)
    if (result) {
        console.log("inside service", result);
        return result
    }
}


bookingService.viewBookings = async (userId) => {
    let result = await bookingModel.viewBookings(userId)
    if (result === null) {
        let err = new Error("No Bookings for the user ", userId)
        err.status = 404
        throw err
    }
    else {
        return result
    }
}

bookingService.deleteBooking = async (bid) => {
    let result = await bookingModel.deleteBooking(bid)
    if (result) {
        return result
    }
    else {
        let err = new Error("Unable to delete the booking, Please try again")
        err.status = 404
        throw err
    }
}

module.exports = bookingService