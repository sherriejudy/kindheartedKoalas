

var map; // the actual map object
    var infoBubble; //the bubbles that will pop up when markers are clicked

    var request;
    var service;
    var markers = []; //array to be filled with marker objects created by the createMarker function

    function initialize() {
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
        })

    }

     function callback(results, status) {
         if(status == google.maps.places.PlacesServiceStatus.OK){ 
             for (var m = 0; m < results.length; m++){
                 markers.push(createMarker(results[m])); // fill the markers array with objects from createMarker, if the status of the results is OK
             }   
         }
     }


    function createMarker(place) { 
         var marker = new google.maps.Marker({ //creates the actual markers for placement on the map 
             map: map,
             position: place.geometry.location
         });

         google.maps.event.addListener(marker, 'click', function(){ //add a listener to each marker on creation so clicking on it will open an info bubble

            var isOpen; // a string set by this if-else based on google's "open_now" boolean in the "opening hours" key of the place object
                if (place.opening_hours.open_now == true) 
                {
                    isOpen = "Open now." // the message that will go in the info-bubble if the place is open
                }
                else 
                {
                    isOpen = "Closed now." // ditto, if closed
                }
            
            $("#coffee-destination").val(place.name + " (" + place.vicinity + ")"); //when the marker for a shop is clicked, the destination form input automatically fills with the name of the shop
            console.log(place.name + " selected.");

            var placeData = [place.name + ", </br>", place.vicinity + "</br>", isOpen]; // short array of data we want to show the user about the cafe when it's clicked
            infoBubble.setContent(placeData[0] + placeData[1] + placeData[2]); //set the bubble to show the cafe's name, address and open/closed status
            infoBubble.open(map, this);
            console.log(place);
            
         });
         return marker;
    }

    function createMyhalMarker(){ //function to set a unique marker for the myhal building at center of map

        var myhalMarker = new google.maps.Marker({
            position:{lat:43.660781,lng:-79.396785},
            map: map,
            icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' //a flag, instead of the standard marker icon
        });

        google.maps.event.addListener(myhalMarker, 'click', function(){ //add a listener to this marker on creation so clicking on it will open an info bubble

            infoBubble.setContent("Myhal Centre For Engineering</br> Innovation & Entrepreneruship, </br> 55 St. George St, Toronto ON"); //bubble hard-coded with name && address
            infoBubble.open(map, this);
        });
    }
   

    function clearResults(markers) { //clears the markers array for re-populating with new markers when a new center is set
         for (var m in markers) {
             markers[m].setMap(null)
         }
         markers = [];
     }


    initialize(); //function called on page load
    createMyhalMarker();