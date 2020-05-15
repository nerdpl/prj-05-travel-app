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

// PIXABAY API
let pixURL1 = 'https://pixabay.com/api/?key=16556677-f422a39b53b1100a4cbef14e0&q='
let pixURL2 = '&image_type=photo&pretty=true&category=places'

const pixData = async (pixURL1, location, pixURL2)=> {
    const response = await fetch(pixURL1 + location + pixURL2)
    try {
        const data = await response.json()
        return data
    } catch(error) {
        console.log("error: ", error)
    }
}