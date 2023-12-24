import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    allWorks:[],
    loading:true,
    isUserLoggedIn: '',
    showNotify: false,
    notify: {
        status: false,
        message: ""
    }
};
export const fetchAllWorks = createAsyncThunk(
    'user/fetchAllWorks',
    async (token) => {
        const response = await axios.post("https://instawork-backend.vercel.app/work/works", {
            headers: { token }
        });
        return response.data
    }
)
export const fetchFilteredWorks = createAsyncThunk(
    'user/fetchFilteredWorks',
    async ({obj,sortBy,sortType,token}) => {
        const response = await axios.post("https://instawork-backend.vercel.app/work/getWorksByFilter", {
            data: { filterOBJECT: obj, sortBy, type: sortType },
            headers: { token }
          })
        return response.data
    }
)
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
        },
        setShowNotify: (state, action) => {
            state.showNotify = action.payload
        },
        setNotify: (state, action) => {
            state.notify = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAsync.fulfilled, (state, action) => {
                state.isUserLoggedIn = action.payload;
            })
            .addCase(fetchAllWorks.fulfilled, (state, action) => {
                if(action.payload.success){
                    state.allWorks = action.payload.works;
                    state.loading = false
                }else{
                    state.allWorks = [];
                }
            })
            .addCase(fetchAllWorks.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchFilteredWorks.fulfilled, (state, action) => {
                state.loading = false
                if(action.payload.success){
                    state.allWorks = action.payload.works;
                }else{
                    state.allWorks = [{
                        type:"null",
                        city:"null",
                        duration:"null",
                        startDate:"null",
                        endDate:"null",
                        salaryPeriod:"null",
                        salary:"null",
                        user:"null"
                    }];
                }
            })
            .addCase(fetchFilteredWorks.pending, (state) => {
                state.loading = true
            })
    },
})
export const { setIsLoggedIn, setShowNotify, setNotify } = authSlice.actions;

export const verifyUser = (state) => state.user.isUserLoggedIn;

export default authSlice.reducer;