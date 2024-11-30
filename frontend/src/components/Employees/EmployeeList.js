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
  Link as MuiLink 
} from '@mui/material';
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

  const onChange = (e) =>
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });

  const onSearch = (e) => {
    e.preventDefault();
    searchEmployees();
  };

  const onReset = () => {
    setSearchParams({ department: '', position: '' });
    fetchEmployees();
  };

  const handleLogout = () => {
    logout();
    // Optionally, navigate to login page
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
      {error && <Alert severity="error">{error}</Alert>}
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
                mb: 2 
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
              <MuiLink 
                component={Link} 
                to={`/employees/edit/${employee._id}`} 
                variant="button" 
                color="primary" 
                sx={{ mr: 2 }}
              >
                Edit
              </MuiLink>
              {/* Implement Delete functionality if desired */}
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default EmployeeList;
