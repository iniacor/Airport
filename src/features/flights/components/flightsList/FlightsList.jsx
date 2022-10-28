import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as flightsActions from '../../flight.actions';
import { flightsListSelector } from '../../flight.selectors';
import './flights-list.scss';
import Flight from '../flight/Flight';

const FlightsList = ({
  flightDataFetching,
  flights,
  calendarDate,
  searchText,
  pathname,
  status,
}) => {
  const date = moment(calendarDate).format('DD-MM-YYYY');

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
    flightDataFetching(date);
  }, [date]);

  if (!flights) {
    return [];
  }
  const { body } = flights;
  const path = pathname.slice(1, -1);

  const filterFlightsList = (flightsList, searchText) => {
    if (!searchText) return flightsList;
    return flightsList.filter(flight => {
      const fltNo = `${flight['carrierID.IATA']}${flight.fltNo}`;
      const airportName = `${flight['airportToID.name_en']} || ${flight['airportFromID.name_en']}`;
      const airlineName = `${flight.airline.en.name}`;
      return (
        fltNo.toLowerCase().includes(searchText.toLowerCase()) ||
        airportName.toLowerCase().includes(searchText.toLowerCase()) ||
        airlineName.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  const flightsForRender = filterFlightsList(body[`${path}`], searchText);

  if (flightsForRender.length === 0) {
    return <div className="nothing-found-msg">No Flight</div>;
  }
  return (
    <div className="flights-table">
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

const mapState = state => {
  return {
    flights: flightsListSelector(state),
  };
};

const mapDispatch = {
  flightDataFetching: flightsActions.fetchFlightsList,
};

export default connect(mapState, mapDispatch)(FlightsList);
