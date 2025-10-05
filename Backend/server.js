const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create express app
const app = express();

// ✅ Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Allow frontend requests from any origin
app.use(morgan('dev')); // Logs HTTP requests (useful in dev)
// 🔹 Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin/stats', require('./routes/statsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));



// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
