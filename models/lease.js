module.exports = function(sequelize, DataTypes) {
  var lease = sequelize.define("lease", {
    first_name_leasor: DataTypes.STRING,
    last_name_leasor: DataTypes.STRING, 
    from_date: DataTypes.DATE, 
    to_date: DataTypes.DATE,
    pmt_frq: {
      type: DataTypes.ENUM,
      values: ['12','52']
    },
    price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
      }
    
    })
  

  lease.associate = function(models) {
    lease.belongsTo(models.parkingSpot, {
      foreignKey: {
        allowNull: false 
      }
    })
  }
  return lease;
};
