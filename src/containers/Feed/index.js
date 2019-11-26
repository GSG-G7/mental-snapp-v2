import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message } from 'antd';
import { compose } from 'recompose';

import Feed from './feeds';
import { months } from './data';
import { withAuth } from '../Session/index';
import { withFirebase } from '../Firebase/index';

class FeedPage extends Component {
  state = {
    currentMonthJournal: [],
    monthsWithCounts: months,
    loading: true,
    allJournals: [],
  };

  async componentDidMount() {
    const { firebase } = this.props;
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
        const monthArray = userJournals.map(journal =>
          moment(journal.timestamp).format('MMMM')
        );

        // Getting each month a and how many journals in it
        const filteredObject = monthArray.reduce((acc, curr) => {
          if (typeof acc[curr] === 'undefined') {
            acc[curr] = 1;
          } else {
            acc[curr] += 1;
          }
          return acc;
        }, {});

        const keys = Object.keys(filteredObject);
        // Adding a count to the months array which goes to the select
        for (let i = 0; i < months.length; i++) {
          for (let j = 0; j < keys.length; j++) {
            if (months[i].month === keys[j]) {
              months[i].count = filteredObject[keys[j]];
            }
          }
        }

        const currentMonthJournal = userJournals.filter(
          journal =>
            moment(journal.timestamp).format('MMMM') ===
            moment(new Date()).format('MMMM')
        );

        this.setState({
          monthsWithCounts: months,
          currentMonthJournal,
          loading: false,
          allJournals: userJournals,
        });
      }
      this.setState({
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = value => {
    const { allJournals } = this.state;
    const selectedJournal = allJournals.filter(
      journal => moment(journal.timestamp).format('MMMM') === value
    );
    this.setState({ currentMonthJournal: selectedJournal });
  };

  handleDelete = async id => {
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');

    const { currentMonthJournal, monthsWithCounts } = this.state;
    message.warning('This Journal is deleted');

    // we can update this in a different way
    const deletedCardMonth = moment(currentMonthJournal[0].timestamp).format(
      'MMMM'
    );

    monthsWithCounts.map(month => {
      if (month.month === deletedCardMonth) {
        month.count--;
      }
      return month;
    });
    try {
      await firebase.db
        .collection('journals')
        .doc(id)
        .delete();

      // Getting all of the user journals
      const querySnapshot = await firebase.db
        .collection('journals')
        .where('userId', '==', userId)
        .get();

      const userJournals = [];

      querySnapshot.docs.forEach(doc => {
        userJournals.push({ id: doc.id, ...doc.data() });
      });

      const currentMonthJournals = userJournals.filter(
        journal =>
          moment(journal.timestamp).format('MMMM') ===
          moment(new Date()).format('MMMM')
      );

      this.setState({
        currentMonthJournal: currentMonthJournals,
        allJournals: userJournals,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleJournalDetails = id => {
    const {
      history: { push },
    } = this.props;
    push(`/journal/${id}`);
  };

  render() {
    const { currentMonthJournal, loading, monthsWithCounts } = this.state;
    return (
      <Feed
        currentMonthJournal={currentMonthJournal}
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
