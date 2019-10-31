import React from 'react';
import { Button, message, Input, Progress } from 'antd';
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
      story: [],
    };
  }

  componentDidMount() {
    // fetch data from firbase db by using axios
    // this.setState({story:data})
    // **** so the value for input and TextArea will be as follows :
    // 1- value = {story[current].title} for input
    // 2- value = {story[current].content} for TextArea
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
          <Input placeholder="Title" value="" />
          <TextArea rows={4} placeholder="Write your words" value="" />
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
              onClick={() => message.success('Processing complete!')}
            >
              Done
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
export default Questions;
