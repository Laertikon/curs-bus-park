const express = require('express');

const router = express.Router();
const db = require('../models');

// CREATE a driver
router.post('/drivers', async (req, res) => {
  try {
    const driver = await db.Driver.create(req.body);
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all drivers
router.get('/drivers', async (req, res) => {
  try {
    const drivers = await db.Driver.findAll();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single driver
router.get('/drivers/:id', async (req, res) => {
  try {
    const driver = await db.Driver.findByPk(req.params.id);
    if (driver === null) {
      res.status(404).json({ message: 'Driver not found' });
    } else {
      res.json(driver);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a driver
router.put('/drivers/:id', async (req, res) => {
  try {
    const [updated] = await db.Driver.update(req.body, {
      where: { driver_id: req.params.id },
    });
    if (updated) {
      const updatedDriver = await db.Driver.findByPk(req.params.id);
      res.status(200).json(updatedDriver);
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a driver
router.delete('/drivers/:id', async (req, res) => {
  try {
    const deleted = await db.Driver.destroy({
      where: { driver_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET route для получения списка автомобилей по driver_id
router.get('/driver/:driverId/buses', async (req, res) => {
  try {
    // Найти все задания для данного водителя
    const assignments = await db.Assignment.findAll({
      where: { driver_id: req.params.driverId },
    });

    // Получить id всех автомобилей, связанных с найденными заданиями
    const busIds = assignments.map((assignment) => assignment.bus_id);

    // Найти все автомобили с использованием полученных id
    const buses = await db.Bus.findAll({
      where: { bus_id: busIds },
    });

    res.json(buses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
