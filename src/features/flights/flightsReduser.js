import { SHOW_FLIGHTS_LIST } from './flight.actions';

const initialState = {
  flightsList: null,
};

export const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FLIGHTS_LIST:
      return {
        ...state,
        flightsList: action.payload.flightsData,
      };
    default:
      return state;
  }
};
export default flightsReducer;
