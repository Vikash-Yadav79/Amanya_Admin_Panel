import React from 'react';
import { Grid, Paper, Typography, Box, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: '23rd Jul', uv: 126940, pv: 80000 },
  { name: '24th Jul', uv: 150000, pv: 82000 },
  { name: '25th Jul', uv: 130000, pv: 86000 },
  { name: '26th Jul', uv: 142000, pv: 89000 },
  { name: '27th Jul', uv: 170000, pv: 90000 },
];

const AttendanceDashboard = () => {
  const cardStyle = {
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '200px',
    borderRadius: '8px',
    color: 'white',
  };

  const verticalLine = {
    borderLeft: '2px solid rgba(255, 255, 255, 0.6)',
    height: '100%',
    margin: '0 10px',
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" gutterBottom>Today's Attendance Summary Date: July 27, 2024</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ ...cardStyle, backgroundColor: '#005e5d' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Registered Organizations</Typography>
              <IconButton color="inherit">
                <InfoIcon />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h2" sx={{ fontSize: '2rem' }}>726</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ ...cardStyle, backgroundColor: '#880e4f' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Registered Employees</Typography>
              <IconButton color="inherit">
                <InfoIcon />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h2" sx={{ fontSize: '2rem' }}>319107</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ ...cardStyle, backgroundColor: '#827717' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Present Today</Typography>
              <IconButton color="inherit">
                <InfoIcon />
              </IconButton>
            </Box>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography variant="h2" sx={{ fontSize: '2rem' }}>47899</Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>Out Today</Typography>
              <Typography variant="h2" sx={{ fontSize: '2rem' }}>17157</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ ...cardStyle, backgroundColor: '#d32f2f' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Total Registered Devices</Typography>
              <IconButton color="inherit">
                <InfoIcon />
              </IconButton>
            </Box>
            <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Box>
                <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>43514</Typography>
                <Typography variant="h6">Tablet</Typography>
                <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>40724</Typography>
                <Typography variant="h6">Desktop</Typography>
                <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>2790</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, height: '100%', borderRadius: '8px' }}>
            <Typography variant="h6">Real Time Attendance Activity</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, height: '100%', borderRadius: '8px' }}>
            <Typography variant="h6">Attendance Statistics - as on: July 26, 2024</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceDashboard;
