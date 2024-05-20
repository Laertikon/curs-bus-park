const express = require('express');

const router = express.Router();
const db = require('../models');

// CREATE an assignment
router.post('/assignments', async (req, res) => {
  try {
    const assignment = await db.Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all assignments
router.get('/assignments', async (req, res) => {
  try {
    const assignments = await db.Assignment.findAll();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single assignment
router.get('/assignments/:id', async (req, res) => {
  try {
    const assignment = await db.Assignment.findByPk(req.params.id);
    if (assignment === null) {
      res.status(404).json({ message: 'Assignment not found' });
    } else {
      res.json(assignment);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE an assignment
router.put('/assignments/:id', async (req, res) => {
  try {
    const [updated] = await db.Assignment.update(req.body, {
      where: { assignment_id: req.params.id },
    });
    if (updated) {
      const updatedAssignment = await db.Assignment.findByPk(req.params.id);
      res.status(200).json(updatedAssignment);
    } else {
      res.status(404).json({ message: 'Assignment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE an assignment
router.delete('/assignments/:id', async (req, res) => {
  try {
    const deleted = await db.Assignment.destroy({
      where: { assignment_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Assignment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/assignments-detail/:assignmentId', async (req, res) => {
  try {
    const assignment = await db.Assignment.findOne({
      where: { assignment_id: req.params.assignmentId },
      include: [
        { model: db.Bus },
        { model: db.Route },
        { model: db.Driver }
      ]
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
