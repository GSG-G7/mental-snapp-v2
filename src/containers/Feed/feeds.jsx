/* eslint-disable no-nested-ternary */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Select, Spin } from 'antd';

import NavBar from '../../components/navigationBar';
import JournalCard from '../../components/JournalCard';
import LogoHeader from '../../components/LogoHeader';
import './feeds.css';

const { Option } = Select;

const Feed = props => {
  const {
    data,
    monthCount,
    loading,
    handleChange,
    handleDelete,
    handleJournalDetails,
  } = props;
  return (
    <div className="feeds">
      <div className="feeds__content container">
        <LogoHeader />
        <br />
        <Select
          defaultValue={moment(new Date()).format('MMMM')}
          className="feeds__select"
          onChange={handleChange}
        >
          {monthCount.map(element => (
            <Option
              className="feeds__option"
              key={element.id}
              value={element.month}
            >
              <span>{element.month}</span>
              <span>{element.count}</span>
            </Option>
          ))}
        </Select>
      </div>
      <div className="feed_journals container">
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '9vh' }}>
            <Spin size="large" />
          </div>
        ) : data.length > 0 ? (
          data.map(journal => (
            <JournalCard
              key={journal.timestamp}
              time={moment(journal.timestamp).format('h:mm a')}
              date={moment(journal.timestamp).format('MMMM Do YYYY')}
              grateful={journal.grateful && journal.grateful.title}
              challenge={journal.challenge && journal.challenge.title}
              developing={journal.developing && journal.developing.title}
              handleDelete={() => handleDelete(journal.timestamp)}
              journalId={journal.timestamp}
              handleJournalDetails={handleJournalDetails}
            />
          ))
        ) : (
          <h2 className="feeds__message">
            No entries for this month, choose another one
          </h2>
        )}
      </div>
      <NavBar />
    </div>
  );
};

Feed.propTypes = {
  data: PropTypes.arrayOf.isRequired,
  monthCount: PropTypes.arrayOf.isRequired,
  loading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleJournalDetails: PropTypes.func.isRequired,
};

export default Feed;
