var db = require("../models");
var request = require('request');
var geocoder = require('google-geocoder');
var geo = geocoder({
  key: 'AIzaSyB5oSHlknjP327ijOqPIS-VAI7tLQUlL3U'
});

module.exports = function (app) {

  app.post('/api/submitVendor', function (req, res) {
    var data = req.body
    // Put data into the database through db
  })

  

    

    

  

  app.get("/api/geocode", function(req,res){
    geo.find(req.query.address, function (err, response) {
      res.json(response[0].location)    //an object {lat: something, lng: somethingElse} is returned
    })
  })

  // Get all examples
  app.get("/api/fullList", function (req, res) {
    request.get('test', {
      json: true
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
