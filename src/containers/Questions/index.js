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
    allUserJournals: [],
  };

  nextAnswers = {};

  componentDidMount() {
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');
    firebase.db
      .collection('users')
      .doc(userId)
      .get()
      .then(snapshot => {
        if (snapshot.data().userJournals) {
          const data = snapshot.data().userJournals;
          this.setState({ allUserJournals: data });
        }
      });
  }

  handleConfirm = e => {
    message.warning("You didn't make an entry today");
    const { history } = this.props;
    history.push(HOME);
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
      console.log(this.nextAnswers);
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

  handleSubmit = async () => {
    const { title, content, journals, allUserJournals } = this.state;
    const { history, firebase } = this.props;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
      journals[0].developing = { title, body: content };
      journals[0].timestamp = new Date().toString();
      allUserJournals.push(journals[0]);

      this.setState({ allUserJournals });

      const userId = firebase.auth.currentUser.uid;
      firebase.db
        .collection('users')
        .doc(userId)
        .update({
          userJournals: allUserJournals,
          goal: title,
        });

      message.success('Yes, you have added a journal');
      history.push(HOME);
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
    console.log(this.nextAnswers);
    if (current === 1) {
      title = journals[0].grateful.title;
      content = journals[0].grateful.body;
    } else if (current === 2) {
      title = journals[0].challenge.title;
      content = journals[0].challenge.body;
    }
    this.setState({ current: current - 1, errors: {}, title, content });
  };

  handleSkip = () => {
    const { current, journals, allUserJournals } = this.state;
    if (current < entryData.length - 1) {
      this.setState({ current: current + 1, errors: {} });
    } else {
      const { history, firebase } = this.props;
      if (
        journals[0].grateful === undefined &&
        journals[0].challenge === undefined
      ) {
        message.warning("You didn't make an entry today");
        history.push(HOME);
        this.setState({ journals: [{}] });
      } else {
        journals[0].timestamp = new Date().toString();
        allUserJournals.push(journals[0]);

        const userId = firebase.auth.currentUser.uid;

        this.setState({ allUserJournals });

        firebase.db
          .collection('users')
          .doc(userId)
          .update({
            userJournals: allUserJournals,
          });
        message.success('Yes, you have added a journal');
        history.push(HOME);
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

const AuthQuestion = compose(
  withAuth,
  withFirebase
)(Questions);

export default AuthQuestion;
