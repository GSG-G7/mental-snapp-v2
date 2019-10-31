import React from 'react';

import { ReactComponent as FacebookImg } from '../../containers/assets/images/facebook.svg';
import './style.css';

const Facebook = () => {
  return (
    <button type="submit" className="facebook-btn">
      <FacebookImg className="facebook-btn__img" />
      <span className="facebook-btn__text">Facebook</span>
    </button>
  );
};

export default Facebook;
