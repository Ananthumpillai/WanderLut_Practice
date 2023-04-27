

const dbModel = require('../model/package')

let packageService = {}


packageService.hotDeals=async ()=>{

    let hotDeals=await dbModel.hotDeals()
    if(hotDeals){
        return hotDeals
    }
    else{
        let err=new Error("Sorry something went wrong in fetching hot deals")
        err.status=404
        throw err
    }
}



module.exports=packageService