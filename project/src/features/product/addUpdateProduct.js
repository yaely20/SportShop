import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { addOneProducts, updateOneProducts } from "./productSlice";
import { Card, CardContent, Box, Button, TextField, Typography } from '@mui/material';
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

const AddUpdateProduct = ({ p, returnto }) => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState('');

  const [product, setProduct] = useState({
    name: p?.name || '',
    description: p?.description || '',
    content: p?.content || '',
    price: p?.price || '',
    company: p?.company || '',
    isOnSale: p?.isOnSale || '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!product.name) tempErrors.name = "Name is required.";
    if (!product.description) tempErrors.description = "Description is required.";
    if (!product.content) tempErrors.content = "Content is required.";
    if (!product.price) tempErrors.price = "Price is required.";
    if (isNaN(product.price)) tempErrors.price = "Price must be a number.";
    if (!product.company) tempErrors.company = "Company is required.";
    if (/[^a-zA-Z]/.test(product.company)) tempErrors.company = "Company must contain only letters.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevPro) => ({
      ...prevPro,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new window.FormData();
      formData.append('company', product.company);
      formData.append('price', product.price);
      formData.append('content', product.content);
      formData.append('description', product.description);
      formData.append('name', product.name);
      formData.append('image', imageFile);
      await dispatch(addOneProducts(formData));
      returnto();
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await dispatch(updateOneProducts({ "id": p.id, product }));
        returnto();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageName(file ? file.name : '');
  }

  return (
    <StyledCard>
      <CardContent>
        <StyledTypography variant="h6">{p ? 'Update Product' : 'Add new product'}</StyledTypography>
        <form>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={product.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              name="description"
              value={product.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              name="content"
              value={product.content}
              onChange={handleChange}
              error={!!errors.content}
              helperText={errors.content}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              name="price"
              value={product.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Company"
              variant="outlined"
              name="company"
              value={product.company}
              onChange={handleChange}
              error={!!errors.company}
              helperText={errors.company}
            />
          </Box>
          <CenteredBox>
            {!p ? (
              <>
                <Box mb={2} display="flex" alignItems="center">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: '#ff3131',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#a31616',
                      },
                      marginRight: 2,
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                  {imageName && (
                    <Typography variant="body2" color="textSecondary">
                      {imageName}
                    </Typography>
                  )}
                  <StyledButton onClick={handleSubmit}>Add</StyledButton>
                </Box>
              </>
            ) : (
              <StyledButton onClick={handleSubmitUpdate}>Update</StyledButton>
            )}
          </CenteredBox>
        </form>
      </CardContent>
    </StyledCard>
  );
};

export default AddUpdateProduct;
