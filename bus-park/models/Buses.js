module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define('Bus', {
    bus_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registration_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'buses',
    timestamps: false,
  });

  Bus.associate = (models) => {
    Bus.hasMany(models.Assignment, { foreignKey: 'bus_id' });
  };

  return Bus;
};
