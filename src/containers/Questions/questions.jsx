import React from 'react';

import propTypes from 'prop-types';

import { Button, message, Input, Progress, Icon, Popconfirm } from 'antd';

import schema from './questionValidation';
import './questions.css';

const { TextArea } = Input;

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
    message.success("You didn't make an entry today ): ");
    const { history } = this.props;
    history.push('/home');
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  next = async () => {
    const { current, title, content } = this.state;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
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

  finish = () => {
    const { title, content } = this.state;
    const { history } = this.props;

    schema
      .validate({ title, content }, { abortEarly: false })
      .then(e => {
        message.success('Yes, you have added a journal ');
        history.push('/home');
      })
      .catch(error => {
        const objError = {};
        error.inner.forEach(fielderror => {
          objError[fielderror.path] = fielderror.message;
        });
        return this.setState({ errors: objError });
      });
  };

  prev = () => {
    const { current } = this.state;
    const curr = current - 1;
    this.setState({ current: curr });
  };

  skip = () => {
    const { current } = this.state;
    const curr = current + 1;
    this.setState({ current: curr });
  };

  render() {
    const { errors, current, title, content } = this.state;
    return (
      <div>
        <div className="question__navigation">
          {current > 0 && <Icon type="left" onClick={() => this.prev()} />}
          <Popconfirm
            title="Do you really want to exit?"
            onConfirm={this.confirm}
            okText="Yes"
            cancelText="cancel"
          >
            <Icon type="close" />
          </Popconfirm>
        </div>
        <div className="question">
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

          <Input
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          {errors.title && <span className="error-field">{errors.title}</span>}
          <TextArea
            rows={4}
            placeholder="Write your words"
            name="content"
            value={content}
            onChange={this.handleChange}
          />
          {errors.content && (
            <span className="error-field">{errors.content}</span>
          )}
        </div>

        <div className="steps-action">
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
              Finish
            </Button>
          )}
          {current < entryData.length - 1 && (
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
  }).isRequired,
};
export default Questions;
