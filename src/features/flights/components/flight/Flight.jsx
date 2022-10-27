import React from 'react';
import moment from 'moment';
import './flight.scss';

const Flight = props => {
  const { term, fltNo, status, name, logoUrl, airportName, localTime } = props;
  const timetable = moment(localTime).format('HH:mm');

  return (
    <tr className="table__body-row">
      <td>
        <span className={term === 'D' ? 'terminal blue' : 'terminal'}>{term}</span>
      </td>
      <td>{timetable}</td>
      <td>
        <span>{airportName}</span>
      </td>
      <td>
        <span>{status}</span>
      </td>
      <td>
        <div className="airline">
          <img className="airline__logo" src={logoUrl} alt={name} />
          <span>{name}</span>
        </div>
      </td>
      <td>
        <span>{`${fltNo}`}</span>
      </td>
      <td className="flight-details">
        <span>Flight details</span>
      </td>
    </tr>
  );
};

export default Flight;
