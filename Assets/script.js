$(document).ready(function(){








    $('form').on('submit', function(e) {
        e.preventDefault();
        var cityQuery = $(this).children('input').val().trim();

        $.ajax({

            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityQuery + '&appid=9306053ba5900e4bb80891c550654eb4',
            method: 'GET'
        }).then(function(response) {
            $('#cityDisplay').text(response.name);
            $('#conditionIcon').attr('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');
            $('#temperature').text(((response.main.temp - 273.5) * 9/5 + 32).toFixed(1) + ' °F');
            $('#humidity').text(response.main.humidity + '%');
            $('#windSpeed').text(response.wind.speed + ' MPH');

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=9306053ba5900e4bb80891c550654eb4',
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

            var $citySearch = $('<p class="border border-dark p-1 m-0 rounded">' + response.name + '</p>');
            $('#previousSearches').prepend($citySearch);


        });

        $(this).children('input').val('');

        // // 5 Day Forecast
        // $.ajax({
        //     url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityQuery + '&appid=9306053ba5900e4bb80891c550654eb4',
        //     method: 'GET'
        // }).then(function(response) {
        //     $('#cityDisplay').text(response.city.name);
        //     $('#conditionIcon').attr('src', 'http://openweathermap.org/img/wn/' + response.list[0].weather[0].icon + '.png');
        //     console.log(response.list[0].weather[0].icon);
        //     $('#temperature').text(((response.list[0].main.temp - 273.5) * 9/5 + 32).toFixed(1) + ' °F');
        //     $('#humidity').text(response.list[0].main.humidity + '%');
        //     $('#windSpeed').text(response.list[0].wind.speed + ' MPH');
        //     var lat = response.city.coord.lat;
        //     var lon = response.city.coord.lon;

        //     $.ajax({
        //         url: 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=9306053ba5900e4bb80891c550654eb4',
        //         method: 'GET'
        //     }).then(function(response){
        //         var uvi = response.value;
        //         var uviDisplay = $('#uvIndex');
        //         if (uvi <= 2) {
        //             uviDisplay.attr('class', 'bg-success text-white rounded p-1');
        //         } else if (uvi > 2 && uvi <= 5) {
        //             uviDisplay.attr('class', 'yellow rounded p-1');
        //         } else if (uvi > 5 && uvi <= 7) {
        //             uviDisplay.attr('class', 'orange rounded p-1');
        //         } else {
        //             uviDisplay.attr('class', 'bg-danger text-white rounded p-1');
        //         }
        //         uviDisplay.text(uvi);
        //     });

        //     var $citySearch = $('<p class="border border-dark p-1 m-0 rounded">' + response.city.name + '</p>');
        //     $('#previousSearches').prepend($citySearch);


        // });

        // $(this).children('input').val('');

    });



    



});