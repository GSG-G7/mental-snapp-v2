import React from 'react';
import propTypes from 'prop-types';
import { message } from 'antd';
import Question from './questions';

import schema from './questionValidation';
import entryData from './data';

class Questions extends React.Component {
  state = {
    current: 0,
    title: '',
    content: '',
    errors: {},
    answers: [],
  };

  handleConfirm = e => {
    message.warning("You didn't make an entry today");
    const { history } = this.props;
    history.push('/home');
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value, errors: {} });
  };

  handleNext = async () => {
    const { current, title, content, answers } = this.state;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
      answers.push({ title, content });
      return this.setState({
        current: current + 1,
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
    const { title, content, answers } = this.state;
    const { history } = this.props;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
      answers.push({ title, content });
      message.success('Yes, you have added a journal');
      history.push('/home');
      // here, a request will be post to firebase to save data
      // that will be as follows : [{title:'', content:'', time:'', date:'',month:''}]
      return this.setState({ answers: [] });
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
    const { current, answers } = this.state;
    if (current < entryData.length - 1) {
      this.setState({ current: current + 1, errors: {} });
    } else {
      const { history } = this.props;
      if (answers.length !== 0) {
        message.success('Yes, you have added a journal');
        history.push('/home');
        // here, a request will be post to firebase to save data
        // that will be as follows : [{title:'', content:'', time:'', date:'',month:''}]
        this.setState({ answers: [] });
      } else {
        message.warning("You didn't make an entry today");
        history.push('/home');
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

export default Questions;
