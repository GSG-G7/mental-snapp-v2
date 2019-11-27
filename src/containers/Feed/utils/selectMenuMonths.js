import moment from 'moment';
import months from '../data';

const selectMenuMonths = userJournals => {
  const allYearMonths = [...months];

  const monthsArray = userJournals.map(journal =>
    moment(journal.timestamp).format('MMMM')
  );

  // Getting each month a and how many journals in it
  const monthsWithNumberOfJournals = monthsArray.reduce((acc, curr) => {
    if (typeof acc[curr] === 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});

  const allMonths = Object.keys(monthsWithNumberOfJournals);

  // Adding a count to the months array which goes to the select
  for (let i = 0; i < months.length; i++) {
    for (let j = 0; j < allMonths.length; j++) {
      if (months[i].month === allMonths[j]) {
        months[i].count = monthsWithNumberOfJournals[allMonths[j]];
      }
    }
  }
  return allYearMonths;
};

export default selectMenuMonths;
