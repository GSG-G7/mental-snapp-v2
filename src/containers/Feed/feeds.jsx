import React, { Component } from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import { Select, message } from 'antd';

import NavBar from '../../components/navigationBar';
import JournalCard from '../../components/JournalCard';
import { months, fakeData } from './data';
import LogoHeader from '../../components/LogoHeader';
import { withFirebase } from '../Firebase/index';

import './feeds.css';

const { Option } = Select;
class Feed extends Component {
  state = {
    data: [],
    monthCount: months,
  };

  componentDidMount() {
    // console.log(this.props.firebase.auth.currentUser.uid);
    // const myUserId = this.props.firebase.auth.currentUser;

    // this.props.firebase
    //   .user(myUserId)
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       const todo = doc.data();
    //       console.log(todo, 11);
    //     });
    //   });

    // this.props.firebase.db
    //   .collection('users')
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       const todo = doc.data();
    //       console.log(todo, 11);
    //     });
    //   });

    // set state the data to the current month
    const monthArray = fakeData.map(journal =>
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
    this.setState({ monthCount: months });
  }

  handleDelete = id => {
    const { data, monthCount } = this.state;
    message.warning('This Journal is deleted');
    // 1- this card will be deleted from firbase store.
    // 2- also it will be deleted from state as follows :
    const deletedCardMonth = moment(data[0].timestamp).format('MMMM');
    monthCount.map(month => {
      if (month.month === deletedCardMonth) {
        month.count--;
      }
      return month;
    });

    this.setState({
      data: data.filter(card => card.id !== id),
    });
  };

  handleChange = value => {
    const selectedJournal = fakeData.filter(
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
    const { data, monthCount } = this.state;
    return (
      <div className="feeds">
        <div className="feeds__content">
          <LogoHeader />
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

        {data.length > 0 ? (
          data.map(journal => (
            <JournalCard
              key={journal.id}
              time={moment(journal.timestamp).format('MMMM Do')}
              date={moment(journal.timestamp).format('h:mm a')}
              grateful={journal.grateful && journal.grateful.title}
              challenge={journal.challenge && journal.challenge.title}
              developing={journal.developing && journal.developing.title}
              handleDelete={() => this.handleDelete(journal.id)}
              journalId={journal.id}
              handleJournalDetails={this.handleJournalDetails}
            />
          ))
        ) : (
          <h2 className="feeds__message">
            No entries for this month, choose another one
          </h2>
        )}

        <NavBar />
      </div>
    );
  }
}

Feed.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(Feed);
