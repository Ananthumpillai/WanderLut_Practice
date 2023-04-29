

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

packageService.destination=async (keyword)=>{

    let packages=await dbModel.destinations(keyword)
    if(packages===null){
        let err=new Error("Sorry we don't serve this location")
        err.status=400
        throw err
    }
    else{
        return packages
    }
}



module.exports=packageService