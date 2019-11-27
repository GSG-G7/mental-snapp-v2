import moment from 'moment';

const decrementMonthCount = (currentMonthJournal, monthsWithCounts) => {
  const deletedCardMonth = moment(currentMonthJournal[0].timestamp).format(
    'MMMM'
  );

  return monthsWithCounts.map(month => {
    if (month.month === deletedCardMonth) {
      month.count--;
    }
    return month;
  });
};

export default decrementMonthCount;
