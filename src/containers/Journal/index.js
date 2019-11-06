import React, { Component } from 'react';
import propTypes from 'prop-types';

import JournalPage from './journal';

import data from './fakeData';

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
      <JournalPage
        journal={journal}
        handleGoBack={this.handleGoBack}
        handleConfirm={this.handleConfirm}
      />
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
