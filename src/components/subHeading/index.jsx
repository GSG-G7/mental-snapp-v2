import React from 'react';
import PropTypes from 'prop-types';
import './subHeading.css';

const SubHeading = ({ text }) => <h5 className="sub-heading">{text}</h5>;

SubHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SubHeading;
