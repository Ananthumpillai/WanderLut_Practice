const expresss=require("express")
const bodyParser=require('body-parser')
const cors=require('cors')
const app=expresss()

app.use(bodyParser.json())
app.use(cors)


app.get('/',(req,res,next)=>{
    res.send("express is working fine")
})


app.listen(2500)
console.log("server started at 2500");