$(document).ready(function(){


    if (localStorage.getItem('City Search')){
        getWeatherInfo(localStorage.getItem('City Search'));
    }

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

            if (!($('#previousSearches').children('p').text()).includes(response.name)) {
                var $citySearch = $('<p class="border border-dark p-1 m-0 rounded">' + response.name + '</p>');
                $('#previousSearches').prepend($citySearch);
            }
            
            localStorage.setItem('City Search', response.name);
        });

        // 5 Day Forecast
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
            var day = moment().add( (i + 1), 'day').format('l');
            $('.card-body').eq(i).children('h4').text(day);
        }
    }

    // This sends the input value to the getWeatherInfo function.
    $('form').on('submit', function(e) {
        e.preventDefault();
        getWeatherInfo($(this).children('input').val().trim());
        $(this).children('input').val('');
    });








        // $(this).children('input').val('');


    // $('form').on('submit', function(e) {
    //     e.preventDefault();

    //     // Run the function(cityQuery) so I can send in names from other sources
    //     var cityQuery = $(this).children('input').val().trim();

    //     $.ajax({
    //         url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityQuery + '&appid=9306053ba5900e4bb80891c550654eb4',
    //         method: 'GET'
    //     }).then(function(response) {
    //         $('#cityDisplay').text(response.name);
    //         $('#conditionIcon').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');
    //         $('#temperature').text(((response.main.temp - 273.15) * 9/5 + 32).toFixed(1) + ' °F');
    //         $('#humidity').text(response.main.humidity + '%');
    //         $('#windSpeed').text(response.wind.speed + ' MPH');

    //         var lat = response.coord.lat;
    //         var lon = response.coord.lon;

    //         $.ajax({
    //             url: 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=9306053ba5900e4bb80891c550654eb4',
    //             method: 'GET'
    //         }).then(function(response){
    //             var uvi = response.value;
    //             var uviDisplay = $('#uvIndex');
    //             if (uvi <= 2) {
    //                 uviDisplay.attr('class', 'bg-success text-white rounded p-1');
    //             } else if (uvi > 2 && uvi <= 5) {
    //                 uviDisplay.attr('class', 'yellow rounded p-1');
    //             } else if (uvi > 5 && uvi <= 7) {
    //                 uviDisplay.attr('class', 'orange rounded p-1');
    //             } else {
    //                 uviDisplay.attr('class', 'bg-danger text-white rounded p-1');
    //             }
    //             uviDisplay.text(uvi);
    //         });

    //         var $citySearch = $('<p class="border border-dark p-1 m-0 rounded">' + response.name + '</p>');
    //         $('#previousSearches').prepend($citySearch);

    //     });
    //     $(this).children('input').val('');

    //     // // 5 Day Forecast
    //     $.ajax({
    //         url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityQuery + '&appid=9306053ba5900e4bb80891c550654eb4',
    //         method: 'GET'
    //     }).then(function(response) {
    //         var j = 7;
    //         for (i = 0; i < $('.card-body').length; i++) {
    //             $('.card-body').eq(i).children('img').attr('src', 'http://openweathermap.org/img/wn/' + response.list[j].weather[0].icon + '.png');
    //             $('.card-body').eq(i).children('p:first').children('span').text(((response.list[j].main.temp - 273.15) * 9/5 + 32).toFixed(1) + ' °F');
    //             $('.card-body').eq(i).children('p:last').children('span').text(response.list[j].main.humidity + '%');
    //             j = j + 8;
    //         }
    //     });

    //     var m = moment().format('l');
    //     $('#today').text(m);

    //     for (i = 0; i < $('.card-body').length; i++) {
    //         var day = moment().add( (i + 1), 'day').format('l');
    //         console.log(day);
    //         $('.card-body').eq(i).children('h4').text(day);
    //     }
    // });






});