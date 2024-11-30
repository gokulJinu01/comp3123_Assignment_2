// routes/employeeRoutes.js

const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require('../controllers/employeeController');
const auth = require('../middleware/auth'); // Authentication Middleware

// Apply authentication middleware to all routes
router.use(auth);

// Static Route (Defined Before Dynamic Routes)
router.get('/search', searchEmployees);

// Dynamic Routes
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

// CRUD Operations
router.post('/', createEmployee);
router.get('/', getAllEmployees);

module.exports = router;
