// Setup empty JS object to act as endpoint for all routes
projectData = []

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'))

// Setup Server
const port = 3000
const server = app.listen(port, listening)
function listening() {
    console.log(`running on localhost: ${port}`)
}

// GET route to send all the project data
app.get('/all', sendData)
function sendData (request, response) {
    response.send(projectData)
}

// POST route to get new entry from website
app.post('/add', addData)
function addData (request, response) {
    newEntry = {
        placeName: request.body.placeName,
        dateFrom: request.body.dateFrom,
        dateTo: request.body.dateTo,
        length: request.body.length,
        lat: request.body.lat,
        lng: request.body.lng,
        weather: request.body.weather,
        maxTemp: request.body.maxTemp,
        lowTemp: request.body.lowTemp
    }
    projectData.push(newEntry)
    response.send(projectData)
}