const bookingModel=require('../model/booking')

let bookingService = {}



bookingService.book = async (booking) => {
    let result=await bookingModel.book(booking)
    if(result){
        console.log("inside service",result);
        return result
    }
}


module.exports = bookingService