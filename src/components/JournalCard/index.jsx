import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import './style.css';

const JournalCard = ({ time, date, grateful, challenge, developing }) => {
  return (
    <div className="journal-card">
      <div className="journal-card__top">
        <div className="journal-card__date">
          <Icon type="calendar" className="journal-card__icon" />
          <span>{date}</span>
        </div>
        <div className="journal-card__time">
          <Icon type="clock-circle" className="journal-card__icon" />
          <span>{time}</span>
        </div>
        <div className="journal-card__delete">
          <Icon
            className="journal-card__icon journal-card__icon--delete"
            type="delete"
          />
        </div>
      </div>
      <div className="journal-card__body">
        <p className="journal-card__grateful">
          <span className="journal-card__body__title">grateful</span>
          {grateful}
        </p>
        <p className="journal-card__challenge">
          <span className="journal-card__body__title">challenge</span>
          {challenge}
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
  challenge: PropTypes.string.isRequired,
  developing: PropTypes.string.isRequired,
};

export default JournalCard;
