module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    assignment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_assigned: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'assignments',
    timestamps: false,
  });

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.Bus, { foreignKey: 'bus_id' });
    Assignment.belongsTo(models.Driver, { foreignKey: 'driver_id' });
    Assignment.belongsTo(models.Route, { foreignKey: 'route_id' });
  };

  return Assignment;
};
