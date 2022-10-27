import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as flightsActions from '../../flight.actions';
import { flightsListSelector } from '../../flight.selectors';
import './flights-list.scss';
import Flight from '../flight/Flight';
import NotFoundPage from '../notfound/NotFoundPage';

const FlightsList = ({
  flightDataFetching,
  flights,
  calendarDate,
  searchText,
  pathname,
  status,
}) => {
  const date = moment(calendarDate).format('YYYY-MM-DD');

  const extractDataList = (flightsList, flightDirection) => {
    return flightsList.map(flight => {
      let flightData = {
        term: flight.term,
        fltNo: `${flight['carrierID.IATA']}${flight.fltNo}`,
        airportName: flight['airportToID.name_en'] || flight['airportFromID.name_en'],
        localTime: flight.timeDepSchedule,
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
          localTime: flight.timeToStand,
        };
      }
      return <Flight key={flight.ID} {...flightData} />;
    });
  };

  useEffect(() => {
    flightDataFetching(date);
  }, [date]);

  if (!flights) {
    return null;
  }
  const { body } = flights;
  const path = pathname.slice(1, -1);

  // if (!body[`${path}`].length) {
  //   return null;
  // }

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

  return <>{flightsForRender.length !== 0 ? extractDataList(flightsForRender, status) : null}</>;
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
