import React, { Component } from 'react';
import propTypes from 'prop-types';
import { message } from 'antd';
import { compose } from 'recompose';

import HomePage from './home';
import { withAuth } from '../Session/index';
import { withFirebase } from '../Firebase/index';

class Home extends Component {
  state = {
    isEditable: false,
    name: '',
    goal: '',
    recentJournals: [],
    loading: true,
  };

  async componentDidMount() {
    const {
      firebase,
      history: { push },
    } = this.props;
    const userId = localStorage.getItem('userId');
    try {
      await firebase.db
        .collection('users')
        .doc(userId)
        // Listening for changes in the user's document
        .onSnapshot(snapshot => {
          const userGoal = snapshot.data().goal;
          const userName = `${snapshot.data().name}'s`;
          return this.setState({
            name: userName,
            goal: userGoal,
            loading: false,
          });
        });
      // Getting the user's recent journals
      const userJournals = await firebase.db
        .collection('journals')
        .where('userID', '==', userId)
        .orderBy('timestamp', 'des')
        .limit(3)
        .get();

      this.setState({
        recentJournals: userJournals,
      });
    } catch (error) {
      push('/server-error');
    }
  }

  handleClick = () => this.setState({ isEditable: true });

  handelSave = () => {
    const { goal } = this.state;
    const { firebase } = this.props;
    this.setState({ isEditable: false });

    const userId = localStorage.getItem('userId');
    firebase.user(userId).set({ goal }, { merge: true });
  };

  handleDelete = async id => {
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');
    message.warning('This Journal is deleted');

    await firebase.db
      .collection('journals')
      .doc(id)
      .delete();

    // Getting the user's recent journals
    const userJournals = await firebase.db
      .collection('journals')
      .where('userID', '==', userId)
      .orderBy('timestamp', 'des')
      .limit(3)
      .get();

    this.setState({
      recentJournals: userJournals,
    });
  };

  handleBlur = ({ target }) => this.setState({ goal: target.textContent });

  handleJournalDetails = id => {
    const {
      history: { push },
    } = this.props;
    push(`/journal/${id}`);
  };

  render() {
    const { isEditable, name, goal, recentJournals, loading } = this.state;
    return (
      <HomePage
        isEditable={isEditable}
        userName={name}
        loading={loading}
        recentJournals={recentJournals}
        goal={goal}
        handelSave={this.handelSave}
        handleClick={this.handleClick}
        handleBlur={this.handleBlur}
        handleDelete={this.handleDelete}
        handleJournalDetails={this.handleJournalDetails}
      />
    );
  }
}

const AuthHome = compose(
  withAuth,
  withFirebase
)(Home);

export default AuthHome;

Home.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  match: propTypes.shape({
    params: propTypes.object.isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    user: propTypes.func.isRequired,
    db: propTypes.object.isRequired,
  }).isRequired,
};
