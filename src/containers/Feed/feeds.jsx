/* eslint-disable no-plusplus */
import React, { Component } from 'react';
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
    const monthArray = fakeData.map(journal => journal.date);

    const filteredArray = monthArray.reduce((acc, curr) => {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});

    this.setState({ monthCount: filteredArray });
    const keys = Object.keys(filteredArray);

    for (let i = 0; i < months.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        if (months[i].month === keys[j]) {
          months[i].count = filteredArray[keys[j]];
        }
      }
    }
    return this.setState({ monthCount: months });
    // fetch all data from firebase firstore
    // async
    // const result = await axios.get(`https:-------`);
    // const cards = result.data.data[0];
    //   this.setState({ data: cards });
    // });
    // getMonth()+1 for month
  }

  handleChange = value => {
    const selectedJournal = fakeData.filter(journal => journal.date === value);
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
              time={journal.time}
              date={journal.date}
              grateful={journal.grateful}
              challenge={journal.challenge}
              developing={journal.developing}
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
