var mapCanvas;
var map;
var markers =[];
var infowindow;
var styles;
var mapCanvasForm

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
  // lat lng variables for this function only
  var lat;
  var lng;
  // adds listener for when a user marks a location for an issue
  google.maps.event.addListenerOnce(map, 'click', function(event) {   
    var marker2 = new google.maps.Marker({position: event.latLng, map: map});
    var location = event.latLng;
    console.log(event.latLng);
    lat = event.latLng.lat();
    lng = event.latLng.lng();
    $('#issue_lat').val(lat);
    $('#issue_lng').val(lng);
  });

  // // on submit post the form values, token and latlng to create action
  // form.submit(function() { 
  //   // grabs all the values from the form and the token
  //   var valuesToSubmit = $(this).serialize();
  //   // insert the lat and lng
  //   valuesToSubmit['issue']['lat'] = lat;
  //   valuesToSubmit['issue']['lng'] = lng;
  //   console.log(valuesToSubmit['issue']);
    
  //   $.ajax({
  //       type: "POST",
  //       url: $(this).attr('action'), //sumbits it to the given url of the form
  //       data: valuesToSubmit,
  //       dataType: "JSON" // you want a difference between normal and ajax-calls, and json is standard
  //   }).success(function(){
  //       alert("post successful");
  //   });
  //   return false; // prevents normal behaviour
  // });
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
    // icon: "<div id='icon'></div>"
  });
  // store all the markers in an array
  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("<div id='info-content'><h2>" + issue.title + "</h2><p>" + issue.description + "</p><a href='" + issue.url + "' target='_blank'>" + issue.organisation + "</a></div>");
    infowindow.open(map, this);
  });
}




