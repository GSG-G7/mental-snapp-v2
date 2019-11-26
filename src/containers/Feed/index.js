import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message } from 'antd';
import { compose } from 'recompose';

import Feed from './feeds';
import months from './data';
import { decrementMonthCount, selectMenuMonths } from './utils/index';
import { withAuth } from '../Session/index';
import { withFirebase } from '../Firebase/index';

class FeedPage extends Component {
  state = {
    currentMonthJournals: [],
    monthsWithCounts: months,
    loading: true,
    allJournals: [],
  };

  async componentDidMount() {
    const {
      firebase,
      history: { push },
    } = this.props;

    const userId = localStorage.getItem('userId');

    try {
      // Getting all of the user journals
      const querySnapshot = await firebase.db
        .collection('journals')
        .where('userId', '==', userId)
        .get();

      const userJournals = [];

      querySnapshot.docs.forEach(doc => {
        userJournals.push({ id: doc.id, ...doc.data() });
      });

      if (querySnapshot) {
        const currentMonthJournals = userJournals.filter(
          journal =>
            moment(journal.timestamp).format('MMMM') ===
            moment(new Date()).format('MMMM')
        );

        this.setState({
          monthsWithCounts: selectMenuMonths(userJournals),
          currentMonthJournals,
          loading: false,
          allJournals: userJournals,
        });
      }
      this.setState({
        loading: false,
      });
    } catch (error) {
      push('/server-error');
    }
  }

  handleChange = value => {
    const { allJournals } = this.state;
    const selectedJournal = allJournals.filter(
      journal => moment(journal.timestamp).format('MMMM') === value
    );
    this.setState({ currentMonthJournals: selectedJournal });
  };

  handleDelete = async id => {
    const {
      firebase,
      history: { push },
    } = this.props;

    const { currentMonthJournals, monthsWithCounts, allJournals } = this.state;
    message.warning('This Journal is deleted');

    const updatedJournals = allJournals.filter(journal => journal.id !== id);

    // Decrementing the count of that month
    const modifiedMonthsWithCounts = decrementMonthCount(
      currentMonthJournals,
      monthsWithCounts
    );

    const updatedCurrentMonthJournals = updatedJournals.filter(
      journal =>
        moment(journal.timestamp).format('MMMM') ===
        moment(new Date()).format('MMMM')
    );

    this.setState({
      currentMonthJournals: updatedCurrentMonthJournals,
      allJournals: updatedJournals,
      monthsWithCounts: modifiedMonthsWithCounts,
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
      history: { push },
    } = this.props;
    push(`/journal/${id}`);
  };

  render() {
    const { currentMonthJournals, loading, monthsWithCounts } = this.state;
    return (
      <Feed
        currentMonthJournals={currentMonthJournals}
        loading={loading}
        monthsWithCounts={monthsWithCounts}
        handleChange={this.handleChange}
        handleDelete={this.handleDelete}
        handleJournalDetails={this.handleJournalDetails}
      />
    );
  }
}

FeedPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    user: PropTypes.func.isRequired,
    db: PropTypes.object.isRequired,
  }).isRequired,
};

const AuthFeed = compose(
  withAuth,
  withFirebase
)(FeedPage);

export default AuthFeed;
