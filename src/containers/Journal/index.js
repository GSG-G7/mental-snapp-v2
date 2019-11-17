import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import { withAuth } from '../Session/index';
import { withFirebase } from '../Firebase/index';

import JournalPage from './journal';

class Journal extends Component {
  state = {
    journal: {},
    allUserJournals: [],
  };

  componentDidMount() {
    const {
      firebase,
      match: { params },
    } = this.props;
    const { id } = params;
    const userId = localStorage.getItem('userId');
    firebase.db
      .collection('users')
      .doc(userId)
      .get()
      .then(result => {
        const allJournals = result.data().userJournals;
        this.setState({ allUserJournals: allJournals });
        const clickedJournal = allJournals.filter(card => {
          return card.timestamp === id;
        });
        return this.setState({ journal: clickedJournal[0] });
      });
  }

  handleConfirm = () => {
    const { allUserJournals } = this.state;
    const {
      match: {
        params: { id },
      },
      firebase,
    } = this.props;
    const userId = firebase.auth.currentUser.uid;
    this.setState({ journal: {} });
    firebase.db
      .collection('users')
      .doc(userId)
      .update({
        userJournals: allUserJournals.filter(
          journal => journal.timestamp !== id
        ),
      });
    const { history } = this.props;
    history.push('/home');
  };

  handleGoBack = e => {
    const { history } = this.props;
    history.push('/home');
  };

  render() {
    const { journal } = this.state;
    const {
      history: { goBack },
    } = this.props;
    return (
      <JournalPage
        journal={journal}
        handleGoBack={goBack}
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
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    uid: propTypes.string.isRequired,
    user: propTypes.object.isRequired,
    db: propTypes.object.isRequired,
    collection: propTypes.object.isRequired,
  }).isRequired,
};

const AuthJournal = compose(
  withAuth,
  withFirebase
)(Journal);

export default AuthJournal;
