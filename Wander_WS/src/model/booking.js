const connection = require('../utilities/connection')

let dbModel = {}

dbModel.generateId = async () => {
    let bookingModel = await connection.bookings()
    let ids = await bookingModel.distinct('bookingId')
    let newId = ids[ids.length - 1]
    let id = Number(newId.slice(1)) + 1
    return "B" + id

}
dbModel.book = async (booking) => {
    // console.log("booking",booking.destId);
    let bookingModel = await connection.bookings()
    let userModel = await connection.user()

    let destinationModel = await connection.destinations()
    let hotDealModel = await connection.hotdeals()
    let result = await destinationModel.findOne({ destinationId: booking.destId }, { _id: 0 })
    if (result) {
        if (result.availability < Number(booking.noOfPersons)) {
            let err = new Error("Booking failed due to less availability")
            err.status = 400
            throw err
        }
        else {
            let bid = await dbModel.generateId()
            booking.bookingId = bid
            // console.log(booking.userId);
            let updateResult = await bookingModel.create(booking)
            if (updateResult) {
                let updateUser = await userModel.updateOne({ userId: booking.userId }, { $push: { bookings: bid } })

                if (updateUser.nModified > 0) {
                    let updatedest = await destinationModel.updateOne({ destinationId: booking.destId }, { $inc: { availability: Number(-booking.noOfPersons) } })

                    if (updatedest.nModified > 0) {
                        return bid
                    }
                }
            }
            else {
                let err = new Error("Something went wrong,booking not added")
                err.status = 404
                throw err
            }

        }
    }
    else {
        let hotdealResult = await hotDealModel.findOne({ destinationId: booking.destId }, { _id: 0 })
        if (hotdealResult) {
            if (hotdealResult.availability < Number(booking.noOfPersons)) {
                let err = new Error("Booking failed due to less availability")
                err.status = 400
                throw err
            }
            else {
                let bid = await dbModel.generateId()
                booking.bookingId = bid
                // console.log(booking.userId);
                let updateResult = await bookingModel.create(booking)
                if (updateResult) {
                    let updateUser = await userModel.updateOne({ userId: booking.userId }, { $push: { bookings: bid } })

                    if (updateUser.nModified > 0) {
                        let updatedest = await hotDealModel.updateOne({ destinationId: booking.destId }, { $inc: { availability: Number(-booking.noOfPersons) } })
                   
                        if (updatedest.nModified > 0) {
                         
                            return bid
                        }
                    }
                }
                else {
                    let err = new Error("Something went wrong,booking not added")
                    err.status = 404
                    throw err
                }

            }
        }
    }
}


module.exports = dbModel

