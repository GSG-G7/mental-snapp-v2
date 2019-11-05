import React, { Component } from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import { Icon, Popconfirm } from 'antd';

import data from './fakeData';
import BackButton from '../../components/BackButton';
import JournalComponent from '../../components/Journal';

import './journal.css';

class Journal extends Component {
  state = {
    journal: { ...data },
  };

  handleConfirm = e => {
    // it will delete the journal from firebase
    const { history } = this.props;
    history.push('/home');
  };

  handleGoBack = e => {
    const { history } = this.props;
    history.push('/home');
  };

  render() {
    const { journal } = this.state;
    return (
      <div className="journal-page">
        <div className="journal-page__header">
          <BackButton handleBack={this.handleGoBack} />
          <div>
            <Popconfirm
              title="Do you really want to delete this entry?"
              onConfirm={this.handleConfirm}
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
            <span>
              {
                moment(journal.timestamp)
                  .format('MMMM Do, h:mm a')
                  .split(',')[0]
              }
            </span>
          </div>
          <div className="journal-card__time">
            <Icon type="clock-circle" className="journal-card__icon" />
            <span>
              {
                moment(journal.timestamp)
                  .format('MMMM Do, h:mm a')
                  .split(',')[1]
              }
            </span>
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
  }
}

Journal.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    goBack: propTypes.func.isRequired,
  }).isRequired,
};

export default Journal;
