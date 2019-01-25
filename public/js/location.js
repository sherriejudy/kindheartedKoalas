function initMap() {
    // The location of toronto
  
    var toronto = {lat: 43.6532, lng: -79.3832};
    console.log(spots)
  
    // The map, centered at toronto 
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 12, center: toronto});
    // The marker
    console.log(spots.length)
    for (var i=0; i< spots.length; i++){
      var coords = spots[i]
      var latLng = new google.maps.LatLng(coords[0],coords[1]);
      var marker = new google.maps.Marker({
          position: latLng,
          map: map
    })
    }
  }