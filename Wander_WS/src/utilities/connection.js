const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/WanderLustDb')
mongoose.Promise = global.Promise;
const { Schema } = require("mongoose");


let schema = {
    name: String,
    contactNo: { type: Number, unique: true },
    emailId: String,
    password: String,
    userId:String,
    bookings:[String]
}

let packageSchema=Schema({
    destinationId:String,
    continent:String,
    name:String,
    imageUrl:String,
    details:{
        about:String,
        itinerary:{
            dayWiseDetails:{
                firstDay:String,
                restDaysSightSeeing:[String],
                lastDay:String
            },
            packageInclusions:[String],
            tourHighlights:[String],
            tourPace:[String]
        }
    },
    noOfNights:Number,
    flightCharges:Number,
    chargesPerPerson:Number,
    discount:Number,
    availability:Number
},
{ collection: "Hotdeals" })

let userSchema = mongoose.Schema(schema, { collection: "User" })

let connection = {}
connection.user = () => {
    return mongoose.connect('mongodb://localhost:27017/WanderLustDb', { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
        return res.model('User', userSchema)
    }).catch((err) => {
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })

}

connection.hotdeals = () => {
    return mongoose.connect('mongodb://localhost:27017/WanderLustDb', { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
        return res.model('Hotdeals', packageSchema)
    }).catch((err) => {
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })

}

module.exports = connection