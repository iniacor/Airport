import { createSlice } from '@reduxjs/toolkit';

const flightsSlice = createSlice({
  name: 'flights',
  initialState: {
    flightsList: null,
  },
  reducers: {
    showFlightsList(state, action) {
      state.flightsList.push(action.payload);
    },
  },
});
export default flightsSlice.reducer;
export const { showFlightsList } = flightsSlice.actions;
