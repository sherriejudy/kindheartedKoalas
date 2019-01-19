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

    rate_unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    
    
    
    DataTypes.STRING,
    availability: DataTypes.BOOLEAN,
    lease_terms: DataTypes.TEXT,
    spot_size: DataTypes.STRING

  });
  return parkingSpot;
};
