import React, { Component } from 'react';
import { message } from 'antd';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import HomePage from './home';
import { withFirebase } from '../Firebase/index';
import { withAuth } from '../Session/index';

class Home extends Component {
  state = {
    isEditable: false,
    name: '',
    journals: [],
    goal: '',
    recentJournals: [],
    loading: true,
  };

  componentDidMount() {
    let { recentJournals } = this.state;
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');
    firebase.db
      .collection('users')
      .doc(userId)
      .onSnapshot(snapshot => {
        const userGoal = snapshot.data().goal;
        const userName = `${snapshot.data().name}'s`;
        if (snapshot.data().userJournals) {
          const userJournal = snapshot.data().userJournals;
          if (userJournal.length > 3) {
            recentJournals = userJournal.slice(-3);
          } else if (userJournal.length <= 3) {
            recentJournals = userJournal;
          }
          return this.setState({
            journals: userJournal,
            name: userName,
            goal: userGoal,
            recentJournals,
            loading: false,
          });
        }
        return this.setState({
          name: userName,
          goal: userGoal,
          loading: false,
        });
      });
  }

  handleClick = () => this.setState({ isEditable: true });

  handelSave = () => {
    const { goal } = this.state;
    const { firebase } = this.props;
    this.setState({ isEditable: false });

    const userId =
      firebase.auth.currentUser.uid || localStorage.getItem('userId');
    firebase.user(userId).set({ goal }, { merge: true });
  };

  handleDelete = id => {
    const { journals } = this.state;
    const { firebase } = this.props;
    const userId =
      firebase.auth.currentUser.uid || localStorage.getItem('userId');
    message.warning('This Journal is deleted');
    const filteredJournals = journals.filter(
      journal => journal.timestamp !== id
    );
    firebase.db
      .collection('users')
      .doc(userId)
      .update({
        userJournals: filteredJournals,
      });
    this.setState({
      journals: filteredJournals,
    });
  };

  handleBlur = ({ target }) => this.setState({ goal: target.textContent });

  handleJournalDetails = id => {
    const {
      history: { push },
      match: { params },
    } = this.props;
    params.id = id;
    push(`/journal/${id}`);
  };

  render() {
    const {
      isEditable,
      name,
      journals,
      goal,
      recentJournals,
      loading,
    } = this.state;
    return (
      <HomePage
        isEditable={isEditable}
        userName={name}
        journals={journals}
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
