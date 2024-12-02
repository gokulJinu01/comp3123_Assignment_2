// src/components/Employees/EmployeeList.js

import React, { useEffect, useState, useContext } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Alert, 
  List, 
  ListItem, 
  ListItemText, 
  Link as MuiLink,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function EmployeeList() {
  const { logout } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    department: '',
    position: '',
  });
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch employees.');
      setLoading(false);
    }
  };

  // Search employees based on department and/or position
  const searchEmployees = async () => {
    setLoading(true);
    const { department, position } = searchParams;
    try {
      const res = await api.get('/employees/search', {
        params: {
          department,
          position,
        },
      });
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to search employees.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, []);

  // Handle input changes for search fields
  const onChange = (e) =>
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });

  // Handle search form submission
  const onSearch = (e) => {
    e.preventDefault();
    searchEmployees();
  };

  // Reset search fields and fetch all employees
  const onReset = () => {
    setSearchParams({ department: '', position: '' });
    fetchEmployees();
  };

  // Handle user logout
  const handleLogout = () => {
    logout();
    // Optionally, navigate to login page or show a message
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const handleDeleteDialogClose = () => {
    setEmployeeToDelete(null);
    setDeleteDialogOpen(false);
  };

  // Confirm deletion of employee
  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    try {
      await api.delete(`/employees/${employeeToDelete._id}`);
      // Remove deleted employee from the state
      setEmployees(employees.filter(emp => emp._id !== employeeToDelete._id));
      setSuccessMessage('Employee deleted successfully.');
      handleDeleteDialogClose();
    } catch (err) {
      setError('Failed to delete employee.');
      handleDeleteDialogClose();
    }
  };

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          mt: 4, 
          mb: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}
      >
        <Typography variant="h4">Employee List</Typography>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
      <Box component="form" onSubmit={onSearch} sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Department"
            name="department"
            value={searchParams.department}
            onChange={onChange}
            placeholder="Engineering"
            fullWidth
          />
          <TextField
            label="Position"
            name="position"
            value={searchParams.position}
            onChange={onChange}
            placeholder="Software Engineer"
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
          <Button type="button" variant="outlined" onClick={onReset}>
            Reset
          </Button>
        </Box>
      </Box>
      <Box sx={{ mb: 3 }}>
        <MuiLink component={Link} to="/employees/add" variant="button" color="primary">
          Add New Employee
        </MuiLink>
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {employees.map((employee) => (
            <ListItem 
              key={employee._id} 
              sx={{ 
                border: '1px solid #ccc', 
                borderRadius: '8px', 
                mb: 2,
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <ListItemText
                primary={<Typography variant="h6">{employee.name}</Typography>}
                secondary={
                  <>
                    <Typography>
                      <strong>Department:</strong> {employee.department}
                    </Typography>
                    <Typography>
                      <strong>Position:</strong> {employee.position}
                    </Typography>
                    <Typography>
                      <strong>Salary:</strong> ${employee.salary}
                    </Typography>
                  </>
                }
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <MuiLink 
                  component={Link} 
                  to={`/employees/edit/${employee._id}`} 
                  variant="button" 
                  color="primary" 
                >
                  Edit
                </MuiLink>
                <IconButton 
                  color="error" 
                  onClick={() => handleDeleteClick(employee)} 
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Employee</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {`Are you sure you want to delete ${employeeToDelete?.name}? This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EmployeeList;
