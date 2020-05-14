
/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = ',us&units=imperial&appid=8bc05df06f99dd61353e5f354f56fa01';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// adding an event listener on the 'generate' button
document.getElementById('generate').addEventListener('click', performAction);

// Setting the action for the button 'generate'
function performAction(e) {
    const userResponse = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    // get data from weather API
    postApiData(baseURL, zipCode, apiKey)
    // waiting for the data and then sending it to our server project data
    .then ((apiData)=> {
        return postData('/add', {
            temperature: apiData.main.temp,
            date: newDate,
            userResponse: userResponse
        });
    })
    // updating our page with latest data
    .then (()=> {
        updatePage()
    });
};

// Setting the POST route to get weather API data
const postApiData = async (baseURL, zip, apiKey)=> {
    const response = await fetch(baseURL + zip + apiKey)
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error", error);
    };
};

// Setting the POST route to our server
const postData = async (url = '', data = {})=> {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data) 
    })
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error: " + error);
    };
};

// updating our page with latest entry
const updatePage = async ()=> {
    const request = await fetch('/all');
    try {
        const projectData = await request.json();
        const i = projectData.length-1;
        document.getElementById('date').innerHTML = projectData[i].date;
        document.getElementById('temp').innerHTML = projectData[i].temperature;
        document.getElementById('content').innerHTML = projectData[i].userResponse;
    } catch(error) {
        console.log("error", error);
    };
};