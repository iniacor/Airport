import React from 'react';
import './flight.scss';

const Flight = props => {
  const { term, fltNo, status, name, logoUrl, airportName, localTime } = props;

  return (
    <tr className="table__body-row">
      <td>
        <span className={term === 'D' ? 'terminal blue' : 'terminal'}>{term}</span>
      </td>
      <td>{localTime}</td>
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
      <td>
        <span>Flight details</span>
      </td>
    </tr>
  );
};

export default Flight;
