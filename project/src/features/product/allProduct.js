import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneProducts, fetchAllProducts } from './productSlice';
import { addToCart } from '../order/orderSlice';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import { TextField, InputAdornment, Grid, MenuItem, Select, Snackbar, Alert } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import CardMedia from '@mui/material/CardMedia';

const AllProduct = ({ updatePro }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [addtocard1, setAddtocard1] = useState({
    product: {},
    amount: 1,
  });
  const [loginAlert, setLoginAlert] = useState(false);

  const fetchAllProduct = async () => {
    await dispatch(fetchAllProducts());
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const dell = async (id) => {
    await dispatch(deleteOneProducts(id));
  };

  const filteredProducts = products.filter((product) => {
    return (
      (product.name?.toLowerCase().includes(nameFilter.toLowerCase()) ||
        product.description?.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (!priceFilter || product.price >= parseFloat(priceFilter))
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const addtocrdall = async (p) => {
    if (!currentUser) {
      setLoginAlert(true);
      return;
    }
    const updatedCart = {
      ...addtocard1,
      product: p,
    };

    setAddtocard1(updatedCart);
    await dispatch(addToCart(updatedCart));
  };

  return (
    <>
      <Snackbar open={loginAlert} autoHideDuration={6000} onClose={() => setLoginAlert(false)}>
        <Alert onClose={() => setLoginAlert(false)} severity="warning" sx={{ width: '100%' }}>
          You must be logged in to add items to the cart.
        </Alert>
      </Snackbar>
      <div style={{ marginBottom: '20px' }}>
        <Box sx={{ mb: 3 }}></Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <TextField
            label="Filter by name or description"
            variant="outlined"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderWidth: '1px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff3131',
                },
              },
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#ff3131',
                },
              },
            }}
          />
          <TextField
            label="Filter by price"
            variant="outlined"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            InputProps={{
              startAdornment: priceFilter && (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderWidth: '1px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff3131',
                },
              },
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#ff3131',
                },
              },
            }}
          />
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            displayEmpty
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderWidth: '1px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff3131',
                },
              },
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#ff3131',
                },
              },
            }}
          >
            <MenuItem value="asc">Price: Low to High</MenuItem>
            <MenuItem value="desc">Price: High to Low</MenuItem>
          </Select>
        </Box>
        <br />
      </div>

      <Grid container spacing={2} justifyContent="center">
        {sortedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ width: '100%', boxShadow: 'lg' }}>
              <CardOverflow>
                <AspectRatio sx={{ minWidth: 200 }}>
                  <CardMedia
                    sx={{ height: 200, width: 'auto' }}
                    component="img"
                    image={"http://localhost:4000/" + product.imgUrl}
                    title={product.name}
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="body-xs" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography
                  level="title-lg"
                  sx={{ mt: 1, fontWeight: 'xl' }}
                  endDecorator={
                    <>
                      {product.isOnSale ? (
                        <Chip component="span" size="sm" variant="soft" color="success">
                          On sale!
                        </Chip>
                      ) : (
                        <></>
                      )}
                    </>
                  }
                >
                  {product.price} THB
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ mt: 1, fontWeight: 'lg', color: 'text.secondary', textAlign: 'left' }}
                >
                  {product.description}
                </Typography>
              </CardContent>
              <CardOverflow sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 2 }}>
                {currentUser?.id === 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                    <Button
                      variant="solid"
                      size="lg"
                      onClick={() => updatePro(product)}
                      sx={{
                        backgroundColor: '#ff3131',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#cc2828', 
                        },
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="solid"
                      size="lg"
                      onClick={() => dell(product.id)}
                      sx={{
                        backgroundColor: '#ff3131',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#cc2828', 
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                )}

                {currentUser?.id !== 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <Button
                      variant="solid"
                      size="lg"
                      onClick={() => addtocrdall(product)}
                      sx={{
                        backgroundColor: '#ff3131',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#cc2828', 
                        },
                      }}
                    >
                      Add to cart
                    </Button>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      defaultValue={1}
                      inputProps={{ min: 1, max: 100 }}
                      sx={{ width: '80px' }}
                      placeholder="Amount"
                      onChange={(e) =>
                        setAddtocard1((prevState) => ({
                          ...prevState,
                          amount: e.target.value,
                        }))
                      }
                    />
                  </Box>
                )}
              </CardOverflow>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AllProduct;
