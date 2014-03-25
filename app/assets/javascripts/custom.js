var mapCanvas;
var map;
var markers =[];
var infowindow;
var styles;
var mapCanvasForm
var lat;
var lng;

function initialize() {
  // set up default map options
  var lat = -25.3;
  var lng = 133.8;
  mapCanvas = document.getElementById("map-canvas");

  var styles =  [
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        { "visibility": "on" },
        { "color": "#ffffff" }
      ]
    },{
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#ffffff" },
        { "weight": 0.4 }
      ]
    },{
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#000000" }
      ]
    },{
      "featureType": "landscape.natural",
      "stylers": [
        { "color": "#0A1C28" }
      ]
    },{
      "featureType": "administrative",
      "elementType": "labels.text.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#ffffff" }
      ]
    },{
    }
  ];

  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 2,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
    styles: styles
  };

  // create a map
  map = new google.maps.Map(mapCanvas,
    mapOptions);

  infowindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });
}



function mapForm() {

  // adds listener for when a user marks a location for an issue
  google.maps.event.addListener(map, 'click', function(event) {
    // clear markers and create new one 
    if (markers.length > 0) {
      markers[0].setMap(null);
      markers = [];
    }  
    var marker2 = new google.maps.Marker({position: event.latLng, map: map, draggable: true});
    markers.push(marker2);
    var location = event.latLng;
    getMarkerPosition(event);
    google.maps.event.addListener(marker2, 'dragend', function(event) {
      getMarkerPosition(event);
    });
  });

}

function getMarkerPosition(event){
  console.log(event.latLng);
  var lat = event.latLng.lat();
  var lng = event.latLng.lng();
  $('#issue_lat').val(lat);
  $('#issue_lng').val(lng);
}

function fetchIssues() {
  var issues = gon.issues
  // Create a marker on the map for each issue 
  for (var i = 0; i < issues.length; i++) {
    createMarker(issues[i]);
  }
}

function createMarker(issue) {
  var location = new google.maps.LatLng(issue.lat, issue.lng);
  marker = new google.maps.Marker({
    map: map,
    position: location,
  });
  // store all the markers in an array
  // markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("<div id='info-content'><h2>" + issue.title + "</h2><p>" + issue.description + "</p><a href='" + issue.url + "' target='_blank'>" + issue.organisation + "</a></div>");
    infowindow.open(map, this);
  });
}

function editMarker(issue) {
  var location = new google.maps.LatLng(issue.lat, issue.lng);
  marker = new google.maps.Marker({
    map: map,
    position: location,
    draggable: true
  });
  markers.push(marker);
  google.maps.event.addListener(marker, 'dragend', function(event) {
    getMarkerPosition(event);
  });
  // mapForm();
}






