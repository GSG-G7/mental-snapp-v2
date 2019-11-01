import React from 'react';
import propTypes from 'prop-types';
import { Button, message, Input, Progress, Icon, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { HOME } from '../../constants/routes';
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
    };
  }

  confirm = e => {
    message.success("You don't make an entry today");
    const { history } = this.props;
    history.push('/home');
  };

  next() {
    const { current } = this.state;
    const curr = current + 1;
    this.setState({ current: curr });
  }

  prev() {
    const { current } = this.state;
    const curr = current - 1;
    this.setState({ current: curr });
  }

  render() {
    const { current } = this.state;
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
            <Link to="HOME" className="question__close">
              <Icon type="close" />
            </Link>
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
          <Input placeholder="Title" />
          <TextArea rows={4} placeholder="Write your words" />
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
              onClick={() => message.success('Yes,you have added a journal')}
            >
              <Link to={HOME}>Finish</Link>
            </Button>
          )}
          {current < entryData.length - 1 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.next()}>
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
    goBack: propTypes.func.isRequired,
    push: propTypes.func.isRequired,
  }).isRequired,
};
export default Questions;
