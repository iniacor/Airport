import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://api.iev.aero/api/flights';

export const fetchFlightsList = createAsyncThunk(
  'flights/fetchFlightsList',
  async (date, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/${date}`);

      if (!response.ok) {
        throw new Error('ServerError!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const flightsSlice = createSlice({
  name: 'flights',
  initialState: {
    flightsList: null,
    fetchStatus: null,
    error: null,
  },
  extraReducers: {
    [fetchFlightsList.pending]: state => {
      state.fetchStatus = 'loading';
    },
    [fetchFlightsList.fulfilled]: (state, action) => {
      state.fetchStatus = 'resolved';
      state.flightsList = action.payload;
    },
    [fetchFlightsList.rejected]: (state, action) => {
      state.fetchStatus = 'rejected';
      state.error = action.payload;
    },
  },
});
export default flightsSlice.reducer;
