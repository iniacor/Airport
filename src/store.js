import { configureStore } from '@reduxjs/toolkit';
import flightsReducer from './features/flights/flightsSlice';

const store = configureStore({
  reducer: {
    flights: flightsReducer,
  },
});
export default store;
