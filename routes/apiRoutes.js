var db = require("../models");
var request = require('request');
var geocoder = require('google-geocoder');
var geo = geocoder({
  key: 'AIzaSyB5oSHlknjP327ijOqPIS-VAI7tLQUlL3U'
});

module.exports = function (app) {
  // api to retrive long and lat of an address
  app.get("/api/geocode", function (req, res) {
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
      .then(function (spotSelected) {
        res.json(spotSelected)
      })

  });

  // post to db (adds a parkingSpot, a lease, and an address
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
      { include: [db.lease, db.address] }).then(function (newSpot) {
        res.json(newSpot);
      });
  });

  app.get("/vendorConfirmation", function (req, res) {

  })


  app.post("/vendorInput", function (req, res) {   //this function is necessary to transfer input form data to the database

    //var new = req.body;

    db.parkingSpot.create({
      image_url: null,
      isAvailable: true,
      spot_description: null,
      lng: null,
      lat: null,
      lease: {
        first_name_leasor: req.body.aboutYourself.firstName,
        last_name_leasor: req.body.aboutYourself.lastName,
        from_date: req.body.leaseDetails.from,
        to_date: req.body.leaseDetails.to,
        pmt_freq: req.body.leaseDetails.paymentFrequency,
        price: req.body.leaseDetails.price

    },
    address: {
      address_type: "parkingSpot",
      unit: req.body.parkingSpotDetails.unit,
      street_number: req.body.parkingSpotDetails.streetNumber,
      street_name: req.body.parkingSpotDetails.streetName,
      street_dir: null,
      city: req.body.parkingSpotDetails.city,
      postal_code: req.body.parkingSpotDetails.postalCode
    }

    },
    {include: [db.lease,db.address]}).then(function (newSpot) {
      res.json(newSpot);
    });
  });



};
