const express = require('express');

const router = express.Router();
const db = require('../models');

// CREATE a bus
router.post('/buses', async (req, res) => {
  try {
    const bus = await db.Bus.create(req.body);
    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all buses
router.get('/buses', async (req, res) => {
  try {
    const buses = await db.Bus.findAll();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single bus
router.get('/buses/:id', async (req, res) => {
  try {
    const bus = await db.Bus.findByPk(req.params.id);
    if (bus === null) {
      res.status(404).json({ message: 'Bus not found' });
    } else {
      res.json(bus);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a bus
router.put('/buses/:id', async (req, res) => {
  try {
    const [updated] = await db.Bus.update(req.body, {
      where: { bus_id: req.params.id },
    });
    if (updated) {
      const updatedBus = await db.Bus.findByPk(req.params.id);
      res.status(200).json(updatedBus);
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a bus
router.delete('/buses/:id', async (req, res) => {
  try {
    const deleted = await db.Bus.destroy({
      where: { bus_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
