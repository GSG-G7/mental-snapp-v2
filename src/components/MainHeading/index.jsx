import React from 'react';
import PropTypes from 'prop-types';
import './main-heading.css';

const MainHeading = ({ text }) => {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
};

MainHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default MainHeading;
