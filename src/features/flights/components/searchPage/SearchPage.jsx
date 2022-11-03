import React from 'react';
import Header from '../header/Header';
import SearchFlightField from '../searchFlightField/SearchFlightField';
import FlightBoard from '../flightBoard/FlightBoard';
import './search-page.scss';

const SearchPage = () => {
  return (
    <>
      <Header />
      <main className="search-page">
        <SearchFlightField />
        <FlightBoard />
      </main>
    </>
  );
};

export default SearchPage;
