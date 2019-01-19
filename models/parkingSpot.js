module.exports = function(sequelize, DataTypes) {
  var parkingSpot = sequelize.define("parkingSpot", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return parkingSpot;
};
