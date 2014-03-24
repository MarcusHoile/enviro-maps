var mapCanvas;
var map;
var markers = [];

function initialize() {
  var lat = -25.3;
  var lng = 133.8;
  mapCanvas = document.getElementById("map-canvas");
  
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 2,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  };

  // create a map
  map = new google.maps.Map(mapCanvas,
    mapOptions);

  infowindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });
  fetchIssues();
}

function fetchIssues() {
  var issues = gon.issues
  // Create a marker on the map for each in markers 
  for (var i = 0; i < issues.length; i++) {
    createMarker(issues[i]);
  }
}

function createMarker(issue) {
  var location = new google.maps.LatLng(issue.lat, issue.lng);
  marker = new google.maps.Marker({
    map: map,
    position: location
  });
  // store all the markers in an array
  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    // infowindow.setContent("<h1>" + issue.title + "</h1><br><br><button>do something</button>");
    buildIWContent(issue);
    infowindow.open(map, this);
  });
}


function buildIWContent(issue) {
  document.getElementById('iw-url').innerHTML = '<b><a href="' + issue.url +
  '">' + issue.organisation + '</a></b>';
  document.getElementById('iw-description').textContent = issue.description;
  document.getElementById('iw-title').textContent = issue.title;
}



