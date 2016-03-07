$(document).ready(function() {
	getLatLon();
});

//1.get current lan & lon
var lat = "";
var lon = "";
var tempunit = "°C";
var current_temp = 0;

function getLatLon() {
	var startPos;
	var geoOptions = {
		enableHighAccuracy: true
	}

	var geoSuccess = function(position) {
		startPos = position;
		lat = startPos.coords.latitude;
		lon = startPos.coords.longitude;
		doAjax();
	};
	var geoError = function(error) {
		console.log('Error occurred. Error code: ' + error.code);
	};

	navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}

//get weather file(json type) based on lan&lon
function doAjax() {
	$.ajax({
		type: 'GET',
		url: 'https://openweathermap.org/data/2.5/weather?appid=15a738dd59be0f288da09d8fa0ac6b37',
		data: {
			'lat': lat,
			'lon': lon
		},
		dataType: "json",
		async: true,
		success: function(data) {
				//get city name
				$(".city").text(data.name);
				//get country
				$.each(data.sys, function(key, value) {
					if (key == "country") {
						$(".city").append("<span>, " + value + "</span>");
					}
				});
				//get current temp
				$.each(data.main, function(key, value) {
					if (key == "temp") {
						current_temp = Math.round(value - 273.15);

						$(".temp").text(current_temp).append("<span> " + tempunit + "</span>");
					}
				});

				//get main weather:sunny clouds rain and so on
				$.each(data.weather, function(i, item) {
					$(".weather").text(item.main);
					//set weather icon
					weather = item.main;
					$("#wi-icon").removeClass();
					switch (weather) {
						case "Clouds":
							$("#wi-icon").addClass("wi wi-cloudy");
							break;
						case "Clear":
							$("#wi-icon").addClass("wi wi-day-sunny");
							break;
						case "Rain":
							$("#wi-icon").addClass("wi wi-sprinkle");
							break;
						case "Snow":
							$("#wi-icon").addClass("wi wi-snow");
							break;
						case "Fog":
							$("#wi-icon").addClass("wi wi-fog");
							break;
						case "Haze":
							$("#wi-icon").addClass("wi wi-day-haze");
							break;
						case "Mist":
							$("#wi-icon").addClass("wi wi-cloudy");
							break;
						default:
							$("#wi-icon").addClass("wi wi-fog");
							break;
					}

				});
			} //success end
	});
}

//change temperature unit
var boo_tempunit = true;
$(".temp").click(function() {
	if (boo_tempunit) {
		$(".temp").text(Math.round(current_temp + 32)).append("<span> " + "℉" + "</span>");
		current_temp += 32;
		return boo_tempunit = false;
	} else {
		$(".temp").text(Math.round(current_temp - 32)).append("<span> " + "°C" + "</span>");
		current_temp -= 32;
		return boo_tempunit = true;
	}
});

//get current date
var d = new Date();
var date = d.getDate();
var month = d.getMonth();
var day = d.getDay();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var months = new Array(12);
months[0] = "Jan. ";
months[1] = "Feb. ";
months[2] = "Mar. ";
months[3] = "Apr. ";
months[4] = "May. ";
months[5] = "Jun. ";
months[6] = "Jul. ";
months[7] = "Aug. ";
months[8] = "Sep. ";
months[9] = "Oct. ";
months[10] = "Nov. ";
months[11] = "Dec. ";

var daytime = date + " " + months[month] + weekday[day];
$(".daytime").text(daytime);