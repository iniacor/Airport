import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';
import TypeSwitchers from '../typeSwitcher/TypeSwitchers';
import DatePicker from '../datePicker/DatePicker';
import FlightsList from '../flightsList/FlightsList';
import './flight-board.scss';

const FlightBoard = () => {
  const [status, setStatus] = useState('departures');
  const { search, pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get('search') || '';
  const date = searchParams.get('date') || '';

  const getCurrentDate = () => moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');

  useEffect(() => {
    if (location.pathname.includes('arrivals')) {
      setStatus('arrivals');
    } else {
      setStatus('departures');
    }
  }, [location]);

  return (
    <div className="flightboard">
      <TypeSwitchers searchPath={search} />
      <DatePicker />
      <Routes>
        <Route path="/" element={<Navigate to={`departures?date=${getCurrentDate()}`} replace />} />
        <Route
          path="/departures"
          element={
            <FlightsList
              calendarDate={date}
              searchText={searchText}
              pathname={pathname}
              status={status}
            />
          }
        ></Route>
        <Route
          path="/arrivals"
          element={
            <FlightsList
              calendarDate={date}
              searchText={searchText}
              pathname={pathname}
              status={status}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default FlightBoard;
