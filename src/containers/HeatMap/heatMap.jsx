import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import CalenderHeatMap from 'react-calendar-heatmap';

import NavigationBar from '../../components/navigationBar';
import logo from '../assets/images/logo.png';
import 'react-calendar-heatmap/dist/styles.css';
import './heatMap.css';

const heatMap = props => {
  const data = [
    {
      date: '2019-11-01T22:00:00.000Z',
      count: 2,
    },
  ];

  const toolTipData = value => {
    if (value.date) {
      return {
        'data-tip': `${value.date.slice(0, 10)} has ${value.count} journals`,
      };
    }
    return {
      'data-tip': 'No journals yet',
    };
  };

  // This function should show data based on day
  const handleClick = value => {
    // the date of the clicked day in the same way it's stored in our DB
    if (value) {
      const currentDay = new Date(value.date).toISOString();
    }
  };

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return (
    <div className="heat-map">
      <header className="heat-map__header">
        <img src={logo} alt="mental snapp logo" className="heat-map__logo" />
      </header>
      <h2 className="heat-map__month">{new Date().toDateString()}</h2>
      <div className="heat-map__body">
        <CalenderHeatMap
          startDate={firstDay}
          endDate={lastDay}
          values={data}
          classForValue={value => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${value.count}`;
          }}
          tooltipDataAttrs={toolTipData}
          showWeekdayLabels={false}
          showMonthLabels={false}
          horizontal={false}
          onClick={handleClick}
        />
        <ReactTooltip />
      </div>
      <p className="heat-map__text">Pick a day to check your activity in it</p>
      {/* here we will display any journals */}
      <div className="heat-map__journals" />
      <NavigationBar />
    </div>
  );
};

heatMap.propTypes = {};

export default heatMap;
