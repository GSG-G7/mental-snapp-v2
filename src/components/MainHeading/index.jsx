import React from 'react';
import PropTypes from 'prop-types';

const MainHeading = ({ text, className }) => (
  <h3 className={`main-head ${className}`}>{text}</h3>
);

MainHeading.defaultProps = {
  className: '',
};

MainHeading.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default MainHeading;
