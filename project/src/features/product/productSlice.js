import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import{updateProduct,addProduct,deleteProduct,fetchProduct,fetchproductbyId} from './productAPI'


const initialState = {
 products:[],
 
} 
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts', 
  async  (thunkAPI) => {
      const res = await fetchProduct()
      return res;
  },
)
export const fetchproductbyIds=createAsyncThunk(
  'products/fetchproductbyId', 
  async  (id,thunkAPI) => {
      const res = await fetchproductbyId(id)
      return res;
  },
)
export const deleteOneProducts = createAsyncThunk(
  'products/deleteOneProduct', 
  async  (id,thunkAPI) => {
      const res = await deleteProduct(id)
      return res;
  },
)

export const addOneProducts = createAsyncThunk(
  'products/addOneProduct', 
  async  (product, thunkAPI) => {
      const res = await addProduct(product)
      return res;
  },
)

export const updateOneProducts = createAsyncThunk(
  'products/updateOneProduct', 
  async  ({id,product}, thunkAPI) => {
      const res = await updateProduct(id,product)
      return res;
  },)





export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
    } ,

    extraReducers: (builder) => {

      builder.addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
          state.products = payload;
        
          console.log("state")
          console.log( state.products)
      })
      .addCase(deleteOneProducts.fulfilled, (state, { payload }) => {
        state.products =payload;
    })
      .addCase(addOneProducts.fulfilled, (state,{payload}) => {
           state.products.push(payload);

  })
     .addCase(updateOneProducts.fulfilled, (state,  { payload }) => {
      let index = state.products.findIndex(x => x.id === payload.id); // index = 1
      state.products.splice(index, 1, payload);             
         
})


  }
})
    export const {fetchAllProduct,addproduct,updeteproduct,deleteproduct } = productSlice.actions
    export default productSlice.reducer


  