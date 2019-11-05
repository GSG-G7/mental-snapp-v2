import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo1.png';
import './style.css';

const index = () => {
  return (
    <div className="logo-header">
      <img src={logo} alt="mental snapp logo" className="logo-header__image" />
      <Link className="logo-header__link" to="/about">
        <span>about</span>
      </Link>
    </div>
  );
};

export default index;
