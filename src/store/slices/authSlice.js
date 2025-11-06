import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API endpoints
// const API_URL = "https://ecommerce.routemisr.com/api/v1/auth";
const API_URL = import.meta.env.VITE_API_URL;

// Register thunk
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            console.log("shaltout");
            
            const response = await axios.post(`${API_URL}/users/`, userData);
            console.log(response);
            localStorage.setItem("FirstName", response.data.first_name);
            return response.data;
            
        } catch (error) {
            console.log("error");
            console.log(error);
            return rejectWithValue(error);

        }
    }
);

// Login thunk
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/token/`, userData);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error);

        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("FirstName") || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.first_name;
                state.token = action.payload.access;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.response.data || "Register failed";
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.first_name;
                state.token = action.payload.access;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.response.data || "Login failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
