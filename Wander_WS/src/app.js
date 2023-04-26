const expresss=require("express")
const bodyParser=require('body-parser')
const cors=require('cors')
const router = require("./routing/routing")
const errorLogger = require("./utilities/errorlogger")
const app=expresss()

app.use(bodyParser.json())
app.use(cors())


app.use('/',router)


app.use(errorLogger)
app.listen(1050)
console.log("server started at 1050");