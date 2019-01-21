module.exports = function(sequelize, DataTypes) {
  var parkingSpot = sequelize.define("parkingSpot", {
    image_url: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
    spot_desription: DataTypes.STRING
  });

  parkingSpot.associate = function(models){
    parkingSpot.hasOne(models.lease, {
      onDelete: 'cascade'
    })
    

  }

  
  return parkingSpot;
};
