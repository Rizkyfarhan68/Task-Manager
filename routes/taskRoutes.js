const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks (dengan filter)
router.get('/', async (req, res) => {
  const filter = req.query.filter || ''; // nilai default kosong
  let query = {};

  if (filter) {
    query.status = filter;
  }

  const tasks = await Task.find(query).sort({ deadline: 1 });
  res.render('index', { tasks, filter }); // kirim tasks dan filter ke EJS
});

// GET form tambah task
router.get('/create', (req, res) => {
  res.render('create');
});

// POST tambah task
router.post('/create', async (req, res) => {
  await Task.create({
    title: req.body.title,
    deadline: req.body.deadline
  });
  res.redirect('/?alert=created');
});

// GET form edit
router.get('/edit/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.render('edit', { task });
});

// POST edit task
router.post('/edit/:id', async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    status: req.body.status,
    deadline: req.body.deadline
  });
  res.redirect('/?alert=updated');
});

// Hapus task
router.get('/delete/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/?alert=deleted');
});

module.exports = router;
