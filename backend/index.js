// backend/index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend's origin
  credentials: true, // If you need to send cookies or authentication headers
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://rootuser:rootpass@mongodb:27017/assignment_db?authSource=admin';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

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
