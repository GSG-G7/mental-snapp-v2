/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import { message } from 'antd';
import { withAuth } from '../Session/index';
import Question from './questions';
import { withFirebase } from '../Firebase/index';

import schema from './questionValidation';
import entryData from './data';
import { HOME } from '../../constants/routes';

class Questions extends React.Component {
  state = {
    current: 0,
    title: '',
    content: '',
    errors: {},
    journals: [{}],
    emojiId: 0,
  };

  nextAnswers = {};

  getEmojiId = ({ target: { id } }) => {
    const { emojiId } = this.state;
    if (emojiId === id) {
      this.setState({ emojiId: 0 });
    } else this.setState({ emojiId: id });
  };

  handleConfirm = e => {
    const {
      history: { push },
    } = this.props;
    message.warning("You didn't make an entry today");
    push(HOME);
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
      } else if (current === 3) {
        journals[0].developing = { title, body: content };
      }
      return this.setState({
        current,
        content: this.nextAnswers[`content${current}`] || '',
        title: this.nextAnswers[`title${current}`] || '',
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

  handleSubmitEithEmoji = () => {
    const { journals, emojiId } = this.state;
    const { history, firebase } = this.props;

    journals[0].timestamp = new Date().toString();
    journals[0].userId = firebase.auth.currentUser.uid;
    journals[0].emojiId = emojiId;

    firebase.db
      .collection('journals')
      .doc()
      .set({ ...journals[0] });

    message.success('Yes, you have added a journal');
    history.push(HOME);
    return this.setState({
      journals: [{}],
    });
  };

  handleSubmit = async () => {
    const { emojiId, current } = this.state;
    try {
      return current === 3 && emojiId === 0
        ? message.warning('You choose an emoji')
        : this.handleSubmitEithEmoji();
    } catch (error) {
      const objError = {};
      error.inner.forEach(fielderror => {
        objError[fielderror.path] = fielderror.message;
      });
      return this.setState({ errors: objError });
    }
  };

  handlePrev = () => {
    let title;
    let content;
    const {
      current,
      journals,
      title: currentTitle,
      content: currentContent,
    } = this.state;
    if (currentTitle || currentContent) {
      this.nextAnswers[`title${current}`] = currentTitle;
      this.nextAnswers[`content${current}`] = currentContent;
    }
    if (current === 1) {
      title = journals[0].grateful.title;
      content = journals[0].grateful.body;
    } else if (current === 2) {
      title = journals[0].challenge.title;
      content = journals[0].challenge.body;
    } else if (current === 3) {
      title = journals[0].developing.title;
      content = journals[0].developing.body;
    }
    this.setState({ current: current - 1, errors: {}, title, content });
  };

  handleSkip = () => {
    const { current } = this.state;
    if (current < entryData.length - 1) {
      this.setState({
        current: current + 1,
        errors: {},
      });
    }
  };

  render() {
    const {
      history: { goBack },
    } = this.props;
    const { errors, emojiId, current } = this.state;
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
        emojiClick={this.getEmojiId}
        emojiId={emojiId}
        current={current}
      />
    );
  }
}

Questions.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    goBack: propTypes.func.isRequired,
  }).isRequired,

  firebase: propTypes.shape({
    auth: propTypes.shape().isRequired,
    db: propTypes.shape().isRequired,
  }).isRequired,
};

const AuthQuestion = compose(
  withAuth,
  withFirebase
)(Questions);

export default AuthQuestion;
