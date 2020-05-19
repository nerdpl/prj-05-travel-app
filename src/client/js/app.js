// Global variables
const dotenv = require('dotenv')
dotenv.config()
let newEntry = {
    placeName: '',
    date: '',
    lat: '',
    lng: '',
    weather: '',
    maxTemp: '',
    lowTemp: ''
}

// main function
function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let userLocation = document.getElementById('inputLocation').value
    let userDate = document.getElementById('inputDate').value
    newEntry.placeName = userLocation
    newEntry.date = userDate
    // calculate number of days to get weather
    let todayDate = new Date()
    let tripDate = new Date(userDate)
    // set the same time to get the result in full days
    tripDate.setHours(todayDate.getHours())
    tripDate.setMinutes(todayDate.getMinutes())
    tripDate.setSeconds(todayDate.getSeconds())
    tripDate.setMilliseconds(todayDate.getMilliseconds())
    let days = (tripDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)
    // if date of the trip is more than 15 days away display error
    if (days > 15) {
        document.getElementById('errorMSG').innerHTML = 'Sorry, weather forecast is only available for the next 15 days'
        setTimeout(()=> {
            document.getElementById('errorMSG').innerHTML = ''
        }, 3000)
    }
    // get the photo of the location and update DOM with it
    pixData(pixURL1, pixURL2, userLocation, pixURL3)
    // get the coordinates for the location
    geoData(geoURL1, userLocation, geoURL2)
    .then (()=> {
        //get the weather from previously received coordinates
        weatherData(weatherURL1, newEntry.lat, weatherURL2, newEntry.lng, weatherURL3, days)
        .then (()=> {
            // update DOM with the weather results
            updateDOM()
        })
    })
}

// PIXABAY API credentials
const pixURL1 = 'https://pixabay.com/api/?key='
const pixURL2 = '&q='
const pixURL3 = '&image_type=photo&pretty=true&category=places&orientation=horizontal'

// Get the photo of the typed in location and update the DOM with it
const pixData = async (pixURL1, pixURL2, location, pixURL3)=> {
    const response = await fetch(pixURL1 + process.env.API_KEY_PIXABAY + pixURL2 + location + pixURL3)
    try {
        const data = await response.json()
        document.getElementById('resultsImg').innerHTML = '<img id="pixImage" src=' + data.hits[0].webformatURL + '>'
        return data
    } catch(error) {
        console.log('error: ', error)
    }
}

// GEONAMES API credentials
const geoURL1 = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoURL2 = '&username='

// get user's location latitude and longitude from GEONAMES
const geoData = async (geoURL1, location, geoURL2)=> {
    const response = await fetch(geoURL1 + location + geoURL2 + process.env.API_ID_GEONAMES)
    try {
        const data = await response.json()
        newEntry.lat = data.postalCodes[0].lat
        newEntry.lng = data.postalCodes[0].lng
        return data
    } catch(error) {
        console.log("error: ", error)
        document.getElementById('errorMSG').innerHTML = 'This location doesn\'t seem to exist'
        setTimeout(()=> {
            document.getElementById('errorMSG').innerHTML = ''
        }, 3000)
    }
}

// WEATHERBIT API credentials
const weatherURL1 = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='
const weatherURL2 = '&lon='
const weatherURL3 = '&key='

// send latitude and longitude and receive weather for 16 days
const weatherData = async (weatherURL1, lat, weatherURL2, lng, weatherURL3, days)=> {
    const response = await fetch(weatherURL1 + lat + weatherURL2 + lng + weatherURL3 + process.env.API_KEY_WEATHERBIT)
    try {
        const data = await response.json()
        // use calculated number of days to access desired part of the response
        newEntry.weather = data.data[days].weather.description
        newEntry.lowTemp = data.data[days].low_temp
        newEntry.maxTemp = data.data[days].max_temp
        return data
    } catch(error) {
        console.log('error: ', error)
    }
}

// update DOM with all the results
const updateDOM = ()=> {
    document.getElementById('results').innerHTML = '<h2>Results:</h2>Place: ' + newEntry.placeName.toUpperCase() 
        + '<BR>Date: ' + newEntry.date 
        + '<BR>Weather: ' + newEntry.weather 
        + '<BR>Maximum temp: ' + newEntry.maxTemp 
        + ' C<BR>Lowest temp: ' + newEntry.lowTemp + ' C'
    
}

export { handleSubmit }