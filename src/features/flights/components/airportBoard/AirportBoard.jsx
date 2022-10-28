import React, { useEffect } from 'react';
import Header from '../header/Header';
import SearchFlightField from '../searchFlightField/SearchFlightField';
import FlightBoard from '../flightBoard/FlightBoard';
import './search-flight.scss';

const AirportBoard = () => {
  return (
    <>
      <Header />
      <main className="search-flight">
        <SearchFlightField />
        <FlightBoard />
      </main>
    </>
  );
};

export default AirportBoard;
