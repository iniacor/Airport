import React from 'react';
import PropTypes from 'prop-types';
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

Flight.propTypes = {
  term: PropTypes.string.isRequired,
  fltNo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  airportName: PropTypes.string.isRequired,
  localTime: PropTypes.string.isRequired,
};

export default Flight;
