import React from 'react';
import './header.scss';
import Logo from '../../../../icons/Logo.svg';

const Header = () => {
  return (
    <header className="header">
      <a className="logo-link">
        <Logo className={'logo-link__img'} />
      </a>
    </header>
  );
};
export default Header;
