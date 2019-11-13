/* eslint-disable react/prop-types */
import React from 'react';
import propTypes from 'prop-types';
import { message } from 'antd';
import Question from './questions';
import { withFirebase } from '../Firebase/index';

import schema from './questionValidation';
import entryData from './data';

const userJournals = [];

class Questions extends React.Component {
  state = {
    current: 0,
    title: '',
    content: '',
    errors: {},
    journals: [{}],
  };

  componentDidMount() {
    this.setState({ journals: [{}] });
  }

  handleConfirm = e => {
    message.warning("You didn't make an entry today");
    const { history } = this.props;
    history.push('/home');
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value, errors: {} });
  };

  handleNext = async () => {
    const { title, content, journals } = this.state;
    let { current } = this.state;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
      current += 1;
      if (current === 1) {
        journals[0].grateful = { title, body: content };
      } else if (current === 2) {
        journals[0].challenge = { title, body: content };
      }
      return this.setState({
        current,
        content: '',
        title: '',
        errors: {},
      });
    } catch (error) {
      const objError = {};
      error.inner.forEach(fielderror => {
        objError[fielderror.path] = fielderror.message;
      });
      return this.setState({ errors: objError });
    }
  };

  handleSubmit = async () => {
    const { title, content, journals } = this.state;
    const { history, firebase } = this.props;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
      journals[0].developing = { title, body: content };
      journals[0].timestamp = new Date().toString();
      userJournals.push(journals[0]);

      // firebase
      const userId = firebase.auth.currentUser.uid;
      firebase.user(userId).set({ userJournals }, { merge: true });

      // console.log(userJournals);
      message.success('Yes, you have added a journal');
      history.push('/home');
      return this.setState({
        journals: [{}],
      });
    } catch (error) {
      const objError = {};
      error.inner.forEach(fielderror => {
        objError[fielderror.path] = fielderror.message;
      });
      return this.setState({ errors: objError });
    }
  };

  handlePrev = () => {
    const { current } = this.state;
    this.setState({ current: current - 1, errors: {} });
  };

  handleSkip = () => {
    const { current, journals } = this.state;
    if (current < entryData.length - 1) {
      this.setState({ current: current + 1, errors: {} });
    } else {
      const { history, firebase } = this.props;
      if (
        journals[0].grateful === undefined &&
        journals[0].challenge === undefined
      ) {
        message.warning("You didn't make an entry today");
        history.push('/home');
        this.setState({ journals: [{}] });
      } else {
        journals[0].timestamp = new Date().toString();
        userJournals.push(journals[0]);

        // firebase
        const userId = firebase.auth.currentUser.uid;
        firebase.user(userId).set({ userJournals }, { merge: true });
        message.success('Yes, you have added a journal');
        history.push('/home');
        this.setState({ journals: [{}] });
      }
    }
  };

  render() {
    const {
      history: { goBack },
    } = this.props;
    const { errors } = this.state;
    return (
      <Question
        state={this.state}
        handleNext={this.handleNext}
        handlePrev={this.handlePrev}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleSkip={this.handleSkip}
        handleGoBack={goBack}
        handleConfirm={this.handleConfirm}
        errors={errors}
      />
    );
  }
}

Questions.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    goBack: propTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(Questions);
