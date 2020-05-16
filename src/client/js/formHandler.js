function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let userLocation = document.getElementById('inputLocation').value
    let userDate = document.getElementById('inputDate').value
    console.log(userDate, userLocation)
    pixData(pixURL1, userLocation, pixURL2)
    geoData(geoURL1, userLocation, geoURL2)
    
}
 
/* Get image from PIXABAY API
const updateImage = async ()=> {
    const request = await fetch('/pix')
    try {
        const pixabayData = await request.json()
        
    } catch(error) {
        console.log("error", error)
    }
} */

const pixURL1 = 'https://pixabay.com/api/?key=16556677-f422a39b53b1100a4cbef14e0&q='
const pixURL2 = '&image_type=photo&pretty=true&category=places&orientation=horizontal'

const pixData = async (pixURL1, location, pixURL2)=> {
    const response = await fetch(pixURL1 + location + pixURL2)
    try {
        const data = await response.json()
        document.getElementById('resultsImg').innerHTML = '<img class="pixImage" src=' + data.hits[0].webformatURL + '>'
        return data
    } catch(error) {
        console.log("error: ", error)
    }
}

const geoURL1 = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoURL2 = '&username=nerdpl'

const geoData = async (geoURL1, location, geoURL2)=> {
    const response = await fetch(geoURL1 + location + geoURL2)
    try {
        const data = await response.json()
        console.log(data.postalCodes[0].postalCode)
        return data
    } catch(error) {
        console.log("error: ", error)
    }
}