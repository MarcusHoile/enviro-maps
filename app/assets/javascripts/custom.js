var mapCanvas;
var map;
var markers =[];
var mapCanvasForm;
var lat;
var lng;
var contentWindow;
var maxZoom;
// var issue = gon.issue;
var data;
var imageTest;

function initialize() {
  // set up default map options, and jquery selectors
  lat = 20;
  lng = 60;
  mapCanvas = document.getElementById("map-canvas");
  var maxZoom = 2;
  contentWindow = $('#content-window');


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
      "featureType": "landscape",
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
    "featureType": "administrative.province",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.neighborhood",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.land_parcel",
    "stylers": [
      { "visibility": "off" }
    ]
    },{
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#0A1C28" },
      { "visibility": "on" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "color": "#0A1C28" }
    ]
  }, {
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
  }
  ];

  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: maxZoom,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
    styles: styles
  };

  // create a map
  map = new google.maps.Map(mapCanvas,
    mapOptions);

  // add listener for any zoom changes and set max zoom
  google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.getZoom() < maxZoom) map.setZoom(maxZoom);
  });

  // add listener for any content window open, if click anywhere outside window it closes
  google.maps.event.addListener(map, 'click', function() {
    if (contentWindow.hasClass('slideInRight')){
      contentWindow.toggleClass('slideInRight slideOutRight');
      resetZoom(map, maxZoom, map.getZoom());
    }
  });

  // add reset zoom function to nav bar button
  $('#reset-zoom').on('click', function() {
    resetZoom(map, maxZoom, map.getZoom());
  })
} // ------------------ end of Initialize --------------------


function setBounds() {
   // Bounds is the whole world
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
} // --------------- end of Set Bounds ------------------


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
} // ---------- end of map form -------------

function getImages(issue){
    var params = '{"field1": "value1", "field2: "value2"}'; 
    $.get('/controller/bar', params, function(data){ 
      alert(data); 
    });

    
  $.ajax({
    type: "GET",
    url: '/issues/' + issue.id + '/assets',
    dataType: "JSON",
    success: function(images) {
    
      _.each(images, function(image){
        console.log(image);
      });
      // $.each((images), function(index, image) {
      //   console.log(image);
      //   // $('#marker-images').append('<div>' + image.url + '</div>')
      //   imageTest = image;
      // });
      
    }
  });
}

function addContent(issue) {
  $('#marker-title').html(issue.title);
  $('#marker-description').html(issue.description);
  $('#marker-url').html('For more info and ways you can help visit <a href="' + issue.url + '">' + issue.organisation + '</a>');
  console.log('this is add content' + issue.id);
  getImages(issue);
}

function openContentWindow() {
  contentWindow.toggleClass('slideInRight slideOutRight');
  contentWindow.css('display', 'block');
}


function getMarkerPosition(event){
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
    console.log(issues[i]);
  }
}

function createMarker(issue) {
  var location = new google.maps.LatLng(issue.lat, issue.lng);
  marker = new google.maps.Marker({
    map: map,
    position: location,
    icon: "/assets/radial-blue-20.png"
  });
  // add listener for when user clicks a marker open content window with content
  // zoom in to location
  google.maps.event.addListener(marker, 'click', function(event) {
    // move to location left a few degreees for the content window
    lat = this.getPosition().lat();
    lng = (this.getPosition().lng() + 12);
    var location = new google.maps.LatLng(lat, lng);
    // center and zoom in on location
    openContentWindow();
    smoothZoom(map, 6, map.getZoom()); // call smoothZoom, parameters map, final zoomLevel, and starting zoom level
    map.setCenter(location);
    // insert issue content to content window
    console.log('this is create marker' + issue);
    addContent(issue);
  });
} // ----------------- end of create marker ------------------------


function resetZoom(map, maxZoom, current){
  if (current < maxZoom) {
    return;
  } else {
    // recursive loop until zoomed out
    var z = google.maps.event.addListener(map, 'zoom_changed', function(event){
      google.maps.event.removeListener(z);
      resetZoom(map, maxZoom, current - 1);
    });
    setTimeout(function(){map.setZoom(current)}, 120); // 80ms is what I found to work well on my system -- it might not work well on all systems
  } 
}


function smoothZoom (map, max, current) {
  if (current >= max) {
    return;
  } else {
    // recursive loop until zoom equals max
    var z = google.maps.event.addListener(map, 'zoom_changed', function(event){
      google.maps.event.removeListener(z);
      smoothZoom(map, max, current + 1);
    });
    setTimeout(function(){map.setZoom(current)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
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
}






