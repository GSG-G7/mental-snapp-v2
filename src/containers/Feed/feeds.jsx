/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import moment from 'moment';
import { Select } from 'antd';

import NavBar from '../../components/navigationBar';

import JournalCard from '../../components/JournalCard';

import { months, fakeData } from './data';

import './feeds.css';
import LogoHeader from '../../components/LogoHeader';

const { Option } = Select;
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      monthCount: months,
    };
  }

  componentDidMount() {
    // fetch all data from firebase firstore
    // async
    // const result = await axios.get(`https:-------`);
    // const cards = result.data.data[0];
    // cards === fackData
    //
    const monthArray = fakeData.map(journal =>
      moment(journal.timestamp).format('MMMM')
    );
    const filteredObject = monthArray.reduce((acc, curr) => {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});

    const keys = Object.keys(filteredObject);

    for (let i = 0; i < months.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        if (months[i].month === keys[j]) {
          months[i].count = filteredObject[keys[j]];
        }
      }
    }
    return this.setState({ monthCount: months });
  }

  handleChange = value => {
    const selectedJournal = fakeData.filter(
      journal => moment(journal.timestamp).format('MMMM') === value
    );
    this.setState({ data: selectedJournal });
  };

  render() {
    const { data, monthCount } = this.state;
    return (
      <div className="feeds">
        <div className="feeds__content">
          <LogoHeader />
          <Select
            defaultValue="select a month"
            className="feeds__select"
            onChange={this.handleChange}
          >
            {monthCount.map(element => (
              <Option
                className="feeds__option"
                key={element.id}
                value={element.value}
              >
                <span>{element.month}</span>
                <span>{element.count}</span>
              </Option>
            ))}
          </Select>
        </div>

        {data.length > 0 ? (
          data.map(journal => (
            <JournalCard
              key={journal.id}
              time={moment(journal.timestamp).format('MMMM Do')}
              date={moment(journal.timestamp).format('h:mm a')}
              grateful={journal.grateful.title}
              challenge={journal.challenge.title}
              developing={journal.developing.title}
            /> // matched entries will be rendered here
          ))
        ) : (
          <h2 className="feeds__message">
            No entries for this month, choose another one
          </h2>
        )}

        <NavBar />
      </div>
    );
  }
}

export default Feed;
