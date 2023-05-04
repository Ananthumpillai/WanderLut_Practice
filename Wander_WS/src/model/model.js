const connection = require('../utilities/connection')

let dbModel = {}


dbModel.login = async (phoneNumber, password) => {

    let dbModel = await connection.user()
    let result = await dbModel.findOne({ $and: [{ contactNo: phoneNumber, password: password }] },{_id:0})
    if (result) {
        return result
    }
    else {
        return false
    }

}

let generateId = async () => {
    let model = await connection.user()
    let ids = await model.distinct('userId')
    let a = ids[ids.length - 1]
    let id = Number(a.slice(1)) + 1
    return "U" + id
}
dbModel.register = async (data) => {
    let dbModel = await connection.user()

    let contactNo = data.contactNo
    let result = await dbModel.find({ contactNo: contactNo })
    //console.log( result);
    if (result.length === 0) {
        let id = await generateId()
        data.userId = id
        let userDetails = await dbModel.create(data)
        if (userDetails) {
            return userDetails
        }
        else {
            return null
        }
    }
    else {
        let err = new Error("Contact No already exists")
        err.status = 404
        throw err
    }


}
module.exports = dbModel