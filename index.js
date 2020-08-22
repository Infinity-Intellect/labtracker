const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

//Import required routes
const student = require("./routes/student/student")

//Use the necessary routes
app.use('/student', student)

//Home Route
app.get('/', (req, res) => {
    res.send("Program Checker Online !")
})

//Open port to listen
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`Listening open PORT ${PORT}`)
    }
})
