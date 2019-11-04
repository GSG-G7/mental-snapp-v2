import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import './style.css';

const index = () => {
  return (
    <div className="logo-header">
      <img src={logo} alt="mental snapp logo" className="logo-header__image" />
      <Link to="/about">
        <span className="logo-header__link">about</span>
      </Link>
    </div>
  );
};

export default index;
