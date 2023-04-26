const connection = require('../utilities/connection')

let dbModel = {}


dbModel.login = async (phoneNumber, password) => {

    let dbModel = await connection.user()
    let result = await dbModel.findOne({ $and: [{ contactNo: phoneNumber, password: password }] })
    if (result) {
        return true
    }
    else {
        return false
    }

}

module.exports = dbModel