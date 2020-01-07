import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message } from 'antd';
import { compose } from 'recompose';

import Feed from './feed';
import months from './data';
import { decrementMonthCount, selectMenuMonths } from './utils/index';
import { withAuth } from '../Session/index';
import { withFirebase } from '../Firebase/index';

class FeedPage extends Component {
  state = {
    currentJournals: [],
    userYears: [],
    monthsWithCounts: months,
    loading: true,
    allJournals: []
  };

  // Keep the journals of the selected year
  currentYearJournals = [];

  async componentDidMount() {
    const {
      firebase,
      history: { push }
    } = this.props;

    const userId = localStorage.getItem('userId');

    try {
      const querySnapshot = await firebase.db
        .collection('journals')
        .where('userId', '==', userId)
        .get();

      const userJournals = [];

      querySnapshot.docs.forEach(doc => {
        userJournals.push({ id: doc.id, ...doc.data() });
      });

      if (querySnapshot) {
        const allYears = userJournals
          .map(journal => moment(journal.timestamp).format('YYYY'))
          .filter((item, index, array) => array.indexOf(item) === index)
          .sort();

        this.currentYearJournals = userJournals.filter(
          journal =>
            moment(journal.timestamp).format('YYYY') === moment().format('YYYY')
        );

        const currentJournals = userJournals.filter(
          journal =>
            moment(journal.timestamp).format('YYYY') ===
              moment().format('YYYY') &&
            moment(journal.timestamp).format('MMMM') === moment().format('MMMM')
        );

        this.setState({
          monthsWithCounts: selectMenuMonths(currentJournals),
          currentJournals,
          loading: false,
          allJournals: userJournals,
          userYears: allYears
        });
      }
    } catch (error) {
      push('/server-error');
    }
  }

  handleSelectYearChange = currentValue => {
    const { allJournals } = this.state;
    const selectedJournal = allJournals.filter(
      journal => moment(journal.timestamp).format('YYYY') === currentValue
    );
    this.currentYearJournals = selectedJournal;
    this.setState({
      currentJournals: selectedJournal,
      monthsWithCounts: selectMenuMonths(selectedJournal)
    });
  };

  handleSelectMonthChange = currentValue => {
    const selectedJournal = this.currentYearJournals.filter(
      journal => moment(journal.timestamp).format('MMMM') === currentValue
    );
    this.setState({ currentJournals: selectedJournal });
  };

  handleDelete = async id => {
    const {
      firebase,
      history: { push }
    } = this.props;

    const { currentJournals, monthsWithCounts, allJournals } = this.state;
    message.warning('This Journal is deleted');

    const updatedJournals = allJournals.filter(journal => journal.id !== id);

    // Decrementing the count of that month
    const modifiedMonthsWithCounts = decrementMonthCount(
      currentJournals,
      monthsWithCounts
    );

    const updatedCurrentJournals = updatedJournals.filter(
      journal =>
        moment(journal.timestamp).format('YYYY') === moment().format('YYYY') &&
        moment(journal.timestamp).format('MMMM') === moment().format('MMMM')
    );

    this.setState({
      currentJournals: updatedCurrentJournals,
      allJournals: updatedJournals,
      monthsWithCounts: modifiedMonthsWithCounts
    });

    try {
      await firebase.db
        .collection('journals')
        .doc(id)
        .delete();
    } catch (error) {
      push('/server-error');
    }
  };

  handleJournalDetails = id => {
    const {
      history: { push }
    } = this.props;
    push(`/journal/${id}`);
  };

  render() {
    const {
      currentJournals,
      loading,
      monthsWithCounts,
      userYears
    } = this.state;
    return (
      <Feed
        userYears={userYears}
        currentJournals={currentJournals}
        loading={loading}
        monthsWithCounts={monthsWithCounts}
        handleSelectMonthChange={this.handleSelectMonthChange}
        handleSelectYearChange={this.handleSelectYearChange}
        handleDelete={this.handleDelete}
        handleJournalDetails={this.handleJournalDetails}
      />
    );
  }
}

FeedPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    user: PropTypes.func.isRequired,
    db: PropTypes.object.isRequired
  }).isRequired
};

const AuthFeed = compose(
  withAuth,
  withFirebase
)(FeedPage);

export default AuthFeed;
