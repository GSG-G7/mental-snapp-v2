import React from 'react';
import moment from 'moment';
import { Icon, Popconfirm } from 'antd';
import propTypes from 'prop-types';
import './journal.css';

import BackButton from '../../components/BackButton';
import JournalComponent from '../../components/Journal';

const Journal = props => {
  const { journal, handleConfirm, handleGoBack } = props;
  return (
    <div className="journal-page">
      <div className="journal-page__header">
        <BackButton handleBack={handleGoBack} />
        <div>
          <Popconfirm
            title="Do you really want to delete this entry?"
            onConfirm={handleConfirm}
            okText="Yes"
            cancelText="cancel"
          >
            <Icon type="delete" className="header__icon" />
          </Popconfirm>
        </div>
      </div>
      <div className="journal-card__top">
        <div className="journal-card__date">
          <Icon type="calendar" className="journal-card__icon" />
          <span>{moment(journal.timestamp).format('MMMM Do')}</span>
        </div>
        <div className="journal-card__time">
          <Icon type="clock-circle" className="journal-card__icon" />
          <span>{moment(journal.timestamp).format('h:mm a')}</span>
        </div>
      </div>
      {journal && journal.grateful && (
        <JournalComponent
          className="journal__first"
          questionTitle="Grateful for:"
          question={journal.grateful}
        />
      )}

      {journal && journal.challenge && (
        <JournalComponent
          questionTitle="Challenge:"
          question={journal.challenge}
        />
      )}

      {journal && journal.developing && (
        <JournalComponent
          questionTitle="Developing:"
          question={journal.developing}
        />
      )}
    </div>
  );
};

Journal.propTypes = {
  journal: propTypes.shape({
    timestamp: propTypes.string,
    challenge: propTypes.objectOf(propTypes.string),
    developing: propTypes.objectOf(propTypes.string),
    grateful: propTypes.objectOf(propTypes.string),
  }).isRequired,
  handleConfirm: propTypes.func.isRequired,
  handleGoBack: propTypes.func.isRequired,
};
export default Journal;
