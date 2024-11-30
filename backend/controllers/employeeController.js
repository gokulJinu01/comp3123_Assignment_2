const Employee = require('../models/Employee');

// Create Employee
exports.createEmployee = async (req, res) => {
  const { name, department, position, salary } = req.body;

  try {
    const employee = new Employee({
      name,
      department,
      position,
      salary,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error('Create Employee Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Get All Employees Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Single Employee
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Get Employee Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, department, position, salary } = req.body;

  try {
    let employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.department = department || employee.department;
    employee.position = position || employee.position;
    employee.salary = salary || employee.salary;

    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error('Update Employee Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete Employee Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search Employees
exports.searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;

    // Validate that at least one search parameter is provided
    if (!department && !position) {
      return res.status(400).json({ message: 'Please provide at least one search parameter.' });
    }

    // Build search criteria based on provided query parameters
    let criteria = {};
    if (department) {
      criteria.department = { $regex: new RegExp(department, 'i') }; // Case-insensitive search
    }
    if (position) {
      criteria.position = { $regex: new RegExp(position, 'i') };
    }

    const employees = await Employee.find(criteria);

    res.status(200).json(employees);
  } catch (error) {
    console.error('Search Employees Error:', error);
    res.status(500).json({ message: 'Server error while searching for employees.' });
  }
};


