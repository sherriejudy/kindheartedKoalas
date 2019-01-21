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

    parkingSpot.hasOne(models.address, {
      onDelete: 'cascade'
    })
    

  }

  
  return parkingSpot;
};
