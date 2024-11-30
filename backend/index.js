require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

// Start the Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Gracefully handle termination signals
const gracefulShutdown = () => {
  server.close(() => {
    console.log('Express server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  });
};

process.on('SIGINT', gracefulShutdown).on('SIGTERM', gracefulShutdown);
