$(document).ready(function(){

    var citySearches = [];

    // This gets the search history from local storage and prints it to the browser
    if (localStorage.getItem('City Searches')) {
        var citySearchesString = localStorage.getItem('City Searches');
        citySearches = JSON.parse(citySearchesString);
        for (i = 0; i < citySearches.length; i++) {
            var $citySearch = $('<p class="border border-dark p-1 m-0 rounded">' + citySearches[i] + '</p>');
            $('#previousSearches').prepend($citySearch);
        }
    }

    // This displays the weather data of the most recently searched city
    if (localStorage.getItem('Last Search')){
        getWeatherInfo(localStorage.getItem('Last Search'));
    }

    // This sends the input value to the getWeatherInfo function.
    $('form').on('submit', function(e) {
        e.preventDefault();
        getWeatherInfo($(this).children('input').val().trim());
        $(this).children('input').val('');
    });

    // Click the previous searches to pull up the data of the search
    $('#previousSearches').on('click', function(e) {
        if ($(e.target).is('p')) {
            getWeatherInfo($(e.target).text());
        }
    });

    // This button clears the search history, but keeps the current search displayed
    $('#clearButton').on('click', function(e) {
        e.preventDefault();
        $('#previousSearches').empty();
        citySearches = []
        localStorage.removeItem('Last Search');
        localStorage.removeItem('City Searches');
    });

    // This function gets info from Open Weather Map and moment.js and displays it to the page.
    function getWeatherInfo (cityQuery) {

        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityQuery + '&appid=9306053ba5900e4bb80891c550654eb4',
            method: 'GET'
        }).then(function(response) {
            $('#cityDisplay').text(response.name);
            $('#conditionIcon').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');
            $('#temperature').text(((response.main.temp - 273.15) * 9/5 + 32).toFixed(1) + ' °F');
            $('#humidity').text(response.main.humidity + '%');
            $('#windSpeed').text(response.wind.speed + ' MPH');

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // This ajax search gets the UV index
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=9306053ba5900e4bb80891c550654eb4',
                method: 'GET'
            }).then(function(response){
                var uvi = response.value;
                var uviDisplay = $('#uvIndex');
                if (uvi <= 2) {
                    uviDisplay.attr('class', 'bg-success text-white rounded p-1');
                } else if (uvi > 2 && uvi <= 5) {
                    uviDisplay.attr('class', 'yellow rounded p-1');
                } else if (uvi > 5 && uvi <= 7) {
                    uviDisplay.attr('class', 'orange rounded p-1');
                } else {
                    uviDisplay.attr('class', 'bg-danger text-white rounded p-1');
                }
                uviDisplay.text(uvi);
            });

            // This saves the latest search into local storage. It is not included in the loop below because I want the website to remember
            // the last city searched even if it's been searched previously.
            localStorage.setItem('Last Search', response.name);

            // This goes through the search history and sees if the current city has already been searched for. If not, it is included in the
            // array of searches, and updates the local storage.
            if (!($('#previousSearches').children('p').text()).includes(response.name)) {
                citySearches.push(response.name);
                var citySearchesString = JSON.stringify(citySearches);
                localStorage.setItem('City Searches', citySearchesString);
                var $citySearch = $('<p class="border border-dark p-1 m-0 rounded">' + response.name + '</p>');
                $('#previousSearches').prepend($citySearch);
            }
        });

        // Display 5 Day Forecast
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityQuery + '&appid=9306053ba5900e4bb80891c550654eb4',
            method: 'GET'
        }).then(function(response) {
            var j = 7;
            for (i = 0; i < $('.card-body').length; i++) {
                $('.card-body').eq(i).children('img').attr('src', 'http://openweathermap.org/img/wn/' + response.list[j].weather[0].icon + '.png');
                $('.card-body').eq(i).children('p:first').children('span').text(((response.list[j].main.temp - 273.15) * 9/5 + 32).toFixed(1) + ' °F');
                $('.card-body').eq(i).children('p:last').children('span').text(response.list[j].main.humidity + '%');
                j = j + 8;
            }
        });

        // Gets date info for Jumbotron and cards
        var m = moment().format('l');
        $('#today').text(m);
        for (i = 0; i < $('.card-body').length; i++) {
            var day = moment().add( (i + 1), 'day').format('M/D');
            $('.card-body').eq(i).children('h4').text(day);
        }
    }

});