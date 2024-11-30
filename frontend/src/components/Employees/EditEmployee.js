// src/components/Employees/EditEmployee.js

import React, { useState, useEffect, useContext } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Alert 
} from '@mui/material';
import api from '../../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function EditEmployee() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    salary: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { name, department, position, salary } = formData;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setFormData({
          name: res.data.name,
          department: res.data.department,
          position: res.data.position,
          salary: res.data.salary,
        });
      } catch (err) {
        setError('Failed to fetch employee data.');
      }
    };

    fetchEmployee();
    // eslint-disable-next-line
  }, [id]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/employees/${id}`, {
        name,
        department,
        position,
        salary: Number(salary),
      });
      setSuccess('Employee updated successfully!');
      setError('');
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update employee. Please try again.'
      );
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Employee
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
            Update Employee
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

export default EditEmployee;
