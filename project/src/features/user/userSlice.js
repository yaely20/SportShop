import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { addOneUser, deleteOneUser, fetchUser, updateOneUser,login } from './userAPI'


const initialState = {
 currentUser:null,
 statusUser:false,
 arrUsers:[]
}

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUser', 
  async  (thunkAPI) => {
      const res = await fetchUser()
      return res;
  },)
 export const deleteOneUsers = createAsyncThunk(
      'users/deleteOneProduct', 
      async  (thunkAPI) => {
          const res = await deleteOneUser()
          return res;
      },)
     
        export const addOneUsers = createAsyncThunk(
          'users/addOneUsers', 
          async  (user, thunkAPI) => {
              const res = await addOneUser(user)
              return res;
          },)
          export const loginto = createAsyncThunk(
            'users/login', 
            async  (user ,thunkAPI) => {
                const res = await login(user)
                if(res.status==401)
                  return null;
                  else return res.data
            },)
            export const updateOneUsers = createAsyncThunk(
              'users/updateOneUser', 
              async  ({id,user}, thunkAPI) => {
                debugger
                  const res = await updateOneUser(id, user)
                  return res;
              },)
             

export const  userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {  
    logout:(state)=>{
      state.currentUser=null;
       state.statusUser=false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, { payload }) => {     
        state.arrUsers = payload;
        console.log(state.arrUsers)
    })
    .addCase(deleteOneUsers.fulfilled, (state,{ payload }) => {
        let index = state.arrUsers.findIndex(x => x.id ===payload);
        state.arrUser.splice(index, 1);
    })
    .addCase(addOneUsers.fulfilled, (state,{ payload }) => {
      debugger
        state.arrUsers.push(payload);
    })
    .addCase(loginto.fulfilled, (state,{ payload }) => {
      state.currentUser=payload
      state.statusUser=true
  })
  .addCase(updateOneUsers.fulfilled, (state, { payload }) => {
    debugger
    let index = state.arrUsers.findIndex(x => x.id === payload.id);
    if (index !== -1) {
      state.arrUsers.splice(index, 1, payload);
    } 
  })

}})

    export const {logout } = userSlice.actions
    export default userSlice.reducer
