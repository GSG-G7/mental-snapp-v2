import React from 'react';

import { ReactComponent as GoogleImg } from '../../containers/assets/images/google.svg';
import './style.css';

const handleClick = () => {
  // handle login or sign up with Google
};

const GoogleButton = () => {
  return (
    <button type="submit" className="google-btn" onClick={handleClick}>
      <GoogleImg className="google-btn__img" />
      <span className="google-btn__text">Google</span>
    </button>
  );
};

export default GoogleButton;
