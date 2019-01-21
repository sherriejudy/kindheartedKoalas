module.exports = function(sequelize, DataTypes) {
  var address = sequelize.define("lease", {
    address_type: {
      type: DataTypes.ENUM,
      values: ['parkingSpot', 'account']
    },
    unit: {
      type: DataTypes.STRING
    },
    street_number: {
      type: DataTypes.INTEGER
    },
    street_name: {
      type: DataTypes.STRING
    },
    street_dir: {
      type: DataTypes.ENUM,
      values: ['N','E','S','W','NE','SE','SW','NW']
    },
    city: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING,
      validate: {
        len: [6]
      }
    }
    })
  

  address.associate = function(models) {
    address.belongsTo(models.parkingSpot, {
      foreignKey: {
        allowNull: false 
      }
    })
    address.belongsTo(models.lease, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return address;
};
