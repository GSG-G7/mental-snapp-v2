import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import './style.css';

const JournalCard = ({ time, date, grateful, challenges, developing }) => {
  return (
    <div className="journal-card">
      <div className="journal-card__top">
        <div className="journal-card__date">
          <Icon
            type="calendar"
            style={{
              fontSize: '15px',
              color: 'rgba(36, 36, 36, 0.6)',
              marginRight: '4px',
            }}
          />
          <span>{date}</span>
        </div>
        <div className="journal-card__time">
          <Icon
            type="clock-circle"
            style={{
              fontSize: '14px',
              color: 'rgba(36, 36, 36, 0.6)',
              marginRight: '4px',
            }}
          />
          <span>{time}</span>
        </div>
        <div className="journal-card__delete">
          <Icon
            className="journal-card__icon"
            type="delete"
            style={{
              color: 'rgba(245, 34, 45, 0.8)',
            }}
          />
        </div>
      </div>
      <div className="journal-card__body">
        <p className="journal-card__grateful">
          <span className="journal-card__body__title">grateful</span>
          {grateful}
        </p>
        <p className="journal-card__challenges">
          <span className="journal-card__body__title">challenges</span>
          {challenges}
        </p>
        <p className="journal-card__developing">
          <span className="journal-card__body__title">developing</span>
          {developing}
        </p>
      </div>
    </div>
  );
};

JournalCard.propTypes = {
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  grateful: PropTypes.string.isRequired,
  challenges: PropTypes.string.isRequired,
  developing: PropTypes.string.isRequired,
};

export default JournalCard;
