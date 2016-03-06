var lat="";
var lon="";
$(".find").click(function(){
	$.ajax({
  type: "GET",
  url: "https://maps.googleapis.com/maps/api/geocode/xml?key=AIzaSyBg1fXjoisN2vIiqF8Pzfoechj3U3C_pbg",
  data:{
	  "address":"1600+Amphitheatre+Parkway,+Mountain+View+CA"
  },
  dataType: "xml",
  success: processXML
	});
});

$(".getwea").click(function(){
	$.ajax({
	type : 'GET',
	url : 'https://openweathermap.org/data/2.5/weather?appid=15a738dd59be0f288da09d8fa0ac6b37',
	data : {
			'lat' : lat,
			'lon':lon
		},
	dataType:"json",	
	success : function (text) {
			alert(text);
	},
	async : true,
	success: processJson
});
});

function processJson(){
	
  
}
function getLatLon(){
  var startPos;
  var geoOptions = {
    enableHighAccuracy: true
  }

  var geoSuccess = function(position) {
    startPos = position;
    lat=startPos.coords.latitude;  
    lon=startPos.coords.longitude;
    document.getElementById('startLat').innerHTML = lat; 
    document.getElementById('startLon').innerHTML = lon;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}




function processXML(xml) {
  $(xml).find("address_component").each(function() {
    if ($(this).find("type").text() == "postal_code") {
      var t = $(this).find("long_name").text();
      $("#result").text(t);
    }
  });
 }

getLatLon();

