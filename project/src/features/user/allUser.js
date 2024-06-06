import React, { useEffect } from 'react';
import { fetchAllUsers } from './userSlice';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';

const AllUser = () => {
  const users = useSelector((state) => state.user.arrUsers);
  const dispatch = useDispatch();

  const fetchAllUser = async () => {
    await dispatch(fetchAllUsers());
  };

  useEffect(() => {
    fetchAllUser();
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{
              minWidth: 275,
              border: '1px solid #ccc',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: '0.3s',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              }
            }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {user.name}
                </Typography>
                <Divider sx={{ backgroundColor: 'red', marginY: 1 }} />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Password: {user.password}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Telephone: {user.telephone}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Street: {user.street}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  City: {user.city}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  NumHouse: {user.numHouse}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllUser;
