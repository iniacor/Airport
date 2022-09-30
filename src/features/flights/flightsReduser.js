import { createReducer, createAction } from '@reduxjs/toolkit';

const initialState = {
  flightList: [],
};

export const getDepartureList = createAction('GET_DEPARTURE_LIST');
export const getArrivalList = createAction('GET_arrival_LIST');
export default createReducer(initialState, {
  [getDepartureList]: state => {},
  [getArrivalList]: state => {},
});
