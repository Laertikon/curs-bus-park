module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    driver_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    license_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    tableName: 'drivers',
    timestamps: false,
  });

  Driver.associate = (models) => {
    Driver.hasMany(models.Assignment, { foreignKey: 'driver_id' });
  };

  return Driver;
};
