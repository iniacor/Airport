import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './features/flights/components/Header';
import SearchFlightField from './features/flights/components/SearchFlightField';

const App = () => (
  <Provider store={store}>
    <Header />
    {/* <SearchFlightField /> */}
  </Provider>
);

export default App;
