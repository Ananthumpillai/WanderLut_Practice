const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/WanderLustDb')
mongoose.Promise = global.Promise;



let schema = {
    name: String,
    phoneNumber: { type: Number, unique: true },
    emailId: String,
    password: String
}

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

module.exports = connection