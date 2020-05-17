// Global variables
let allData = []
let newEntry = {
    placeName: '',
    date: '',
    lat: '',
    lng: '',
    weather: '',
    maxTemp: '',
    lowTemp: ''
}

function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let userLocation = document.getElementById('inputLocation').value
    let userDate = document.getElementById('inputDate').value
    newEntry.placeName = userLocation
    newEntry.date = userDate
    let todayDate = new Date()
    let tripDate = new Date(userDate)
    console.log(todayDate)
    tripDate.setHours(todayDate.getHours())
    tripDate.setMinutes(todayDate.getMinutes())
    tripDate.setSeconds(todayDate.getSeconds())
    tripDate.setMilliseconds(todayDate.getMilliseconds())
    let days = (tripDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)
    if (days > 15) {
        document.getElementById('errorMSG').innerHTML = 'Sorry, weather forecast is only available for the next 15 days'
        setTimeout(()=> {
            document.getElementById('errorMSG').innerHTML = ''
        }, 3000)
    }
    pixData(pixURL1, userLocation, pixURL2)
    geoData(geoURL1, userLocation, geoURL2)
    .then (()=> {
        weatherData(weatherURL1, lat, weatherURL2, lng, weatherURL3, days)
    })
    .then (()=> {
        updateDOM()
    })
}

const pixURL1 = 'https://pixabay.com/api/?key=16556677-f422a39b53b1100a4cbef14e0&q='
const pixURL2 = '&image_type=photo&pretty=true&category=places&orientation=horizontal'

const pixData = async (pixURL1, location, pixURL2)=> {
    const response = await fetch(pixURL1 + location + pixURL2)
    try {
        const data = await response.json()
        document.getElementById('resultsImg').innerHTML = '<img class="pixImage" src=' + data.hits[0].webformatURL + '>'
        return data
    } catch(error) {
        console.log('error: ', error)
    }
}

const geoURL1 = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoURL2 = '&username=nerdpl'
let lat = 0
let lng = 0

const geoData = async (geoURL1, location, geoURL2)=> {
    const response = await fetch(geoURL1 + location + geoURL2)
    try {
        const data = await response.json()
        lat = data.postalCodes[0].lat
        lng = data.postalCodes[0].lng
        newEntry.lat = lat
        newEntry.lng = lng
        return data
    } catch(error) {
        console.log("error: ", error)
        document.getElementById('errorMSG').innerHTML = 'This location doesn\'t seem to exist'
        setTimeout(()=> {
            document.getElementById('errorMSG').innerHTML = ''
        }, 3000)
    }
}

const weatherURL1 = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='
const weatherURL2 = '&lon='
const weatherURL3 = '&key=9577e977cbd54849bc66696ec9ef97df'

const weatherData = async (weatherURL1, lat, weatherURL2, lng, weatherURL3, days)=> {
    const response = await fetch(weatherURL1 + lat + weatherURL2 + lng + weatherURL3)
    try {
        const data = await response.json()
        newEntry.weather = data.data[days].weather.description
        newEntry.lowTemp = data.data[days].low_temp
        newEntry.maxTemp = data.data[days].max_temp
        return data
    } catch(error) {
        console.log('error: ', error)
    }
}

const updateDOM = async()=> {
    console.log(newEntry)
    document.getElementById('results').innerHTML = '<h2>Results:</h2><BR>Place: ' + newEntry.placeName 
        + '<BR>Date: ' + newEntry.date 
        + '<BR>Weather: ' + newEntry.weather 
        + '<BR>Maximum temp: ' + newEntry.maxTemp 
        + ' C<BR>Lowest temp: ' + newEntry.lowTemp + ' C'
    
}