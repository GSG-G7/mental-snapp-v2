import React from 'react';
import PropTypes from 'prop-types';
import './subHeading.css';

const SubHeading = ({ text }) => {
  return <h2 className="sub-heading">{text}</h2>;
};

SubHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SubHeading;
