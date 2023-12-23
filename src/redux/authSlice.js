import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    isUserLoggedIn:''
};

export const fetchUserAsync = createAsyncThunk(
    'user/fetchuser',
    async (token) => {
        const response = await axios.post("https://instawork-backend.vercel.app/user/validateUser", {
            data: { token }
        });
        // The value we return becomes the `fulfilled` action payload
        
        return response.data.success;
    }
    
);

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserAsync.fulfilled, (state, action) => {
            state.isUserLoggedIn = action.payload;
          });
      },
})
export const { setIsLoggedIn } = authSlice.actions;

export const verifyUser = (state) => state.user.isUserLoggedIn;

export default authSlice.reducer;