// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Flight from '../flight/Flight';
// import NotFoundPage from '../notfound/NotFoundPage';
// import './flights-list.scss';

// const FlightsList = ({ searchList }) => {
//   const parseUrl = path => {
//     const url = new URL(`http://localhost:8080${path}`);
//     return {
//       searchFull: url.search,
//       pathname: url.pathname,
//       date: url.searchParams.get('date'),
//       search: url.searchParams.get('search') || '',
//     };
//   };
//   const url = parseUrl(useLocation().pathname.concat(useLocation().search));
//   const selectFlightData = url.pathname === '/departures' ? 'departure' : 'arrival';
//   console.log(searchList);

//   const flightList =
//     selectFlightData === 'departure'
//       ? searchList[selectFlightData].filter(flight => {
//           return [
//             flight.airline.en.name,
//             flight['airportToID.city_en'],
//             flight['carrierID.IATA']
//               ? `${flight['carrierID.IATA']}${flight.fltNo}`
//               : `${flight['carrierID.code']}${flight.fltNo}`,
//           ].find(prop => prop.toUpperCase().includes(url.search.toUpperCase()));
//         })
//       : searchList[selectFlightData].filter(flight => {
//           return [
//             flight.airline.en.name,
//             flight['airportFromID.city_en'],
//             flight['carrierID.IATA']
//               ? `${flight['carrierID.IATA']}${flight.fltNo}`
//               : `${flight['carrierID.code']}${flight.fltNo}`,
//           ].find(prop => prop.toUpperCase().includes(url.search.toUpperCase()));
//         });

//   return (
//     <>
//       {flightList.length !== 0 ? (
//         <tbody>
//           {flightList.map(flight => (
//             <Flight key={flight.ID} flightData={flight} flightTypeUrl={url.pathname} />
//           ))}
//         </tbody>
//       ) : (
//         <NotFoundPage />
//       )}
//     </>
//   );
// };
// export default FlightsList;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as flightsActions from '../../flight.actions';
import { flightsListSelector } from '../../flight.selectors';
import './flights-list.scss';
import Flight from '../flight/Flight';
import NotFoundPage from '../notfound/NotFoundPage';

import moment from 'moment';

const FlightsList = ({
  flightDataFetching,
  flights,
  calendarDate,
  searchText,
  pathname,
  status,
}) => {
  const date = moment(calendarDate).format('YYYY-MM-DD');
  const location = useLocation();

  const extractDataList = (flightsList, flightDirection) => {
    return flightsList.map(flight => {
      let flightData = {
        term: flight.term,
        fltNo: `${flight['carrierID.IATA']}${flight.fltNo}`,
        airportName: flight['airportToID.name_en'] || flight['airportFromID.name_en'],
        localTime: flight.timeDepSchedule,
        timeStatus: flight.timeTakeOfFact,
        status: flight.status,
        name: flight.airline.en.name,
        logoUrl: flight.airline.en.logoSmallName,
      };
      if (flightDirection === 'arrivals') {
        flightData = {
          ...flightData,
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

  if (!body[`${path}`].length) {
    return null;
  }

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

  return (
    <>
      {extractDataList(flightsForRender, status)}
      {/* {path === 'departure'
        ? flightsForRender.map(flight => (
            <tr key={flight.ID} className="table__body-row">
              <td>
                <span className={flight.term === 'D' ? 'terminal blue' : 'terminal'}>
                  {flight.term}
                </span>
              </td>
              <td>{moment(flight.timeDepShedule).format('H:mm')}</td>
              <td>{flight['airportToID.city_en']}</td>
              <td>Departed at {moment(flight.timeDepFact).format('H:mm')}</td>
              <td>
                <div className="airline">
                  <img
                    className="airline__logo"
                    src={flight.airline.en.logoName}
                    alt={flight.airline.en.name}
                  />{' '}
                  {flight.airline.en.name}
                </div>
              </td>
              <td>{flight.codeShareData[0].codeShare}</td>
            </tr>
          ))
        : flightsForRender.map(flight => (
            <tr key={flight.ID} className="table__body-row">
              <td>
                <span className={flight.term === 'D' ? 'terminal blue' : 'terminal'}>
                  {flight.term}
                </span>
              </td>
              <td>{moment(flight.timeArrShedule).format('H:mm')}</td>
              <td>{flight['airportFromID.city_en']}</td>
              <td>Landed {moment(flight.timeArrExpectCalc).format('H:mm')}</td>
              <td>
                <div className="airline">
                  <img
                    className="airline__logo"
                    src={flight.airline.en.logoName}
                    alt={flight.airline.en.name}
                  />{' '}
                  {flight.airline.en.name}
                </div>
              </td>
              <td>{flight.codeShareData[0].codeShare}</td>
            </tr>
          ))} */}
    </>
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
