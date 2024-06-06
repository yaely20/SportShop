import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteOneOrders, fetchAllOrders } from "./orderSlice";
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff3131',
  color: 'white',
  margin: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#a31616',
  },
  '&:disabled': {
    backgroundColor: '#e0e0e0',
    color: '#9e9e9e',
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

const SingleOrder = ({ p, allOrder }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isOrderDue, setIsOrderDue] = useState(false);
  const today = new Date();

  const parseDate = (dateString) => {
    if (!dateString) return new Date(0); 
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const orderDueDate = p ? parseDate(p.dueDate) : new Date(0);

  const fetchAllOrder = async () => {
    await dispatch(fetchAllOrders());
  };

  useEffect(() => {
    fetchAllOrder();
    setIsOrderDue(orderDueDate >= today);
  }, [orderDueDate, today]);

  const deleteOrder = async () => {
    await dispatch(deleteOneOrders(parseInt(p.id)));
    allOrder()
  };

  return (
    <StyledCard>
      <CardContent>
        <StyledTypography variant="h6">{`Order #${p.id}`}</StyledTypography>
        <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
          Order Date: {p.orderDate}
        </Typography>
        <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
          Due Date: {p.dueDate}
        </Typography>
        <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
          User ID: {p.userId}
        </Typography>
        <Box
          sx={{
            bgcolor: 'background.level1',
            borderRadius: 'sm',
            p: 1.5,
            my: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography level="body-xs" fontWeight="lg">
            Products:
          </Typography>
          {p.cart.map((item) => (
            <Typography key={item.id} level="body-sm">
              {item.product.name}
            </Typography>
          ))}
        </Box>
        <CenteredBox>
          <StyledButton onClick={deleteOrder} disabled={!isOrderDue}>
            {isOrderDue ? 'Delete Order' : 'Order Not Due Yet'}
          </StyledButton>
        </CenteredBox>
      </CardContent>
    </StyledCard>
  );
}

export default SingleOrder;
