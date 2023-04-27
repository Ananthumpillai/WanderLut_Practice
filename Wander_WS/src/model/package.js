const connection = require('../utilities/connection')

let dbModel = {}


dbModel.hotDeals = async () => {
    let dbModel = await connection.hotdeals()
    let hotdeals= await dbModel.find({},{_id:0})
    if(hotdeals.length>0){
        return hotdeals
    }
    else{
        return null
    }
}



module.exports=dbModel