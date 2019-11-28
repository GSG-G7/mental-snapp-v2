import React from 'react';
import moment from 'moment';
import { Icon, Popconfirm, Spin } from 'antd';
import propTypes from 'prop-types';

import BackButton from '../../components/BackButton';
import Emoji from '../../components/Emoji/emoji';
import JournalComponent from '../../components/Journal';
import './journal.css';

const Journal = props => {
  const { journal, handleConfirm, handleGoBack, loading } = props;
  return (
    <div className="journal-page">
      <div className="journal-page__header container">
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
      {!loading ? (
        <div className="journal-page__loading">
          <Spin size="large" />
        </div>
      ) : (
        <section>
          <div className="journal-details__top">
            <div>
              <Icon type="calendar" className="journal-card__icon" />
              <span>{moment(journal.timestamp).format('MMMM Do')}</span>
            </div>
            <div>
              <Icon type="clock-circle" className="journal-card__icon" />
              <span>{moment(journal.timestamp).format('h:mm a')}</span>
            </div>
          </div>
          <div className="journals__container">
            {journal && journal.grateful && (
              <JournalComponent
                className="journal__first"
                questionTitle="Grateful for:"
                question={journal.grateful}
              />
            )}

            {journal && journal.challenge && (
              <JournalComponent
                questionTitle="Challenges:"
                question={journal.challenge}
              />
            )}

            {journal && journal.developing && (
              <JournalComponent
                questionTitle="Developing:"
                question={journal.developing}
                className="journal__last-card"
              />
            )}
          </div>
          <div className="journal__emoji--container">
            <Emoji feeling={journal.emojiId} className="journal__emoji" />
          </div>
        </section>
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
    emojiId: propTypes.string,
  }).isRequired,
  handleConfirm: propTypes.func.isRequired,
  handleGoBack: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
};
export default Journal;
