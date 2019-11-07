import React from 'react';
import { Icon, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

import './style.css';

const JournalCard = ({
  time,
  date,
  grateful,
  challenge,
  developing,
  handleDelete,
  journalID,
  handleJournalDetails,
}) => {
  return (
    <div
      onClick={handleJournalDetails}
      style={{ cursor: 'pointer' }}
      role="presentation"
    >
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
            <Popconfirm
              title="Do you really want to delete this card ?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="cancel"
              id={journalID}
            >
              <Icon
                className="journal-card__icon journal-card__icon--delete"
                type="delete"
              />
            </Popconfirm>
          </div>
        </div>
        <div className="journal-card__body">
          {grateful && (
            <p className="journal-card__grateful">
              <span className="journal-card__body__title">grateful</span>
              {grateful}
            </p>
          )}
          {challenge && (
            <p className="journal-card__challenge">
              <span className="journal-card__body__title">challenge</span>
              {challenge}
            </p>
          )}
          {developing && (
            <p className="journal-card__developing">
              <span className="journal-card__body__title">developing</span>
              {developing}
            </p>
          )}
        </div>
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
  handleDelete: PropTypes.func.isRequired,
  journalID: PropTypes.number.isRequired,
  handleJournalDetails: PropTypes.func.isRequired,
};

export default JournalCard;
