function initialize() {
  var lat = -25.3;
  var lng = 133.8;
  mapCanvas = document.getElementById("map-canvas");
  
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 4,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  };

  // add listener for checkboxes
  $('#filter').on('click', function(){
    types = [];
    $('input:checkbox[name=places]:checked').each(function(){types.push($(this).val())});
    
    showPlaces(types);
  });

  // create a map
  map = new google.maps.Map(mapCanvas,
    mapOptions);

  infowindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });


  places = new google.maps.places.PlacesService(map);

  // google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);

}