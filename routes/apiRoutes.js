var db = require("../models");
var request = require('request');
var geocoder = require('google-geocoder');

module.exports = function (app) {


  function geocodeThis(address) { //address must be a string

    var geo = geocoder({
      key: process.env.GOOGLE_API_KEY
    });

    geo.find(, function (err, res) {
      return res[0].location;   //an object {lat: something, lng: somethingElse} is returned
    });

  }


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
