// import { configureStore } from '@reduxjs/toolkit';
// import flightsReducer from './features/flights/flightsSlice';

// const store = configureStore({
//   reducer: {
//     flights: flightsReducer,
//   },
// });
// export default store;

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import flightsReducer from './features/flights/flightsReduser';

const reducer = combineReducers({
  flights: flightsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
