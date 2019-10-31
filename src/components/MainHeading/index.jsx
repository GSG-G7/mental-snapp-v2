import React from 'react';
import PropTypes from 'prop-types';

const MainHeading = ({ text, className }) => (
  <h3 className={className}>{text}</h3>
);

MainHeading.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default MainHeading;
