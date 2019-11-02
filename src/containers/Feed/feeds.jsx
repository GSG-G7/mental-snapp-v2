import React, { Component } from 'react';

import { Select } from 'antd';

import NavBar from '../../components/navigationBar';

import { ReactComponent as Logo } from '../assets/images/logo.svg';

import months from './data';

import './feeds.css';

const { Option } = Select;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  handleChange = value => {
    // fetch matched data from firebase firstore
    // async
    // const result = await axios.post(`https:-------`, {month: value});
    // const cards = result.data.data[0];
    //   this.setState({ data: cards });
    // });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="feeds">
        <div className="feeds__content">
          <Logo className="feeds__logo" />
          <Select
            defaultValue="September"
            className="feeds__select"
            onChange={this.handleChange}
          >
            {months.map(element => (
              <Option key={element.id} value={element.value}>
                {element.month}
              </Option>
            ))}
          </Select>
        </div>

        {data ? (
          <p>You have 3 entries</p> // matched entries will be rendered here
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
