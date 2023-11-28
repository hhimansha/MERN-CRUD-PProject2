const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

require('dotenv').config();

//express app
const app = express();

//middleware
app.use(express.json())
app.use((req, res,next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

//connect to DB
mongoose.connect(process.env.MONG_URL).then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to the DB & listen on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

