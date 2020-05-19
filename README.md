# Travel App

## Table of Contents

* [Project Info](#project_info)
* [List of files](#list_of_files)
* [Installation](#installation)
* [Functions](#functions)

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

You need to setup webpack with all the loaders and plugins from the package.json file.
- npm start
to start the server
- npm run build-dev
to run developement webpack configuration
- npm run build-prod
to run production webpack configuration and build the website in the 'dist' folder 

## Functions

Server side (src\server\server.js)
- Setup express server, body parser and cors.

Client side (src\client\js\app.js)
- handleSubmit()
    Main function that runs the rest of the funcions in specific order after the submit button is clicked.
- pixData()
    Fetches the photo of the user specified location and updates the webpage with it.
- geoData()
    Fetches the latitude and longitude coordinates for the user specified place of the trip.
- weatherData()
    Fetches the weather for today and next 15 days for the coordinates from the previous API.
- updateDOM()
    Updates the DOM with the weather results.