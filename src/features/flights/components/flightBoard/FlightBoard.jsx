import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';
import TypeSwitchers from '../typeSwitcher/TypeSwitchers';
import FlightsList from '../flightsList/FlightsList';
import './flight-board.scss';

const FlightBoard = () => {
  const [status, setStatus] = useState('departures');
  const { search, pathname } = useLocation();
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

  const getCurrentDate = () => moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');

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
      <TypeSwitchers searchPath={search} />
      <div className="flightboard__calendar">
        <div className="flightboard__calendar-date">
          <label htmlFor="search-date">{searchCalendarDate}</label>
          <div className="calendar-ico" id="search-date">
            <i className="fas fa-calendar-days"></i>
            <form className="event-form">
              <input
                role="textbox"
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
            aria-label="choose yesterday date schedule"
            role="generic"
            className={date === yesterday ? 'date date_active' : 'date'}
            onClick={onDayPicker}
            data-date={yesterday}
          >
            <div className="date__num">{prevDay}</div>
            <div className="date__title">Yesterday</div>
          </div>
          <div
            aria-label="choose today schedule"
            role="generic"
            className={date === today ? 'date date_active' : 'date'}
            onClick={onDayPicker}
            data-date={today}
          >
            <div className="date__num">{currentDay}</div>
            <div className="date__title">Today</div>
          </div>
          <div
            aria-label="choose tomorrow schedule"
            role="generic"
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
        <Route path="/" element={<Navigate to={`departures?date=${getCurrentDate()}`} replace />} />
        <Route
          path={location.pathname}
          element={
            <FlightsList
              calendarDate={date}
              searchText={searchText}
              pathname={pathname}
              status={status}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default FlightBoard;
