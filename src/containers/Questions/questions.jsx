import React from 'react';
import { Steps, Button, message, Input } from 'antd';
import './questions.css';
import data from './data';

const { TextArea } = Input;
const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: 'First-content',
    heading: 'Today, Iam grateful for',
  },
  {
    title: 'Second',
    content: 'Second-content',
    heading: 'Challenge I face',
  },
  {
    title: 'Last',
    content: 'Last-content',
    heading: 'Iam looking to develop',
  },
];

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      story: data,
    };
  }

  componentDidMount() {
    // fetch data from firbase db by using axios
  }

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
    const { current, story } = this.state;
    return (
      <div>
        {/* <Steps current={current}>
          {story.map(detail => (
            <Step key={detail.key} title="go" />
          ))}
        </Steps> */}

        <Steps current={current}>
          <Step />
          <Step />
          <Step />
        </Steps>

        <div className="question">
          <p>{story[current].heading}</p>
          <Input placeholder="Title" value={story[current].title} />
          <TextArea
            rows={4}
            placeholder="Write your words"
            value={story[current].content}
          />
        </div>

        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Skip
            </Button>
          )}
        </div>
      </div>
    );
  }
}
export default Questions;
