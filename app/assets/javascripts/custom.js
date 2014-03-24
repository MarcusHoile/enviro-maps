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
    // If the user clicks a marker, show the details of that marker
    // in an info window.
    google.maps.event.addListener(markers[i], 'click', showInfoWindow);
    // setTimeout(dropMarker(i), i * 100);
    // addResult(results[i], i);
  }
}

// Get the details for the marker. Show the information in an info window,
// anchored on the marker that the user selected.
function showInfoWindow() {
  var marker = this;
  
  infowindow.open(map, marker);
  
  // places.getDetails({reference: marker.placeResult.reference},
  //   function(place, status) {
  //     if (status != google.maps.places.PlacesServiceStatus.OK) {
  //       return;
  //     }
  //     infowindow.open(map, marker);
  //     buildIWContent(marker);
  //   });
}

function buildIWContent(marker) {
  document.getElementById('iw-url').innerHTML = '<b><a href="' + marker.url +
  '">' + marker.organisation + '</a></b>';
  document.getElementById('iw-description').textContent = marker.description;
  document.getElementById('iw-title').textContent = marker.title;
}



