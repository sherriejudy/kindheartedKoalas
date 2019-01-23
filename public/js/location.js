$(document).ready(function(){

    var map; // the actual map object
        var infoBubble; //the bubbles that will pop up when markers are clicked

        var request;
        var service;
        var markers = []; //array to be filled with marker objects created by the createMarker function

        function initMap() {
            var center = new google.maps.LatLng(43.660781, -79.396785);
            map = new google.maps.Map(document.getElementById('coffee-map'), {
                center: center,
                zoom: 15
            });

            request = { //request object with key-values formatted as needed for a successful query to the google api
                location: center, //references our "center" var
                radius: 1000, //meter-radius in which we want it to retrieve data on places 
                types: ['cafe'] //string the api needs to look for coffee shops
            };

            infoBubble = new google.maps.InfoWindow();

            service = new google.maps.places.PlacesService(map); // 'Places' is google's service with all the data(names, addresses, etc) on.... places
        
            service.nearbySearch(request, callback); //nearbySearch is a method in the places library, which accepts our 'request' var as an argument here
        
            google.maps.event.addListener(map, 'rightclick', function(event) {
                map.setCenter(event.latLng)
                clearResults(markers);
                var newMarker = new google.maps.Marker({ //set a new flag icon wherever the center is moved to
                    position: event.latLng,
                    map: map,
                    icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                });

                var request = { 
                    location: event.latLng, //instead of the default center, location will be the lat && lng coords returns on the rightclick event
                    radius: 1000, 
                    types: ['cafe']
                };
                service.nearbySearch(request, callback);

                console.log(request);
                console.log(callback);
                console.log("working");
            })

        }

        function callback(results, status) {
            if(status == google.maps.places.PlacesServiceStatus.OK){ 
                for (var m = 0; m < results.length; m++){
                    markers.push(createMarker(results[m])); // fill the markers array with objects from createMarker, if the status of the results is OK
                }   
            }
        }



    
        
    

        


        

}); //end of docready function