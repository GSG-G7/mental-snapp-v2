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
    currentMonthJournals,
    monthsWithCounts,
    loading,
    handleChange,
    handleDelete,
    handleJournalDetails,
  } = props;

  const showCurrentMonthJournals = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', marginTop: '9vh' }}>
          <Spin size="large" />
        </div>
      );
    }
    if (currentMonthJournals.length > 0) {
      return currentMonthJournals.map((journal, index) => (
        <JournalCard
          index={index}
          key={journal.id}
          time={moment(journal.timestamp).format('h:mm a')}
          date={moment(journal.timestamp).format('MMMM Do YYYY')}
          grateful={journal.grateful && journal.grateful.title}
          challenge={journal.challenge && journal.challenge.title}
          developing={journal.developing && journal.developing.title}
          handleDelete={() => handleDelete(journal.id)}
          journalId={journal.id}
          handleJournalDetails={handleJournalDetails}
        />
      ));
    }
    return (
      <h2 className="feeds__message">
        No entries for this month, choose another one
      </h2>
    );
  };

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
          {monthsWithCounts.map(({ id, month, count }) => (
            <Option className="feeds__option" key={id} value={month}>
              <span>{month}</span>
              <span>{count}</span>
            </Option>
          ))}
        </Select>
      </div>
      <div className="feed_journals container">
        {showCurrentMonthJournals()}
      </div>
      <NavBar />
    </div>
  );
};

Feed.propTypes = {
  currentMonthJournals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  monthsWithCounts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleJournalDetails: PropTypes.func.isRequired,
};

export default Feed;
