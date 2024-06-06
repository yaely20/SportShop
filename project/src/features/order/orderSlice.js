import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllOrder, updateOneOrder, addOneOrder, deleteOneOrder } from './OrderAPI';

const initialState = {
  carts: [],
  orders: [],
};

export const fetchAllOrders = createAsyncThunk(
  'Orders/fetchAllOrder',
  async (thunkAPI) => {
    const res = await fetchAllOrder();
    return res;
  }
);

export const deleteOneOrders = createAsyncThunk(
  'orders/deleteOneOrder',
  async (id, thunkAPI) => {
    const res = await deleteOneOrder(id);
    return res;
  }
);

export const addOneOrders = createAsyncThunk(
  'orders/addOneOrder',
  async (order, thunkAPI) => {
    const res = await addOneOrder(order);
    return res;
  }
);

export const updateOneOrders = createAsyncThunk(
  'Orders/updateOneOrders',
  async (thunkAPI) => {
    const res = await updateOneOrder();
    return res;
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.carts.find(item => item.product.id === action.payload.product.id);
      if (existingItem) {
        existingItem.amount += action.payload.amount;
      } else {
        state.carts.push(action.payload);
      }
    },
    deleteFromCart: (state, action) => {
      state.carts = state.carts.filter(item => item.product.id !== action.payload);
    },
    deleteAll: (state) => {
      state.carts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOneOrders.fulfilled, (state, { payload }) => {
        state.orders.push(payload);
      })
      .addCase(updateOneOrders.fulfilled, (state, { payload }) => {
        let index = state.orders.findIndex(x => x.id === payload.id);
        state.orders.splice(index, 1, payload);
      })
      .addCase(fetchAllOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
      })
      .addCase(deleteOneOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
      });
  },
});

export const { addToCart, deleteFromCart, deleteAll } = orderSlice.actions;
export default orderSlice.reducer;
