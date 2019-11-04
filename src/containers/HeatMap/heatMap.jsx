import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import CalenderHeatMap from 'react-calendar-heatmap';

import LogoHeader from '../../components/LogoHeader';
import NavigationBar from '../../components/navigationBar';
import 'react-calendar-heatmap/dist/styles.css';
import './heatMap.css';

const heatMap = props => {
  const { data, handleClick } = props;

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

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return (
    <div className="heat-map">
      <LogoHeader />
      <h2 className="heat-map__month">{new Date().toDateString()}</h2>
      <div className="heat-map__body">
        <CalenderHeatMap
          startDate={firstDay}
          endDate={lastDay}
          values={data}
          classForValue={value => {
            if (!value || !value.count) {
              return 'color-empty';
            }
            return `color-scale-${value.count > 4 ? 4 : value.count}`;
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

heatMap.propTypes = {
  data: PropTypes.arrayOf({
    date: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default heatMap;
