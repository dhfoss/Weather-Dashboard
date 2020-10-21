# Weather-Dashboard

https://dhfoss.github.io/Weather-Dashboard/

This is an app that displays the current weather, and the 5 day forcast for a city that is selected by the user. It works by getting weather data from the Open Weather Map API and date information from moment.js. Every time the user searches for a city, the city name is saved and is displayed under the search bar as a list.  If any of the previous searches are clicked, the app displays the weather info from that city again.  If the user searches for a city that has already been searched for, the info displays, but the search history is not updated.  This prevents the search history from displaying a city multiple times.  This search history and most recent search are saved in local storage, so that if the user returns to the page, that info is displayed.  There is a clear history button, which clears the list of city searches, but it does not clear the current city from being displayed.  However, the current city is cleared from the history, so if the user returns to the page, that city will no longer be displayed, and the app will be blank. 

![App Screen Shot](/Assets/images/screen-shots/0-App.png?raw=true)



The following is a step by step explanation of the script for this app.

