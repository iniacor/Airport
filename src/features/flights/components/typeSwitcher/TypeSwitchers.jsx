import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Departure from '../../../../icons/Departure.svg';
import Arrivals from '../../../../icons/Arrivals.svg';
import './type-switchers.scss';

const TypeSwitchers = ({ searchPath }) => {
  return (
    <div className="type-switchers">
      <NavLink
        to={`/departures${searchPath}`}
        className={({ isActive }) =>
          isActive ? 'type-switchers__link active' : 'type-switchers__link'
        }
        role="link"
      >
        <Departure className="type-switchers__link-icon" />
        <span className="type-switchers__link-text_dep">Departures</span>
      </NavLink>
      <NavLink
        to={`/arrivals${searchPath}`}
        className={({ isActive }) =>
          isActive
            ? 'type-switchers__link active type-switchers__link_arrivals'
            : 'type-switchers__link type-switchers__link_arrivals'
        }
        role="link"
      >
        <Arrivals className="type-switchers__link-icon" />
        <span className="type-switchers__link-text">Arrivals</span>
      </NavLink>
    </div>
  );
};

TypeSwitchers.propTypes = {
  searchPath: PropTypes.string.isRequired,
};

export default TypeSwitchers;
