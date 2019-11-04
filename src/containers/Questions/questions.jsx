import React from 'react';

import propTypes from 'prop-types';

import { Button, message, Input, Progress, Icon, Popconfirm } from 'antd';

import BackButton from '../../components/BackButton';
import schema from './questionValidation';
import './questions.css';

const { TextArea } = Input;
const journals = [];

const entryData = [
  {
    id: 1,
    heading: 'Today, Iam grateful for',
    percent: 34,
  },
  {
    id: 2,
    heading: 'Challenge I face',
    percent: 68,
  },
  {
    id: 3,
    heading: 'Iam looking to develop',
    percent: 100,
  },
];

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      title: '',
      content: '',
      errors: {},
    };
  }

  confirm = e => {
    message.success("You didn't make an entry today");
    const { history } = this.props;
    history.push('/home');
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value, errors: {} });
  };

  next = async () => {
    const { current, title, content } = this.state;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
      journals.push({ title, content });
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

  finish = async () => {
    const { title, content } = this.state;
    const { history } = this.props;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
      message.success('Yes, you have added a journal');
      return history.push('/home');
      // here, a request will be post to firebase to save data
      // that will be as follows : [{title:'', content:''}]
    } catch (error) {
      const objError = {};
      error.inner.forEach(fielderror => {
        objError[fielderror.path] = fielderror.message;
      });
      return this.setState({ errors: objError });
    }
  };

  prev = () => {
    const { current } = this.state;
    const curr = current - 1;
    this.setState({ current: curr, errors: {} });
  };

  skip = () => {
    const { current } = this.state;
    if (current < entryData.length - 1) {
      const curr = current + 1;
      this.setState({ current: curr, errors: {} });
    } else {
      const { history } = this.props;
      if (journals.length !== 0) {
        message.success('Yes, you have added a journal');
        history.push('/home');
        // here, a request will be post to firebase to save data
        // that will be as follows : [{title:'', content:''}]
      }
      message.warning("You didn't make an entry today");
      history.push('/home');
    }
  };

  render() {
    const { errors, current, title, content } = this.state;
    const {
      history: { goBack },
    } = this.props;
    return (
      <div>
        <div className="question__navigation">
          {current > 0 ? (
            <Icon type="left" onClick={() => this.prev()} />
          ) : (
            <BackButton handleBack={goBack} />
          )}
          <div>
            <Popconfirm
              title="Do you really want to exit?"
              onConfirm={this.confirm}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="cancel"
            >
              <Icon type="close" />
            </Popconfirm>
          </div>
        </div>
        <div className="question__type">
          <p>
            Question 3·/
            {current + 1}
          </p>
          <Progress
            percent={entryData[current].percent}
            size="small"
            showInfo={false}
          />
          <p>{entryData[current].heading}</p>
          <div className="question__title">
            <Input
              placeholder="Title"
              name="title"
              value={title}
              autoComplete="off"
              onChange={this.handleChange}
            />
            {errors.title && (
              <span className="question__error-field">{errors.title}</span>
            )}
          </div>
          <div className="question__content">
            <TextArea
              rows={4}
              placeholder="Write your words"
              name="content"
              value={content}
              onChange={this.handleChange}
            />
            {errors.content && (
              <span className="question__error-field">{errors.content}</span>
            )}
          </div>
        </div>

        <div className="question__steps-action">
          {current < entryData.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === entryData.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                this.finish();
              }}
            >
              Done
            </Button>
          )}

          {current < entryData.length - 1 ? (
            <Button style={{ marginLeft: 8 }} onClick={() => this.skip()}>
              Skip
            </Button>
          ) : (
            <Button style={{ marginLeft: 8 }} onClick={() => this.skip()}>
              Skip
            </Button>
          )}
        </div>
      </div>
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
