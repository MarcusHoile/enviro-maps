var mapCanvas;
var map;
var markers =[];
var mapCanvasForm;
var lat;
var lng;
var contentWindow;
var maxZoom;
var lastClicked;
var data;
var imageTest;
var markerImages;
var markerTags;
var autocomplete;
var icon = "/assets/radial-red-25.png"
var bullseye = "/assets/bullseye.png"
var search;
var carousel;

function initialize() {
  // set up default map options, and jquery selectors
  lat = 20;
  lng = 60;
  mapCanvas = document.getElementById("map-canvas");
  var maxZoom = 2;
  contentWindow = $('#content-window');
  markerImages = $('#marker-images');
  markerTags = $('#marker-tags');
  // setup carousel
  carousel = $('#carousel');
  // var next = $('#next').on('click', slideLeft);
  // var previous = $('#previous').on('click', slideRight);

  // set zoom controls
  $('#zoom-out').on('click', function(){
    var zoom = map.getZoom()
    map.setZoom(zoom - 1);
  });
  $('#zoom-in').on('click', function(){
    var zoom = map.getZoom()
    map.setZoom(zoom + 1);
  });
  search = $('#search');
  $('span').on('click', function(){
    resetMap(map, maxZoom, map.getZoom());
    contentWindow.toggleClass('slideInRight slideOutRight');
  });

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
        { "color": "#00ADEF" },
        { "weight": 0.3 }
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
  },  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      { "visibility": "off" }
    ]
  }, {
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
  },{
    "featureType": "administrative.country",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "elementType": "labels",
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
      resetMap(map, maxZoom, map.getZoom()); 
    }
  });
  // add reset zoom function to nav bar button
  $('#reset-map').on('click', function(event) {
    event.preventDefault();
    if (contentWindow.hasClass('slideInRight')){
      contentWindow.toggleClass('slideInRight slideOutRight');
      resetMap(map, maxZoom, map.getZoom()); 
    }
    resetMap(map, maxZoom, map.getZoom());
    if (markers.length > 0) {
      markers[0].setMap(null);
      markers = []; 
    }
    
  });

  // set the bounds of the map so that it stays in the browser
  // setBounds();

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
    var marker2 = new google.maps.Marker({position: event.latLng, map: map, icon: icon, draggable: true});
    markers.push(marker2);
    var location = event.latLng;
    getMarkerPosition(event);
    google.maps.event.addListener(marker2, 'dragend', function(event) {
      getMarkerPosition(event);
    });
  });

  addAutocomplete("form");

} // ---------- end of map form -------------

function addAutocomplete(type){
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
    {
      // types: ['(cities)'],
      
    });
  places = new google.maps.places.PlacesService(map);

  google.maps.event.addListener(autocomplete, 'place_changed', function(){
    if (type == "form") {
      addMarkerForm();
    } else {
      locatePlace();
    }
  });
}

function locatePlace() {
  if (markers.length > 0) {
    markers[0].setMap(null);
    markers = [];
  }

  var place = autocomplete.getPlace();
  map.panTo(place.geometry.location);
  smoothZoom(map, 6, map.getZoom());
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: bullseye
  });
  // store marker in array, update the latlng hidden values 
  markers.push(marker);
  
}

function addMarkerForm() {
  var place = autocomplete.getPlace();
  if (markers.length > 0) {
    markers[0].setMap(null);
    markers = [];
  }  

  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(5);
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: icon
    });
    // store marker in array, update the latlng hidden values 
    markers.push(marker);
    // getMarkerPosition(place.geometry.location);
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    $('#issue_lat').val(lat);
    $('#issue_lng').val(lng);
  } 

}

function getTags(issue){
  // clear any existing tags from page
  markerTags.empty();
  $.ajax({
    type: "GET",
    url: '/issues/' + issue.id,
    dataType: "JSON",
    success: function(tags) {
      $.each((tags), function(index, tag) {
        markerTags.append('<li>'+ tag + '</li>');
      });
      
    }
  }); 
}



function getImages(issue){
  // clear any existing images from page
  markerImages.empty();
  $.ajax({
    type: "GET",
    url: '/issues/' + issue.id + '/assets',
    dataType: "JSON",
    success: function(images) {
      $.each((images), function(index, image) {
        markerImages.append('<img class="marker-image-urls" src="'+ image + '">');
      });
      
    }
  });
}

function addContent(issue) {
  $('#marker-title').html(issue.title);
  $('#marker-description').html(issue.description);
  $('#marker-url').html('For more info and ways you can help visit <a href="' + issue.url + '">' + issue.organisation + '</a>');
  getImages(issue);
  getTags(issue);
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
  }
}

function createMarker(issue) {
  var location = new google.maps.LatLng(issue.lat, issue.lng);
  
  marker = new google.maps.Marker({
    map: map,
    position: location,
    icon: icon
  });
  // add listener for when user clicks a marker open content window with content

  // zoom in to location
  google.maps.event.addListener(marker, 'click', function(event) {
    // move to location left a few degreees for the content window
    lat = this.getPosition().lat();
    lng = (this.getPosition().lng() + 12);

    // check to see if any content windows are open
    contentWindow.toggleClass('slideInRight slideOutRight');
    if (contentWindow.css('display', 'none')){
      contentWindow.css('display', 'block');
    }
      
    
    // center and zoom in on location
    // check to see if animation has ended
    var location = new google.maps.LatLng(lat, lng);
    search.toggle();
    map.panTo(location);
    smoothZoom(map, 6, map.getZoom()); // call smoothZoom, parameters map, final zoomLevel, and starting zoom level
    
    // insert issue content to content window
    // check to see if content is already there ie if last clicked
    if (lastClicked != issue) {
      addContent(issue);
    }
    // store the marker that was clicked
    lastClicked = issue;
  });
} // ----------------- end of create marker ------------------------


function resetMap(map, maxZoom, current){
  if (current < maxZoom) {
    return;
  } else {
    // recursive loop until zoomed out
    var z = google.maps.event.addListener(map, 'zoom_changed', function(event){
      google.maps.event.removeListener(z);
      resetMap(map, maxZoom, current - 1);
    });
    setTimeout(function(){map.setZoom(current)}, 120); // 80ms is what I found to work well on my system -- it might not work well on all systems
  }
  if (current == maxZoom) {
    lastClicked = {};
    search.toggle();
    var center = new google.maps.LatLng(lat, lng);
    map.panTo(center);
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

// function slideLeft(){

//   // setup the initial values for the variables that are global
// carousel.style.marginLeft = 0;
// timer = null;
// timeDelay = 30;
// // distance for banners to get back to begin
//   // first check if at end point
//   // if (parseInt(carousel.style.marginLeft) < 0) {
//     // set an interval so slide smoothly
//     timer = setInterval(slider, timeDelay);
//     // have sliding in its own function so that you can stop interval
//     function slider() { 
//       // loop back to the beginning once you've hit the last banner 
//       if (parseInt(carousel.style.marginLeft) === 0) {
//         // need to stop current interval so this function doesnt run again.
//         clearInterval(timer);
//         // new function to reset the margin position
//         timer2 = setInterval(resetSlider, timeDelay);
//       } else {
//         var bannerPosition = parseInt(carousel.style.marginLeft);
//         var newBannerPosition = bannerPosition + 100;
//         carousel.style.marginLeft = newBannerPosition + "px";
//         // when the margin is divisible by banner width, stop interval
//         if ((parseInt(carousel.style.marginLeft) % imgWidth) === 0) {
//           clearInterval(timer);
//         }
//       }

//     }
// }






