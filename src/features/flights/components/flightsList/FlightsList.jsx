import React, { useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlightsList } from '../../flightsSlice';
import './flights-list.scss';
import Flight from '../flight/Flight';

const FlightsList = ({ calendarDate, searchText, pathname, status }) => {
  const date = moment(calendarDate).format('DD-MM-YYYY');
  const { flightsList, fetchStatus, error } = useSelector(state => state.flights);
  const dispatch = useDispatch();

  const extractDataList = (flightsList, flightDirection) => {
    return flightsList.map(flight => {
      let flightData = {
        term: flight.term,
        fltNo: `${flight['carrierID.IATA']}${flight.fltNo}`,
        airportName: flight['airportToID.name_en'] || flight['airportFromID.name_en'],
        localTime: moment(flight.timeDepShedule).format('HH:mm'),
        timeStatus: flight.timeTakeOfFact,
        status: `Departed at ${moment(flight.timeTakeofFact).format('HH:mm')}`,
        name: flight.airline.en.name,
        logoUrl: flight.airline.en.logoSmallName,
      };
      if (flightDirection === 'arrivals') {
        flightData = {
          ...flightData,
          status: `Landed at ${moment(flight.timeStandFact).format('HH:mm')}`,
          timeStatus: flight.timeLandFact,
          localTime: moment(flight.timeStandCalc).format('HH:mm'),
        };
      }
      return <Flight key={flight.ID} {...flightData} />;
    });
  };

  useEffect(() => {
    dispatch(fetchFlightsList(date));
  }, [date]);

  if (!flightsList) {
    return [];
  }
  const { body } = flightsList;
  const path = pathname.slice(1, -1);

  function getUniqueFlightsList(arr) {
    const result = arr.reduce(
      (acc, el) => (acc.find(({ fltNo }) => el.fltNo == fltNo) || acc.push(el), acc),
      [],
    );
    return result;
  }

  const filterFlightsList = (flightsList, searchText) => {
    if (!searchText) return getUniqueFlightsList(flightsList);

    const searchFilterList = flightsList.filter(flight => {
      const fltNo = `${flight['carrierID.IATA']}${flight.fltNo}`;
      const airportName = `${flight['airportToID.name_en']} || ${flight['airportFromID.name_en']}`;
      const airlineName = `${flight.airline.en.name}`;
      return (
        fltNo.toLowerCase().includes(searchText.toLowerCase()) ||
        airportName.toLowerCase().includes(searchText.toLowerCase()) ||
        airlineName.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    return getUniqueFlightsList(searchFilterList);
  };

  const flightsForRender = filterFlightsList(body[`${path}`], searchText);

  if (flightsForRender.length === 0) {
    return <div className="nothing-found-msg">No Flight</div>;
  }
  return (
    <div className="flights-table">
      {fetchStatus === 'loading' && <span className="spinner"></span>}
      {error && <div className="error-msg">An error ocured: {error}</div>}
      <table className="table">
        <thead className="table__head">
          <tr className="table__head-row">
            <th>Terminal</th>
            <th>Local time</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Airline</th>
            <th>Flight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{extractDataList(flightsForRender, status)}</tbody>
      </table>
    </div>
  );
};

FlightsList.propTypes = {
  flightsList: PropTypes.object,
  searchText: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  calendarDate: PropTypes.string.isRequired,
};

FlightsList.defaultProps = {
  flightsList: null,
};

export default FlightsList;
