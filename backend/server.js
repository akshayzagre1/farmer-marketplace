require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

connectDB();

// Enable CORS and JSON parsing for API requests.
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Farmer Marketplace API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
