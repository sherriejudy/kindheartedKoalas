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

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
