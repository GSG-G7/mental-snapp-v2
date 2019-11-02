import React from 'react';
import moment from 'moment';
import JournalCard from './index';

export default {
  component: JournalCard,
  title: 'Journal Card',
};

// Example of the journal object
const journal = {
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
  timestamp: '2019-10-30T09:17:27.037Z', // It will be stored in DB as an ISO string
};

export const versionOne = () => (
  <JournalCard
    time={
      moment('2019-10-30T09:17:27.037Z')
        .format('MMMM Do, h:mm a')
        .split(',')[1]
    }
    date={
      moment('2019-10-30T09:17:27.037Z')
        .format('MMMM Do, h:mm a')
        .split(',')[0]
    }
    grateful={journal.grateful.title}
    challenge={journal.challenge.title}
    developing={journal.developing.title}
  />
);
