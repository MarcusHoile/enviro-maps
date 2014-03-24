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
  var markers = gon.markers
  var markerObj = gon.marker
  var myLatlng = new google.maps.LatLng(markerObj.lat, markerObj.lng);

  // place single marker on the map
  // var marker = new google.maps.Marker({
  //   position: myLatlng,
  //   map: map,
  // });



  // on click of marker show custom content in infowindow
  // google.maps.event.addListener(marker, 'click', function() {
  //   infowindow.setContent(place.name + "<br><br><button>do something</button>");
  //   // infowindow.setContent();
  //   infowindow.open(map, this);
  // });

  // Create a marker on the map for each in markers 
  for (var i = 0; i < markers.length; i++) {
    markers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(markers[i].lat,markers[i].lng),
      map: map
    });
    // If the user clicks a hotel marker, show the details of that hotel
    // in an info window.
    // markers[i].placeResult = results[i];
    // google.maps.event.addListener(markers[i], 'click', showInfoWindow);
    // setTimeout(dropMarker(i), i * 100);
    // addResult(results[i], i);
  }
}



function dropMarker(i) {
  return function() {
    markers[i].setMap(map);
  };
}