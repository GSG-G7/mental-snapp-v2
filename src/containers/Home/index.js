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
    loading: true,
  };

  componentDidMount() {
    let { recentJournals } = this.state;
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');
    // setState to journals and goal that we got from firebase
    firebase.db
      .collection('users')
      .doc(userId)
      .onSnapshot(snapshot => {
        const userGoal = snapshot.data().goal;
        const userName = snapshot.data().name;
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
    // update the goal
    // firebase
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
    // 1- this card will be deleted from firbase store.
    const filteredJournals = journals.filter(
      journal => journal.timestamp !== id
    );
    firebase.db
      .collection('users')
      .doc(userId)
      .update({
        userJournals: filteredJournals,
      });
    // 2- also it will be deleted from state as follows :
    this.setState({
      journals: filteredJournals,
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

export default withFirebase(Home);

Home.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    uid: propTypes.string,
    user: propTypes.func.isRequired,
    db: propTypes.object.isRequired,
    collection: propTypes.object.isRequired,
    currentUser: propTypes.object.isRequired,
  }).isRequired,
};
