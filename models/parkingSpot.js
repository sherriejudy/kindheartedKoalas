module.exports = function(sequelize, DataTypes) {
  var ParkingSpot = sequelize.define("parkingSpot", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return ParkingSpot;
};
