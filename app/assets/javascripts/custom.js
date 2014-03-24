var mapCanvas;
var location;
var marker;
var map;
var places;
gon.markers;
var markers;

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
  createMarker();
}

function createMarker() {
  var  marker = gon.marker
  var myLatlng = new google.maps.LatLng(marker.lat, marker.lng);

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Uluru (Ayers Rock)'
  });











  // var results = gon.markers;
  // // marker = new google.maps.Marker({
  // //   map: map,
  // //   position: place.geometry.location
  // // });
  // // markers.push(marker);

  // // on click of marker show custom content in infowindow
  // google.maps.event.addListener(marker, 'click', function() {
  //   infowindow.setContent(place.name + "<br><br><button>do something</button>");
  //   // infowindow.setContent();
  //   infowindow.open(map, this);
  // });

  // // Create a marker on the map for each in markers 
  // for (var i = 0; i < results.length; i++) {
  //   var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
  //   var markerIcon = MARKER_PATH + markerLetter + '.png';
  //   // Use marker animation to drop the icons incrementally on the map.
  //   markers[i] = new google.maps.Marker({
  //     position: new google.maps.LatLng(3.589, 97.34699),
  //     animation: google.maps.Animation.DROP,
  //     icon: markerIcon
  //   });
  //   // If the user clicks a hotel marker, show the details of that hotel
  //   // in an info window.
  //   // markers[i].placeResult = results[i];
  //   // google.maps.event.addListener(markers[i], 'click', showInfoWindow);
  //   setTimeout(dropMarker(i), i * 100);
  //   // addResult(results[i], i);
  // }
}



function dropMarker(i) {
  return function() {
    markers[i].setMap(map);
  };
}