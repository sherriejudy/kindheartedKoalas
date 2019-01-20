module.exports = function(sequelize, DataTypes) {
  var lease = sequelize.define("lease", {
    first_name_leasor: DataTypes.STRING,
    last_name_leasor: DataTypes.STRING, 
    from_date: DataTypes.DATE, 
    to_date: DataTypes.DATE,
    price: DataTypes.INTEGER, 
    rate: DataTypes.ENUM('Daily','Weekly', 'Monthly')
  });

  lease.associate = function(models) {
    lease.belongsTo(models.parkingSpot, {
      foreignKey: {
        allowNull: false 
      }
    })
  }
  return lease;
};
