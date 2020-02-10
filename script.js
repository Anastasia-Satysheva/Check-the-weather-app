var today = moment().format('DD/MM/YYYY');
var cities = [];
let weatherKey = "&units=imperial&APPID=508709c2441fb673a7b65b4044c1ad6d";
let APIKey = "508709c2441fb673a7b65b4044c1ad6d";
var forecastIndex = 0;
var lat
var long

function displayWeatherInfo(city) {
    $("#current").empty();
    $(".five-day").empty();
    $(".forecast-head").empty();
    

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + weatherKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response, lat, long) { 
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var cityTemp = Math.round(response.main.temp);
        var cityTempIcon = response.weather[0].icon;
        var cityTempIconURL = "http://openweathermap.org/img/w/" + cityTempIcon + ".png";
        var cityHumidity = response.main.humidity;
        var cityWindSpeed = response.wind.speed;
        $("#current").empty();//
        var CityLat = lat;
        var CityLong = long;

            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + CityLat + "&lon=" + CityLong;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                $("#current")
                    .append($("<h2>").html(city + " (" + today + ")" + "<img src=" + cityTempIconURL + ">")) 
                    .append($("<p>").html("Temperature: " + cityTemp + " °F")) 
                    .append($("<p>").html("Humidity: " + cityHumidity + "%"))
                    .append($("<p>").html("Windspeed: " + cityWindSpeed + " MPH"))
                    .append($("<p>").html("<p>UV Index: <span id = current-UV><nbsp>" + response.value + "<nbsp></span></p>"))
            });
    });



    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + weatherKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".five-day").empty();
        $(".forecast-head").empty();
        $(".forecast-head")

            .append($("<h2>").text("5-Day Forecast:"))
        for (i = 0; i <= 4; i++) {
            var nextDay = moment().add(1 + i, 'days').format('DD/MM/YYYY');
            var cityIconForecast = response.list[i].weather[0].icon;
            var cityIconURLForecast = "http://openweathermap.org/img/w/" + cityIconForecast + ".png";
            var cityTempForecast = Math.round(response.list[i].main.temp);
            var cityHumidityForecast = response.list[i].main.humidity;
            $(".five-day")
                .append($("<div>").addClass("col-sm-2 days")
                    .append($("<p>").html(nextDay))
                    .append($("<img src=" + cityIconURLForecast + ">")) 
                    .append($("<p>").html("Temp: " + cityTempForecast + " °F"))
                    .append($("<p>").html("Humidity: " + cityHumidityForecast + "%")))
       
        }
    });

}

function renderButtons() {
    var cityInitial = $("#city-input").val().trim();
    var citySearch=cityInitial.charAt(0).toUpperCase() + cityInitial.substring(1);
        if (cities.indexOf($("#city-input").val().trim()) === -1) {
                 $("#search-history").append($("<button>").addClass("past-city").attr("city-name",citySearch ).text(citySearch))
                 cities.push(citySearch);
        }

    $(".past-city").on("click", function () {       
        displayWeatherInfo($(this).attr("city-name"));
    }) 
}

$("#add-city").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    displayWeatherInfo(city);
    renderButtons();
});

function newFunction() {
    displayWeatherInfo();
}