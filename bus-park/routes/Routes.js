const express = require('express');

const router = express.Router();
const db = require('../models');

// CREATE a route
router.post('/routes', async (req, res) => {
  try {
    const route = await db.Route.create(req.body);
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all routes
router.get('/routes', async (req, res) => {
  try {
    const routes = await db.Route.findAll();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single route
router.get('/routes/:id', async (req, res) => {
  try {
    const route = await db.Route.findByPk(req.params.id);
    if (route === null) {
      res.status(404).json({ message: 'Route not found' });
    } else {
      res.json(route);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a route
router.put('/routes/:id', async (req, res) => {
  try {
    const [updated] = await db.Route.update(req.body, {
      where: { route_id: req.params.id },
    });
    if (updated) {
      const updatedRoute = await db.Route.findByPk(req.params.id);
      res.status(200).json(updatedRoute);
    } else {
      res.status(404).json({ message: 'Route not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a route
router.delete('/routes/:id', async (req, res) => {
  try {
    const deleted = await db.Route.destroy({
      where: { route_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Route not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
