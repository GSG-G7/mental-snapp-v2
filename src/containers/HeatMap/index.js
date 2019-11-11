import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

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
    const firebaseData = [];
    try {
      const snapshot = await firebase.journals().get();
      snapshot.forEach(doc => {
        firebaseData.push({ id: doc.id, ...doc.data() });
      });
      const heatMapData = filter(firebaseData);
      this.setState({ data: heatMapData, journals: firebaseData });
    } catch (error) {
      history.push('/server-error');
    }
  }

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

  handleDelete = id => {
    const { firebase } = this.props;
    const { journals } = this.state;
    // firebase
    //   .journals()
    //   .doc(id)
    //   .delete()
    //   .then(() => {
    //     message.warning('This Journal is deleted');
    //     this.setState({
    //       journals: journals.filter(card => card.id !== id),
    //       data: journals.filter(day => day.date !== id),
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
  firebase: PropTypes.shape({
    journals: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(index);
