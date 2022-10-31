import React, { useState, useEffect } from 'react';
import { Route, Routes, NavLink, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';
import FlightsList from '../flightsList/FlightsList';
import Departure from '../../../../icons/Departure.svg';
import Arrivals from '../../../../icons/Arrivals.svg';
import './flight-board.scss';

const FlightBoard = () => {
  const [status, setStatus] = useState('departures');
  const location = useLocation();
  const departureClass = status === 'departures' ? 'flightboard__link_active' : '';
  const arrivalClass = status === 'arrivals' ? 'flightboard__link_active' : '';
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDay = moment(Date.now()).format('DD/MM');
  const nextDay = moment(Date.now()).add(1, 'day').format('DD/MM');
  const prevDay = moment(Date.now()).subtract(1, 'day').format('DD/MM');
  const yesterday = moment(Date.now()).subtract(1, 'day').format('YYYY-MM-DD');
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const tomorrow = moment(Date.now()).add(1, 'day').format('YYYY-MM-DD');

  const searchText = searchParams.get('search') || '';
  const date = searchParams.get('date') || '';
  const searchCalendarDate = moment(date).format('DD/MM');

  useEffect(() => {
    if (location.pathname.includes('arrivals')) {
      setStatus('arrivals');
    } else {
      setStatus('departures');
    }
  }, [location]);

  const calendarHandler = event => {
    if (event.target.value === '') {
      searchParams.delete('date');
    } else {
      searchParams.set('date', event.target.value);
    }
    setSearchParams(searchParams);
  };

  const onDayPicker = event => {
    const { dataset } = event.currentTarget;
    if (dataset.date === '') {
      searchParams.delete('date');
    } else {
      searchParams.set('date', dataset.date);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flightboard">
      <div className="type-switchers">
        <NavLink
          to={`/departures${location.search}`}
          className="type-switchers__link"
          activeClassName="active"
        >
          <Departure className="type-switchers__link-icon" />
          Departures
        </NavLink>
        <NavLink
          to={`/arrivals${location.search}`}
          className="type-switchers__link type-switchers__link_arrivals"
          activeClassName="active"
        >
          <Arrivals className="type-switchers__link-icon" />
          Arrivals
        </NavLink>
      </div>

      <div className="flightboard__calendar">
        <div className="flightboard__calendar-date">
          <label htmlFor="search-date">{searchCalendarDate}</label>
          <div className="calendar-ico" id="search-date">
            <i className="fas fa-calendar-days"></i>
            <form className="event-form">
              <input
                type="date"
                className="flightboard__calendar-input"
                name="calendar"
                onChange={calendarHandler}
                value={date}
              />
            </form>
          </div>
        </div>
        <div className="three-days">
          <div
            className={date === yesterday ? 'date date_active' : 'date'}
            onClick={onDayPicker}
            data-date={yesterday}
          >
            <div className="date__num">{prevDay}</div>
            <div className="date__title">Yesterday</div>
          </div>
          <div
            className={date === today ? 'date date_active' : 'date'}
            onClick={onDayPicker}
            data-date={today}
          >
            <div className="date__num">{currentDay}</div>
            <div className="date__title">Today</div>
          </div>
          <div
            className={date === tomorrow ? 'date date_active' : 'date'}
            onClick={onDayPicker}
            data-date={tomorrow}
          >
            <div className="date__num">{nextDay}</div>
            <div className="date__title">Tomorrow</div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to={`departures${location.search}`} replace />} />
        <Route
          path={location.pathname}
          element={
            <FlightsList
              calendarDate={date}
              searchText={searchText}
              pathname={location.pathname}
              status={status}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default FlightBoard;
