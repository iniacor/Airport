import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import './search-field.scss';

const SearchFlightField = () => {
  const [value, setValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = event => {
    setValue(event.target.value);
  };

  const onSearch = event => {
    event.preventDefault();
    let dataQuery = {
      search: value,
    };
    let pathname = '';
    if (location.pathname === '/') {
      pathname = '/departures?';
    } else {
      dataQuery = {
        ...dataQuery,
        ...qs.parse(location.search, { ignoreQueryPrefix: true }),
        search: value,
      };
      pathname = location.pathname + '?';
    }
    const queryString = qs.stringify(dataQuery);
    navigate(`${pathname}${queryString}`);
  };

  return (
    <div className="search-action">
      <h1 className="search-action__title">Search flight</h1>
      <form className="search-action__form" onSubmit={onSearch}>
        <i className="fas fa-search"></i>
        <input
          className="search-action__input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Airline, destination or flight #"
        />
        <button className="search-action__btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFlightField;
