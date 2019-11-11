/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import { Select, message, Spin } from 'antd';

import NavBar from '../../components/navigationBar';
import JournalCard from '../../components/JournalCard';
import { months } from './data';
import LogoHeader from '../../components/LogoHeader';
import { withFirebase } from '../Firebase/index';

import './feeds.css';

const { Option } = Select;
class Feed extends Component {
  state = {
    data: [],
    monthCount: months,
    loading: true,
    allJournals: [],
  };

  componentDidMount() {
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');

    firebase.db
      .collection('users')
      .doc(userId)
      .get()
      .then(snapshot => {
        const data = snapshot.data().userJournals;
        const monthArray = data.map(journal =>
          moment(journal.timestamp).format('MMMM')
        );
        const filteredObject = monthArray.reduce((acc, curr) => {
          if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
          } else {
            acc[curr] += 1;
          }
          return acc;
        }, {});

        const keys = Object.keys(filteredObject);

        for (let i = 0; i < months.length; i++) {
          for (let j = 0; j < keys.length; j++) {
            if (months[i].month === keys[j]) {
              months[i].count = filteredObject[keys[j]];
            }
          }
        }
        const currentMonthJournal = data.filter(
          journal =>
            moment(journal.timestamp).format('MMMM') ===
            moment(new Date()).format('MMMM')
        );
        this.setState({
          monthCount: months,
          data: currentMonthJournal,
          loading: false,
          allJournals: data,
        });
      });
  }

  handleDelete = id => {
    const { firebase } = this.props;
    const userId = firebase.auth.currentUser.uid;

    const { data, monthCount } = this.state;
    message.warning('This Journal is deleted');

    // 1- also it will be deleted from state as follows :
    const deletedCardMonth = moment(data[0].timestamp).format('MMMM');
    monthCount.map(month => {
      if (month.month === deletedCardMonth) {
        month.count--;
      }
      return month;
    });

    // 2- this card will be deleted from firbase firestore.

    firebase.db
      .collection('users')
      .doc(userId)
      .update({
        userJournals: data.filter(journal => journal.timestamp !== id),
      });

    this.setState({
      data: data.filter(journal => journal.timestamp !== id),
    });
  };

  handleChange = value => {
    const { allJournals } = this.state;
    const selectedJournal = allJournals.filter(
      journal => moment(journal.timestamp).format('MMMM') === value
    );
    this.setState({ data: selectedJournal });
  };

  handleJournalDetails = id => {
    const {
      history: { push },
    } = this.props;
    push(`/journal/${id}`);
  };

  render() {
    const { data, monthCount, loading } = this.state;
    return (
      <div className="feeds">
        <div className="feeds__content">
          <LogoHeader />
          <br />
          <Select
            defaultValue={moment(new Date()).format('MMMM')}
            className="feeds__select"
            onChange={this.handleChange}
          >
            {monthCount.map(element => (
              <Option
                className="feeds__option"
                key={element.id}
                value={element.month}
              >
                <span>{element.month}</span>
                <span>{element.count}</span>
              </Option>
            ))}
          </Select>
        </div>
        <div className="feed_journals">
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '9vh' }}>
              <Spin size="large" />
            </div>
          ) : data.length > 0 ? (
            data.map(journal => (
              <JournalCard
                key={journal.timestamp}
                time={moment(journal.timestamp).format('MMMM Do')}
                date={moment(journal.timestamp).format('h:mm a')}
                grateful={journal.grateful && journal.grateful.title}
                challenge={journal.challenge && journal.challenge.title}
                developing={journal.developing && journal.developing.title}
                handleDelete={() => this.handleDelete(journal.timestamp)}
                journalId={journal.timestamp}
                handleJournalDetails={this.handleJournalDetails}
              />
            ))
          ) : (
            <h2 className="feeds__message">
              No entries for this month, choose another one
            </h2>
          )}
        </div>
        <NavBar />
      </div>
    );
  }
}

Feed.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    uid: propTypes.string.isRequired,
    firestore: propTypes.object.isRequired,
    FieldValue: propTypes.object.isRequired,
    arrayUnion: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    db: propTypes.object.isRequired,
    collection: propTypes.object.isRequired,
  }).isRequired,
};

export default withFirebase(Feed);
