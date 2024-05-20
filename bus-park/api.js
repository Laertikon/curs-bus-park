const express = require('express');
const app = express();
const sequelize = require('./database');

// Подключение роутов
const busesRouter = require('./routes/Buses');
const driversRouter = require('./routes/Drivers');
const routesRouter = require('./routes/Routes');
const assignmentsRouter = require('./routes/Assignments');

// Применение роутов к приложению
app.use(express.json()); // Для парсинга JSON-тела запросов

app.use('/api', busesRouter);
app.use('/api', driversRouter);
app.use('/api', routesRouter);
app.use('/api', assignmentsRouter);

// Проверка соединения с базой данных и запуск сервера
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Синхронизация моделей с базой данных (создание таблиц)
    await sequelize.sync({ alter: true });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
