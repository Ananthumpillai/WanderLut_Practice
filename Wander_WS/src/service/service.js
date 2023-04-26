
const dbModel = require('../model/model')

let userService = {}

userService.login = async (phoneNumber, password) => {
    let result = await dbModel.login(Number(phoneNumber), password)
    if (result) {
        return result
    }
    else {
        let err = new Error("Phone Number and Password doesn't match")
        err.status = 400
        throw err
    }
}


module.exports = userService