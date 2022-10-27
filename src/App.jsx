import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import AirportBoard from './features/flights/components/airportBoard/AirportBoard';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AirportBoard />
    </BrowserRouter>
  </Provider>
);

export default App;
