const Sequelize = require('sequelize');

const sequelize = new Sequelize('Bus_park', 'postgres', '748596', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Импортируем модели
db.Bus = require('./Buses')(sequelize, Sequelize);
db.Driver = require('./Drivers')(sequelize, Sequelize);
db.Assignment = require('./Assignments')(sequelize, Sequelize);
db.Route = require('./Routes')(sequelize, Sequelize);

Object.keys(db)
  .forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

module.exports = db;
