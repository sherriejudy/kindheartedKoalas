module.exports = function(sequelize, DataTypes) {
  var parkingSpot = sequelize.define("parkingSpot", {
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image_reference: DataTypes.STRING,
    rate_dollar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
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
