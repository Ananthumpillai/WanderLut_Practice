const connection = require('../utilities/connection')

let dbModel = {}


dbModel.hotDeals = async () => {
    let dbModel = await connection.hotdeals()
    let hotdeals = await dbModel.find({}, { _id: 0 })
    if (hotdeals.length > 0) {
        return hotdeals
    }
    else {
        return null
    }
}


dbModel.destinations = async (keyword) => {
    let destinationModel = await connection.destinations()
    let destinationData = await destinationModel.find({ $or: [{ continent: { $regex: keyword, $options: 'i' } }, { name: { $regex: keyword, $options: 'i' } }] }, { _id: 0 })
    if (destinationData.length > 0) {
        let hotDealModel = await connection.hotdeals()
        let hotdeal = await hotDealModel.find({ $or: [{ continent: { $regex: keyword, $options: 'i' } }, { name: { $regex: keyword, $options: 'i' } }] }, { _id: 0 })
        if (hotdeal.length > 0) {
           let finalData= destinationData.concat(hotdeal)
            return finalData
        }
        else {
            return destinationData
        }

    }
    else {
        let hotDealModel = await connection.hotdeals()
        let hotdeal = await hotDealModel.find({ $or: [{ continent: { $regex: keyword, $options: 'i' } }, { name: { $regex: keyword, $options: 'i' } }] }, { _id: 0 })
        if (hotdeal.length > 0) {
            return hotdeal
        }
        else {
            return null
        }

    }
}

module.exports = dbModel