# Travel App

## Table of Contents

* [Project info](#project_info)
* [List of files](#list_of_files)
* [Installation](#installation)
* [Functions](#functions)
* [Additional functionality](#additional_functionality)

## Project_Info

The subject of the project was to setup webpack enviroment and create an app that uses at least 3 APIs, setup Webpack, Express, Node.js, Sass, Service Workers. Also create separate developement and production configurations for webpack and set up webpack dev server for the developement configuration. The user inputs the location and the date of the trip and receives the weather for the day of departure and a photo of the place. I have used Pixabay API to get the photo by the location name, Geonames API to get latitude and longitude of the place, and Weatherbit API to get the weather for the next 15 days using coordinates from the previous API.

## List_Of_Files

src\client
- index.js

src\client\js
- app.js

src\client\styles
- style.scss

src\client\views
- index.html
    
src\server
- server.js

package-lock.json
package.json
process.env
README.md
webpack.dev.js
webpack.prod.js

## Installation

To access built version of the app run dist\index.html

You need to setup webpack with all the loaders and plugins from the package.json file.
- npm start
to start the server
- npm run build-dev
to run developement webpack configuration
- npm run build-prod
to run production webpack configuration and build the website in the 'dist' folder

In order to access APIs you need to include .env file in the main folder with following credentials:
- API_KEY_PIXABAY=
- API_ID_GEONAMES=
- API_KEY_WEATHERBIT=

## Functions

Server side (src\server\server.js)
- Setup express server, body parser and cors.
- sendData()
    Setup a route to send all the project data.
- addData()
    Setup a route to receive new data entry and store it in an array.

Client side (src\client\js\app.js)
- handleSubmit()
    Main function that runs the rest of the funcions in specific order after the submit button is clicked.
- pixData()
    Fetches the photo of the user specified location and updates the webpage with it.
- geoData()
    Fetches the latitude and longitude coordinates for the user specified place of the trip.
- weatherData()
    Fetches the weather for today and next 15 days for the coordinates from the previous API.
- postData()
    Sends all the project data to the server.
- updateDOM()
    Downloads the latest data from the server and updates the DOM with it.

## Additional_Functionality

- Added second date field in the form. The app now also returns the length of the trip in days.