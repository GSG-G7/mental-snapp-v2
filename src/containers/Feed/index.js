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
    data: [], // we need a descriptive name here
    monthCount: months,
    loading: true,
    allJournals: [],
  };

  componentDidMount() {
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');

    firebase.db // we need to use async-await in here
      .collection('users')
      .doc(userId)
      .get()
      .then(snapshot => {
        if (snapshot.data().userJournals) {
          const allUserJournal = snapshot.data().userJournals;
          const monthArray = allUserJournal.map(journal =>
            moment(journal.timestamp).format('MMMM')
          );

          // getting each month a and how many journals in it
          const filteredObject = monthArray.reduce((acc, curr) => {
            if (typeof acc[curr] === 'undefined') {
              acc[curr] = 1;
            } else {
              acc[curr] += 1;
            }
            return acc;
          }, {});

          console.log(filteredObject);

          const keys = Object.keys(filteredObject);
          // adding a count to the months array which goes to the select
          for (let i = 0; i < months.length; i++) {
            for (let j = 0; j < keys.length; j++) {
              if (months[i].month === keys[j]) {
                months[i].count = filteredObject[keys[j]];
              }
            }
          }
          const currentMonthJournal = allUserJournal.filter(
            // this can be done using firebase queries
            journal =>
              moment(journal.timestamp).format('MMMM') ===
              moment(new Date()).format('MMMM')
          );
          this.setState({
            monthCount: months, // should be named monthsWithCounts
            data: currentMonthJournal, // don't use data as a variable name please 😒
            loading: false,
            allJournals: allUserJournal, // we don't need to get all the journals
          });
        }
        this.setState({
          loading: false,
        });
      });
  }

  handleChange = value => {
    const { allJournals } = this.state;
    const selectedJournal = allJournals.filter(
      journal => moment(journal.timestamp).format('MMMM') === value // this value might go in the query
    );
    this.setState({ data: selectedJournal });
  };

  handleDelete = id => {
    const { firebase } = this.props;
    const userId = firebase.auth.currentUser.uid; // we can get it from local storage

    const { data, monthCount, allJournals } = this.state;
    message.warning('This Journal is deleted');

    // we can update this in a different way
    const deletedCardMonth = moment(data[0].timestamp).format('MMMM');
    monthCount.map(month => {
      if (month.month === deletedCardMonth) {
        month.count--;
      }
      return month;
    });

    firebase.db // we will use async-await here for sure but we might not even need this line
      .collection('users')
      .doc(userId)
      .update({
        userJournals: allJournals.filter(journal => journal.timestamp !== id),
      });

    this.setState({
      // should get journals from there collection
      data: data.filter(journal => journal.timestamp !== id),
      allJournals: allJournals.filter(journal => journal.timestamp !== id),
    });
  };

  handleJournalDetails = id => {
    const {
      history: { push },
    } = this.props;
    push(`/journal/${id}`);
  };

  render() {
    const { data, loading, monthCount } = this.state;
    return (
      <Feed
        data={data}
        loading={loading}
        monthCount={monthCount}
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
