import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { addOneOrders, deleteAll } from './orderSlice';
import logo from '../../images/logo2.png';
import { updateOneUsers } from '../user/userSlice';

const StyledCard = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
  borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff3131',
  color: 'white',
  margin: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#a31616',
  },
}));

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#ff3131',
  fontFamily: 'Arial, sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
}));

const ConfirmationModal = styled(Card)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: '16px 32px 24px',
  textAlign: 'center',
  boxShadow: '0px 3px 5px rgba(0,0,0,0.3)',
});

const CompleteOrder = ({ allProduct }) => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.order.carts);
  const currentUser = useSelector((state) => state.user.currentUser);

  const getFormattedDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const [minDueDate, setMinDueDate] = useState(getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 4))));

  const [order, setOrder] = useState({
    userId: currentUser?.id || "",
    orderDate: new Date().toLocaleDateString('en-GB'),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString('en-GB'),
    street: currentUser?.street || "",
    city: currentUser?.city || "",
    numHouse: currentUser?.numHouse || "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOrder(prevOrder => ({
      ...prevOrder,
      street: currentUser?.street,
      city: currentUser?.city,
      numHouse: currentUser?.numHouse,
    }));
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder(prevOrder => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await updateUserAddress(order.userId, order.street, order.city, order.numHouse);
    
    const finishorder = {
      userId: order.userId,
      dueDate: order.dueDate,
      orderDate: order.orderDate,
      cart: carts,
    };
    await dispatch(addOneOrders(finishorder));

    setOpen(true);
    setTimeout(async () => {
      setOpen(false);
      await dispatch(deleteAll());
      allProduct();
    }, 3000);
  };

  const updateUserAddress = async (userId, street, city, numHouse) => {
    const updatedUser = {
      ...currentUser,
      street: street,
      city: city,
      numHouse: numHouse,
    };
    await dispatch(updateOneUsers({ id: userId, user: updatedUser }));
  }

  return (
    <StyledCard>
      <StyledTypography variant="h4">Order Summary</StyledTypography>
      <TextField
        label="Street"
        name="street"
        value={order.street}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="City"
        name="city"
        value={order.city}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="House Number"
        name="numHouse"
        value={order.numHouse}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Credit Card Number"
        name="creditCard"
        fullWidth
        margin="normal"
      />
      <Typography variant="body1">Order Date: {order.orderDate}</Typography>
      <TextField
        label="Due Date"
        type="date"
        name="dueDate"
        defaultValue={order.dueDate}
        onChange={handleInputChange}
        inputProps={{ min: minDueDate }}
        fullWidth
        margin="normal"
      />
      <CenteredBox>
        <StyledButton variant="contained" onClick={handleSubmit}>
          Place Order
        </StyledButton>
      </CenteredBox>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ConfirmationModal>
          <CardContent>
            <img src={logo} alt="Logo" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
            <Typography variant="h6" id="simple-modal-title">Your order has been received!</Typography>
            <Typography variant="body1" id="simple-modal-description">You are welcome to continue shopping with us...</Typography>
          </CardContent>
        </ConfirmationModal>
      </Modal>
    </StyledCard>
  );
};

export default CompleteOrder;