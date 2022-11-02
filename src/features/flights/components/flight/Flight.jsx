import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './flight.scss';

const Flight = props => {
  const { term, fltNo, status, name, logoUrl, airportName, localTime, id } = props;
  const location = useLocation();

  return (
    <tr className="table__body-row">
      <td className="terminal-field ">
        <span className={term === 'D' ? 'terminal blue' : 'terminal'}>{term}</span>
      </td>
      <td className="time-field">{localTime}</td>
      <td className="way-field">
        <span>{airportName}</span>
      </td>
      <td className="terminal-field mobile-only  ">
        <span className={term === 'D' ? 'terminal blue' : 'terminal'}>{term}</span>
      </td>
      <td className="status-field">
        <span>{status}</span>
      </td>
      <td className="company-name">
        <div className="airline">
          <img className="airline__logo" src={logoUrl} alt={name} />
          <span>{name}</span>
        </div>
      </td>
      <td className="flight-field">
        <span>{`${fltNo}`}</span>
      </td>
      <td className="mobile-only company-name">
        <div className="airline">
          <img className="airline__logo" src={logoUrl} alt={name} />
          <span>{name}</span>
        </div>
      </td>
      <td className="details-field">
        <Link
          to={`${location.pathname}/${id}${location.search}`}
          className="details-field__link"
          role="link"
        >
          <span>Flight details</span>
        </Link>
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
