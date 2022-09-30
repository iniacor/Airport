/* eslint-disable no-underscore-dangle */
// import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import flightsReducer from './features/flights/flight.reducer';

// const reducer = combineReducers({
//   flights: flightsReducer,
// });

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// export default store;
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import flightsReducer from './features/flights/flightsReduser';

const mainReduser = combineReducers({
  flights: flightsReducer,
});

const store = configureStore({
  reducer: mainReduser,
});
export default store;
