import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card, CardContent, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { deleteFromCart } from './orderSlice'

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
}));

const ProductCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
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

const RemoveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff3131',
  color: 'white',
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#a31616',
  },
}));

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const ShoppingCart = ({ returnToShop, completeOrder }) => {
  const carts = useSelector((state) => state.order.carts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalAmount = carts?.reduce((acc, item) => acc + parseInt(item.amount), 0) || 0;
  const totalPrice = carts?.reduce((acc, item) => acc + item.product.price * item.amount, 0) || 0;
  const deletefromcrt = async (id) => {
    await dispatch(deleteFromCart(id))
  }

  return (
    <StyledCard>
      <CardContent>
        {carts && carts.length > 0 ? (
          carts.map((item, index) => (
            <ProductCard key={index}>
              <CardContent>
                <Typography variant="h6">{item.product.name}</Typography>
                <Typography variant="body1">{item.product.description}</Typography>
                <Typography variant="body2">Price: {item.product.price} THB</Typography>
                <Typography variant="body2">Quantity: {item.amount}</Typography>
                <Typography variant="body2">Total: {item.product.price * item.amount} THB</Typography>
                <RemoveButton onClick={() => dispatch(deleteFromCart(item.product.id))}>
                  Remove from cart
                </RemoveButton>
              </CardContent>
            </ProductCard>
          ))
        ) : (
          <Typography variant="h6">Your cart is empty</Typography>
        )}
        <Box mt={2}>
          <Typography variant="h6">Total Items in Cart: {totalAmount}</Typography>
          <Typography variant="h6">Total Price: {totalPrice} THB</Typography>
        </Box>
        <CenteredBox>
          <StyledButton onClick={completeOrder} disabled={carts.length === 0}>
            Checkout
          </StyledButton>
          <StyledButton onClick={returnToShop}>Continue Shopping</StyledButton>
        </CenteredBox>
      </CardContent>
    </StyledCard>
  );
};

export default ShoppingCart;
