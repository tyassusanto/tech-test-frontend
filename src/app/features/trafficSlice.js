import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "./apiClient";

export const fetchTraffic = createAsyncThunk(
    'traffic/fetchTraffic',
    async ({ search } = {}, thunkAPI) => {
        try {
            const params = new URLSearchParams();
            if (search) params.append('tanggal', search);

            const url = `/lalins${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await apiClient.get(url);
            return response.data.data.rows.rows;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);


const trafficSlice = createSlice({
    name: 'traffic',
    initialState: {
        traffic: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All Traffic
            .addCase(fetchTraffic.pending, (state) => { //Ketika Loading 
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTraffic.fulfilled, (state, action) => {
                state.loading = false;
                state.traffic = action.payload;
            })
            .addCase(fetchTraffic.rejected, (state, action) => { // Ketika Gagal
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default trafficSlice.reducer;