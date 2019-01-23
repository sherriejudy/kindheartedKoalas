function initMap() {
    // The location of toronto
  
    var toronto = {lat: 43.6532, lng: -79.3832};
  
    var spots = [
    [43.6532,-79.3832],
    [43.6820,-79.37266],
    [ 43.6830, -79.3730]
  ]
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 12, center: toronto});
    // The marker, positioned at Uluru
    for (var i=0; spots.length; i++){
      var coords = spots[i]
      var latLng = new google.maps.LatLng(coords[0],coords[1]);
      var marker = new google.maps.Marker({
          position: latLng,
          map: map
    })
    }
  }