import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/images/logo.svg';
import './style.css';

const LogoHeader = () => {
  return (
    <div className="logo-header">
      <Logo alt="mental snapp logo" className="logo-header__image" />
      <Link to="/about">
        <span className="logo-header__link">about</span>
      </Link>
    </div>
  );
};

export default LogoHeader;
