import React from 'react';

import { ReactComponent as GoogleImg } from '../../containers/assets/images/google.svg';
import './style.css';

const GoogleButton = () => {
  return (
    <button type="submit" className="google-btn">
      <GoogleImg className="google-btn__img" />
      <span className="google-btn__text">Google</span>
    </button>
  );
};

export default GoogleButton;
