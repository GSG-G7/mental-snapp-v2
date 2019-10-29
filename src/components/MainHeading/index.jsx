import React from 'react';
import PropTypes from 'prop-types';
import './main-heading.css';

const MainHeading = ({ text }) => <h2 className="main-head">{text}</h2>;

MainHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default MainHeading;
