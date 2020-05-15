function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let userLocation = document.getElementById('inputLocation').value
    let userDate = document.getElementById('inputDate').value
    console.log(userDate, userLocation)
    pixData(pixURL1, userLocation, pixURL2)
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

let pixURL1 = 'https://pixabay.com/api/?key=16556677-f422a39b53b1100a4cbef14e0&q='
let pixURL2 = '&image_type=photo&pretty=true&category=places'

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