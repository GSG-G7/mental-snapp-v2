import React from 'react';
import PropTypes from 'prop-types';

import BackButton from '../BackButton';
import MainHeading from '../MainHeading';

import './header.css';

const Header = ({ text, handleBack }) => {
  return (
    <div className="signup__header">
      <BackButton handleBack={handleBack} />
      <MainHeading text={text} className="signup__heading" />
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default Header;
