// server/routes/items.js

const express = require('express');
const router = express.Router();

// In-memory database (replace with MongoDB for production)
let items = [];

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
  try {
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/items
// @desc    Add new item
// @access  Public
router.post('/', (req, res) => {
  const { name, price, quantity } = req.body;
  if (!name || !price || !quantity) {
    return res.status(400).json({ message: 'Please provide name, price, and quantity' });
  }

  const newItem = { id: items.length + 1, name, price, quantity };
  items.push(newItem);
  res.status(201).json(newItem);
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items.splice(index, 1);
  res.json({ message: 'Item deleted' });
});

module.exports = router;
