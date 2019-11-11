import React, { Component } from 'react';
import { message } from 'antd';
import propTypes from 'prop-types';
import HomePage from './home';
import { withFirebase } from '../Firebase/index';

class Home extends Component {
  state = {
    isEditable: false,
    name: '',
    journals: [],
    goal: '',
    recentJournals: [],
  };

  componentDidMount() {
    let { recentJournals } = this.state;
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');
    // setState to journals and goal that we got from firebase
    firebase.db
      .collection('users')
      .doc(userId)
      .get()
      .then(snapshot => {
        const userGoal = snapshot.data().goal;
        const userName = snapshot.data().name;
        if (snapshot.data().userJournals) {
          const userJournal = snapshot.data().userJournals;
          if (userJournal.length === 0) {
            return recentJournals;
          }
          if (userJournal.length > 3) {
            recentJournals = userJournal.slice(-3);
          } else if (userJournal.length <= 3) {
            recentJournals = userJournal.slice(-1);
          }
          return this.setState({
            journals: userJournal,
            name: userName,
            goal: userGoal,
            recentJournals,
          });
        }
        return this.setState({
          name: userName,
          goal: userGoal,
        });
      });
  }

  handleClick = () => this.setState({ isEditable: true });

  handelSave = () => {
    const { goal } = this.state;
    const { firebase } = this.props;
    this.setState({ isEditable: false });

    const userId = firebase.auth.currentUser.uid;
    firebase.user(userId).set({ goal }, { merge: true });
  };

  handleDelete = id => {
    const { journals } = this.state;
    const { firebase } = this.props;
    const userId = firebase.auth.currentUser.uid;
    message.warning('This Journal is deleted');
    // 1- this card will be deleted from firbase store.
    firebase.db
      .collection('users')
      .doc(userId)
      .update({
        userJournals: journals.filter(journal => journal.timestamp !== id),
      });
    // 2- also it will be deleted from state as follows :
    this.setState({
      journals: journals.filter(journal => journal.timestamp !== id),
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
    const { isEditable, name, journals, goal, recentJournals } = this.state;
    return (
      <HomePage
        isEditable={isEditable}
        userName={name}
        journals={journals}
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

export default withFirebase(Home);

Home.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    currentUser: propTypes.object.isRequired,
    uid: propTypes.string.isRequired,
    user: propTypes.object.isRequired,
    db: propTypes.object.isRequired,
    collection: propTypes.object.isRequired,
  }).isRequired,
};
