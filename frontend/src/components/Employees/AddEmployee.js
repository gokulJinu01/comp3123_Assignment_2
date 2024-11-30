// src/components/Employees/AddEmployee.js

import React, { useState, useContext } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Alert 
} from '@mui/material';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function AddEmployee() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    salary: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { name, department, position, salary } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/employees', {
        name,
        department,
        position,
        salary: Number(salary),
      });
      setSuccess('Employee added successfully!');
      setError('');
      setFormData({ name: '', department: '', position: '', salary: '' });
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to add employee. Please try again.'
      );
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Employee
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Department"
            name="department"
            value={department}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Position"
            name="position"
            value={position}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={salary}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            Add Employee
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button component={Link} to="/employees" variant="outlined" fullWidth>
            Back to Employee List
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddEmployee;
