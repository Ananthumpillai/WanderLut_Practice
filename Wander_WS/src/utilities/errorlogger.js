
const fs = require('fs')


let errorLogger = (err, req, res, next) => {

    fs.appendFile('Errorlogger.txt', new Date() + err.stack + '\n', (err) => {
        if (err) {
            console.log("logging failed");
        }
    })
    if (err.status) {
        res.status(err.status)
    }
    else {
        res.status(500)
    }
    res.json({ message: err.message })
    next()
}

module.exports = errorLogger