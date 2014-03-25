var mapCanvas;
var map;
var markers =[];
var mapCanvasForm;
var lat;
var lng;
var pozzy;

function initialize() {
  // set up default map options
  var lat = 20;
  var lng = 60;
  mapCanvas = document.getElementById("map-canvas");
  var maxZoom = 2;



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

  // instantiate the infowindow 
  infowindow = new google.maps.InfoWindow({
  });

  // add listener for any zoom changes and set max zoom
  google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.getZoom() < maxZoom) map.setZoom(maxZoom);
  });

  // add listener for any info window open, if click anywhere outside window it closes
  google.maps.event.addListener(map, 'click', function() {
    if (isInfoWindowOpen(infowindow)){
      infowindow.close();
    }
  });

  $('#reset-zoom').on('click', function() {
    map.setZoom(2);
  })
}

function isInfoWindowOpen(infoWindow){
  var map = infoWindow.getMap();
  return (map !== null && typeof map !== "undefined");
}



function setBounds() {
   // Bounds for North America
   var strictBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(80, 180), 
     new google.maps.LatLng(-80, -179)
   );

   // Listen for the dragend event
   google.maps.event.addListener(map, 'dragend', function() {
     if (strictBounds.contains(map.getCenter())) return;

     // We're out of bounds - Move the map back within the bounds

     var c = map.getCenter(),
         x = c.lng(),
         y = c.lat(),
         maxX = strictBounds.getNorthEast().lng(),
         maxY = strictBounds.getNorthEast().lat(),
         minX = strictBounds.getSouthWest().lng(),
         minY = strictBounds.getSouthWest().lat();

     if (x < minX) x = minX;
     if (x > maxX) x = maxX;
     if (y < minY) y = minY;
     if (y > maxY) y = maxY;

     map.setCenter(new google.maps.LatLng(y, x));
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

function openContentWindow() {
  var contentWindow = $('#content-window');
  contentWindow.addClass('animated slideInRight');

  contentWindow.css('display', 'block');
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

  // add listener for when user clicks a marker open infowindow with content
  // zoom in to location
  google.maps.event.addListener(marker, 'click', function(event) {
    lat = this.getPosition().lat();
    lng = (this.getPosition().lng() + 12);
    var location = new google.maps.LatLng(lat, lng);
    
    // center and zoom in on location
    // move to left a few degreees for the content window
    
    smoothZoom(map, 6, map.getZoom()); // call smoothZoom, parameters map, final zoomLevel, and starting zoom level
    map.setCenter(location);
    openContentWindow();

  });
}

// the smooth zoom function
function smoothZoom (map, max, current) {
  if (current >= max) {
    return;
  } else {
    // recursive loop until zoom equals max
    var z = google.maps.event.addListener(map, 'zoom_changed', function(event){
      google.maps.event.removeListener(z);
      smoothZoom(map, max, current + 1);
    });
    setTimeout(function(){map.setZoom(current)}, 40); // 80ms is what I found to work well on my system -- it might not work well on all systems
  } 
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






