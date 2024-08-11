// server/server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001; // Change port number as needed

app.use(express.json());
app.use(cors());

// In-memory database (replace with MongoDB for production)
let items = [];

// Routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
