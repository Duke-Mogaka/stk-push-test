require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stkRoutes = require('./src/routes/stk.routes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', stkRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Daraja API Service' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});