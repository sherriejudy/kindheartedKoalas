var db = require("../models");

module.exports = function (app) {
  // render html page that displays single listing 

  // render index page
  app.get("/", function(req,res) {
    res.render('index', {
      layout: 'main'
    })
  })

  // test map route
  app.get("/map", function (req, res) {
    res.render("maptest", {
      layout: 'mainmap'
    });
  });

  app.get("/parkingSpots", function (req, res) {
    db.parkingSpot.findAll({
      include: [db.address, db.lease]
    })
      .then(function (data) {
        res.render("spotListing", {
          parkingSpots: data
        });
      });
  });

  // individual spot listing 

  app.get("/findSpot/:id", function (req, res) {
    console.log(req.params.id)
    db.parkingSpot.findById(req.params.id, {
      include: [db.lease, db.address]
    })
      .then(function (parkingSpot) {
        res.render('spotDetail',
          { parkingSpot: parkingSpot,
          layout: 'mainmap' });
      });

  });

  // sell a parking spot 
  app.get("/sellaspot", function (req, res) {
    res.render("vendorInput");
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
    console.log('not found');
  });
}
