import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
    'authentication/login',
    async (credentials, thunkAPI) => {
        try {
            const url = `${import.meta.env.VITE_BASE_URL}/auth/login`;
            const response = await axios.post(url, {
                username: credentials.username,
                password: credentials.password,
            });

            const { token } = response.data;

            localStorage.setItem('token', token);

            return response.data;
        } catch (error) {
            const status = error?.response?.status;
            const message = error?.response?.data?.message || "Login failed";
            return thunkAPI.rejectWithValue({ status, message });
        }
    }
);

const authenticationSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
        isLoggedOut: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedOut = true;
            localStorage.clear();
        },
        resetLogoutState: (state) => {
            state.isLoggedOut = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                state.isLoggedOut = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, resetLogoutState } = authenticationSlice.actions;
export default authenticationSlice.reducer;