import React, { Component } from 'react';
import { message } from 'antd';
import propTypes from 'prop-types';
import HomePage from './home';
import { withFirebase } from '../Firebase/index';

import { journalsData, username, usergoal } from './staticData';

class Home extends Component {
  state = {
    isEditable: false,
    userName: 'Alaa Taima',
    journals: [],
    goal: '',
  };

  componentDidMount() {
    // setState to journals and goal that we got from firebase
    this.setState({
      journals: journalsData,
      userName: username,
      goal: usergoal,
    });
  }

  handleClick = () => this.setState({ isEditable: true });

  handelSave = () => {
    const { goal } = this.state;
    const { firebase } = this.props;
    this.setState({ isEditable: false });
    // update the goal
    // firebase
    const userId = firebase.auth.currentUser.uid;

    firebase.user(userId).set({ goal }, { merge: true });
  };

  handleDelete = id => {
    const { journals } = this.state;
    message.warning('This Journal is deleted');
    // 1- this card will be deleted from firbase store.
    // 2- also it will be deleted from state as follows :

    this.setState({
      journals: journals.filter(card => card.id !== id),
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
    const { isEditable, userName, journals, goal } = this.state;
    return (
      <HomePage
        isEditable={isEditable}
        userName={userName}
        journals={journals}
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
    firestore: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
  }).isRequired,
};
