import React from 'react';
import PropTypes from 'prop-types';

import Chart from 'react-apexcharts';

import NavigationBar from '../../components/navigationBar';
import logo from '../assets/images/logo.png';
import './heatMap.css';

const heatMap = props => {
  const { options, series } = props;
  return (
    <div className="heat-map">
      <header className="heat-map__header">
        <img src={logo} alt="mental snapp logo" className="heat-map__logo" />
      </header>
      <Chart options={options} series={series} width="100%" type="heatmap" />
      <div className="heat-map__journals">
        <p className="heat-map__text">
          Pick a day to check your activity in it
        </p>
      </div>
      <NavigationBar />
    </div>
  );
};

heatMap.propTypes = {
  options: PropTypes.shape().isRequired,
  series: PropTypes.arrayOf.isRequired,
};

export default heatMap;
