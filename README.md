# Weather-Dashboard

https://dhfoss.github.io/Weather-Dashboard/

### Apis Used
OpenWeather.org  
Moment.js

### Framework
Bootstrap

### Overview
This is an app that displays the current weather, and the 5 day forecast for a city that is selected by the user. It works by getting weather data from the Open Weather Map API and date information from moment.js. Every time the user searches for a city, the city name is saved and is displayed under the search bar.  If any of the previous searches are clicked, the app displays the weather info from that city again.  If the user searches for a city that has already been searched for, the info displays, but the search history is not updated.  This prevents the search history from displaying a city multiple times.  This search history and most recent search are saved in local storage, so that if the user returns to the page, that info is displayed.  There is a clear history button, which clears the list of city searches, but it does not clear the current city from being displayed.  However, the current city is cleared from the history, so if the user returns to the page, that city will no longer be displayed, and the app will be blank. 

![App Screen Shot](/Assets/images/screen-shots/0-App.png?raw=true)

### Functionality
The following is a step by step explanation of the script for this app.

First, the app defines a global variable, and empty array.  This is where the search history will be stored and updated.  Then the script checks if there is any city names in local storage.  If so, it will take the names and print them to the browser into the search history area.  
![Local Storage Search History](/Assets/images/screen-shots/1-LocalStorageHistory.png?raw=true)

Next, the script checks what the most recent search was.  If there is data stored, it will send the city to the function that gets and displays weather and forecast data.  Since the search history does not update if a city is searched multiple times, this allows the app to remember the most recent search even if that city was searched multiple times.  
![Local Storage Most Recent Search](/Assets/images/screen-shots/2-LocalStorageLastSearch.png?raw=true)

Next is an event listener for the input element.  It takes the user's input, trims it, and sends it to the weather function.  
![Submit City](/Assets/images/screen-shots/3-SubmitCity.png?raw=true)

The next listener allows the user to click on one of the previous searches, which then is send to the weather function.  Now there is no need to trim the value, because it is no longer typed in by the user.  
![Click Previous Searches](/Assets/images/screen-shots/4-ClickPreviousSearches.png?raw=true)

The clear button resets the search history from the app (both the dynamically generated 'p' elements, and the data from local storage).  It also resets the array of searches. It will not clear the browser of the current city being displayed. However, it will clear the most recent search item from local storage, so if the user refreshes the page after clearing the history, the app will be blank once again.  
![Clear Button](/Assets/images/screen-shots/5-ClearButton.png?raw=true)

The remainder of the script consists of one big function that gets weather data for a city and displays it to th e app.  First, the function does an ajax request to Open Weather Map of the city the user inputs and sends the info to the jumbotron. It displays the response.name instead of what the user what typed in (this way, if the user typed in the city name with improper capitalization, it will always be displayed correctly).  It then updates the weather icon, the temperature (transposed from Kelvin to Fahrenheit, because I'm assuming that American non-scientists will be using this app), the humidity and the wind speed.  Finally, this section saves the latitude and longitude of the city to be used to get the UV index.  
![Display Current Weather](/Assets/images/screen-shots/6-DisplayCurrentWeather.png?raw=true)

Since the UV index is not included in the data provided by the previous ajax request, another one is required, using the latitude and longitude acquired from the previous search.  The 'if' statement determines which color the UV index will be when displayed (green for 0-2, yellow for 2.1-5, orange for 5.1-7, and red for 7.1 and above).  
![Display UV Index](/Assets/images/screen-shots/7-DisplayUVIndex.png?raw=true)

The script stores two pieces of data in local storage.  Every time the user searches for a city, the most recent search is saved under the key 'Last Search'.  This allows the most recent city to always show up when the page is loaded.  The second piece of data stored is the array containing the whole search history under the key 'City Searches'.  This will only update if the user searches for a city that does not appear on the search history. If it is indeed a new search, the page will dynamically generate a new 'p' element with the name of the city.  
![Local Storage Save](/Assets/images/screen-shots/8-LocalStorageSave.png?raw=true)

Since the previous ajax searches only retrieved data for the current weather, a third ajax request is required for the 5 day forecast.  This ajax request provides a 5 day forecast in three hour increments.  Because of that, the function takes every 8th piece of data from the starting time so that the cards are showing the weather for every 24 hours from the time requested. (This is why the index[i] of the card elements iterates by one, while the index[j] of the forecast data iterates by 8).  
![Display 5 Day Forecast](/Assets/images/screen-shots/9-DisplayForecast.png?raw=true)

If there is a way to easily manipulate date information, and display it in a readable format using Open Weather Map, I could not find it.  For that reason, I turned to moment.js to display the current date, and the dates for the 5 day forecast.  
![Display Dates](/Assets/images/screen-shots/10-DisplayDate.png?raw=true)

Thank you for checking out my app!  
-DHF  
dhfoss89@gmail.com
