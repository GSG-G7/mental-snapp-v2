import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ReactTooltip from 'react-tooltip';
import CalenderHeatMap from 'react-calendar-heatmap';
import moment from 'moment';

import LogoHeader from '../../components/LogoHeader';
import JournalCard from '../../components/JournalCard';
import NavigationBar from '../../components/navigationBar';
import { ReactComponent as NoJournals } from '../assets/images/noJournals.svg';
import toolTipData from '../../utils/toolTipData';
import { firstDay, lastDay } from '../../utils/dates';
import 'react-calendar-heatmap/dist/styles.css';
import './heatMap.css';

const heatMap = props => {
  const {
    data,
    journals,
    handleClick,
    handleDelete,
    handleJournalDetails,
  } = props;

  return (
    <div className="heat-map">
      <LogoHeader />
      <h3 className="heat-map__month">
        <Icon type="calendar" className="heat-map__icon" />
        {moment().format('MMMM')}
      </h3>
      <div className="heat-map__container">
        <div className="heat-map__body">
          <CalenderHeatMap
            startDate={firstDay}
            endDate={lastDay}
            values={data}
            classForValue={value => {
              if (!value || !value.count) {
                return 'color-empty';
              }
              return `color-scale-${Math.min(value.count, 4)}`;
            }}
            tooltipDataAttrs={toolTipData}
            showWeekdayLabels
            showMonthLabels={false}
            horizontal={false}
            onClick={handleClick}
          />
          <ReactTooltip />
          <div className="heat-map__legend">
            <span className="heat-map__text">less activity</span>
            <div className="heat-map__box heat-map__box--scale1" />
            <div className="heat-map__box heat-map__box--scale2" />
            <div className="heat-map__box heat-map__box--scale3" />
            <div className="heat-map__box heat-map__box--scale4" />
            <span className="heat-map__text">more activity</span>
          </div>
          <p className="heat-map__text">
            Pick a day to check your activity in it
          </p>
        </div>

        {/* here we will display any journals */}
        <div className="heat-map__journals">
          {journals.length !== 0 ? (
            journals.map((journal, index) => (
              <JournalCard
                key={journal.timestamp}
                index={index}
                journalId={journal.timestamp}
                handleDelete={() => handleDelete(journal.timestamp)}
                handleJournalDetails={handleJournalDetails}
                time={moment(journal.timestamp).format('h:mm a')}
                date={moment(journal.timestamp).format('MMMM Do')}
                grateful={journal.grateful && journal.grateful.title}
                challenge={journal.challenge && journal.challenge.title}
                developing={journal.developing && journal.developing.title}
              />
            ))
          ) : (
            <div className="heat-map__empty wow slideInUp">
              <p className="heat-map__journals__message">
                no journals for this day
              </p>
              <div className="heat-map__journals__image">
                <NoJournals />
              </div>
            </div>
          )}
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

heatMap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  journals: PropTypes.arrayOf(
    PropTypes.shape({
      grateful: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
      }),
      challenge: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
      }),
      developing: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
      }),
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleJournalDetails: PropTypes.func.isRequired,
};

export default heatMap;
