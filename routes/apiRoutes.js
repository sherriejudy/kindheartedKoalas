var db = require("../models");
var request = require('request');
var geocoder = require('google-geocoder');
var geo = geocoder({
  key: 'AIzaSyB5oSHlknjP327ijOqPIS-VAI7tLQUlL3U'
});

module.exports = function (app) {
  // api to retrive long and lat of an address
  app.get("/api/geocode", function(req,res){
    geo.find(req.query.address, function (err, response) {
      res.json(response[0].location)    //an object {lat: something, lng: somethingElse} is returned
    })
  })

  // Get a specific parking spot 
  app.get("/api/findSpot/:id", function (req, res) {
    console.log(req.params.id)
    db.parkingSpot.findById(req.params.id, {
      include: [db.lease, db.address]
    })
    .then(function(spotSelected){
      res.json(spotSelected)
    })
    
  });

  // post to db (new vendor spot)
  app.post("/api/newSpot", function (req, res) {
    db.parkingSpot.create({
      image_url: req.body.imgUrl,
      isAvailable: req.body.isAvailable,
      spot_description: req.body.spotDescription,
      lng: req.body.longitude,
      lat: req.body.latitude,
      lease: {
        first_name_leasor: req.body.fn,
        last_name_leasor: req.body.ln,
        from_date: req.body.fromDate,
        to_date: req.body.toDate,
        pmt_freq: req.body.pmtFrq,
        price: req.body.price

    },
    address: {
      address_type: req.body.addressType,
      unit: req.body.unit,
      street_number: req.body.streetNumber,
      street_name: req.body.streetName,
      street_dir: req.body.streetDir,
      city: req.body.city,
      postal_code: req.body.postalCode
    }
      
    },
    {include: [db.lease,db.address]}).then(function (newSpot) {
      res.json(newSpot);
    });
  });

  
};
