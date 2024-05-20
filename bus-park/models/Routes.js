module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    route_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_stop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_stop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    distance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'routes',
    timestamps: false,
  });
  Route.associate = (models) => {
    Route.hasMany(models.Assignment, { foreignKey: 'route_id' });
  };
  return Route;
};
