import React, { Component } from 'react';
import HomePage from './home';

class Home extends Component {
  state = {
    isEditable: false,
    userName: 'Alaa Taima',
    journals: [
      {
        id: 'dhdhdh',
        grateful: {
          title: 'Family',
          body: 'some dummy and very stupid data',
        },
        developing: {
          title: 'not finding time',
          body: 'some dummy and very stupid data',
        },
        challenge: {
          title: 'reading more articles',
          body: 'some dummy and very stupid data',
        },
        timestamp: '2019-10-30T09:17:27.037Z',
      },
      {
        id: 'ffff',
        grateful: {
          title: 'Family',
          body: 'some dummy and very stupid data',
        },
        developing: {
          title: 'not finding time',
          body: 'some dummy and very stupid data',
        },
        challenge: {
          title: 'reading more books',
          body: 'some dummy and very stupid data',
        },
        timestamp: '2019-10-30T09:17:27.037Z',
      },
    ],
    goal: 'Manage my tasks to finish them.',
  };

  componentDidMount() {
    // setState to journals and goal that we got from firebase
  }

  handleClick = () => this.setState({ isEditable: true });

  handelSave = () => {
    this.setState({ isEditable: false });
    // update the goal
  };

  handleBlur = ({ target }) => this.setState({ goal: target.textContent });

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
      />
    );
  }
}

export default Home;
