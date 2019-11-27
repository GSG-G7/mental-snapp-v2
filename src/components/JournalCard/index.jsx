import React from 'react';
import { Icon, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import WOW from 'wow.js';
import Feelings from './EmojiData';

import './style.css';

const JournalCard = ({
  id,
  index,
  time,
  date,
  grateful,
  challenge,
  developing,
  handleDelete,
  journalId,
  handleJournalDetails,
}) => {
  new WOW().init();
  return (
    <div
      className="journal-card wow slideInUp"
      data-wow-delay={`${index * 0.2}s`}
    >
      <div className="journal-card__top">
        <div className="journal-card__date">
          <Icon type="calendar" className="journal-card__icon" />
          <span>{date}</span>
        </div>
        <div className="journal-card__time">
          <Icon type="clock-circle" className="journal-card__icon" />
          <span>{time}</span>
        </div>
        <div className="journal-card__delete" title="Delete">
          <Popconfirm
            title="Do you really want to delete this entry?"
            onConfirm={e => {
              e.stopPropagation();
              handleDelete();
            }}
            okText="Yes"
            cancelText="cancel"
            id={journalId}
          >
            <Icon
              className="journal-card__icon journal-card__icon--delete"
              type="delete"
            />
          </Popconfirm>
        </div>
      </div>
      <div
        onClick={() => handleJournalDetails(journalId)}
        style={{ cursor: 'pointer' }}
        role="presentation"
        className="journal-card__body"
      >
        <div className="feeling-container">
          <span className="journal-card__body__title">My Mood</span>
          {/* image src is supposed to be Feeling[id].photo */}
          <img
            className="journal-card__icon--feeling"
            src={Feelings[id].photo}
            alt={Feelings[id].alt}
          />
        </div>

        {grateful && (
          <p className="journal-card__grateful">
            <span className="journal-card__body__title">grateful for</span>
            {grateful}
          </p>
        )}
        {challenge && (
          <p className="journal-card__challenge">
            <span className="journal-card__body__title">challenges</span>
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
  );
};

JournalCard.defaultProps = {
  grateful: '',
  challenge: '',
  developing: '',
};

JournalCard.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  grateful: PropTypes.string,
  challenge: PropTypes.string,
  developing: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
  journalId: PropTypes.string.isRequired,
  handleJournalDetails: PropTypes.func.isRequired,
};

export default JournalCard;
