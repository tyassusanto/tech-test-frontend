import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "./apiClient";

export const createNewGate = createAsyncThunk(
  'gates/createNewGate',
  async (newGate, thunkAPI) => {
    try {
      const response = await apiClient.post('/gerbangs', newGate);
      return response.data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchGates = createAsyncThunk(
  'gates/fetchGates',
  async ({ search = '' } = {}, thunkAPI) => {
    try {
      let url = `/gerbangs`;
      if (search) {
        url += `?NamaGerbang=${encodeURIComponent(search)}`;
      }

      const response = await apiClient.get(url);
      return response.data.data.rows.rows; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchGateById = createAsyncThunk(
  'gates/fetchGateById',
  async (id, thunkAPI) => {
    try {
      const response = await apiClient.get(`/gerbangs?id=${id}`);
      return response.data.result[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateGate = createAsyncThunk(
  'gates/updateGate',
  async (updateData, thunkAPI) => {
    try {
      const response = await apiClient.put(`/gerbangs`, updateData);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteGateById = createAsyncThunk(
  'masterGate/deleteGateById',
  async ({ id, IdCabang }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete('/gerbangs/', {
        data: { id, IdCabang }
      });

      if (response.data?.status === true) {
        return response.data;
      } else {
        return rejectWithValue(response.data?.message || 'Gagal menghapus data');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

const masterGateSlice = createSlice({
  name: 'gates',
  initialState: {
    gates: [],
    gateDetail: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Gate
      .addCase(fetchGates.pending, (state) => { //Ketika Loading 
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGates.fulfilled, (state, action) => {
        state.loading = false;
        state.gates = action.payload;
      })
      .addCase(fetchGates.rejected, (state, action) => { // Ketika Gagal
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Gate By Id
      .addCase(fetchGateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGateById.fulfilled, (state, action) => {
        state.loading = false;
        state.gateDetail = action.payload;
      })
      .addCase(fetchGateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Category
      .addCase(createNewGate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewGate.fulfilled, (state, action) => {
        state.loading = false;
        state.gates.push(action.payload); // Tambah 1 data
      })
      .addCase(createNewGate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Gate
      .addCase(updateGate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGate.fulfilled, (state, action) => {
        state.loading = false;
        state.gateDetail = action.payload;
      })
      .addCase(updateGate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Gate
      .addCase(deleteGateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    builder.addCase(deleteGateById.fulfilled, (state, action) => {
      const { IdGerbang, IdCabang } = action.payload;

      state.gates = state.gates.filter(gate =>
        gate.id !== IdGerbang || gate.IdCabang !== IdCabang
      );
    })
      .addCase(deleteGateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export default masterGateSlice.reducer;