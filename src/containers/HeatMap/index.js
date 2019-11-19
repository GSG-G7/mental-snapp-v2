import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { message } from 'antd';
import { withAuth } from '../Session/index';

import HeatMap from './heatMap';
import { withFirebase } from '../Firebase';
import filter from './filter';

class index extends Component {
  state = {
    data: [],
    journals: [],
    journalsOfTheDay: [],
  };

  async componentDidMount() {
    const { firebase, history } = this.props;
    const userId = localStorage.getItem('userId');
    try {
      const snapshot = await firebase.db
        .collection('users')
        .doc(userId)
        .get();

      const data = snapshot.data().userJournals;

      const heatMapData = filter(data);
      this.setState({
        data: heatMapData,
        journals: data,
      });
      this.handleCurrentDay();
    } catch (error) {
      history.push('/server-error');
    }
  }

  handleCurrentDay = () => {
    const { journals } = this.state;
    const currentDay = new Date().getDay();
    if (journals) {
      const filteredJournals = journals.filter(
        journal => new Date(journal.timestamp).getDay() === currentDay
      );
      this.setState({
        journalsOfTheDay: filteredJournals,
      });
    }
  };

  // This function should show data based on day
  handleClick = value => {
    const { journals } = this.state;
    // the date of the clicked day in the same way it's stored in our DB
    if (value && value.count) {
      const currentDay = new Date(value.date).getDay();
      const filteredJournals = journals.filter(
        journal => new Date(journal.timestamp).getDay() === currentDay
      );
      this.setState({ journalsOfTheDay: filteredJournals });
    } else {
      this.setState({ journalsOfTheDay: [] });
    }
  };

  handleDelete = timestamp => {
    const { firebase } = this.props;
    const { journals } = this.state;
    const userId = firebase.auth.currentUser.uid;

    // 1- also it will be deleted from state as follows :
    const filteredData = journals.filter(
      journal => journal.timestamp !== timestamp
    );

    firebase.db
      .collection('users')
      .doc(userId)
      .update({
        userJournals: filteredData,
      });
    message.warning('This Journal is deleted');
    const heatMapData = filter(filteredData);

    this.setState({
      journals: filteredData,
      data: heatMapData,
      journalsOfTheDay: filteredData,
    });
  };

  handleJournalDetails = id => {
    const {
      history: { push },
    } = this.props;
    push(`/journal/${id}`);
  };

  render() {
    const { data, journalsOfTheDay } = this.state;
    return (
      <HeatMap
        data={data}
        handleClick={this.handleClick}
        journals={journalsOfTheDay}
        handleDelete={this.handleDelete}
        handleJournalDetails={this.handleJournalDetails}
      />
    );
  }
}

index.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    db: PropTypes.object.isRequired,
  }).isRequired,
};

const AuthHeatMap = compose(
  withAuth,
  withFirebase
)(index);

export default AuthHeatMap;
