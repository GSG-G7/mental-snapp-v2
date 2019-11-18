export default data => {
  const days = [];
  if (data !== undefined) {
    data.forEach(journal => {
      days.push({ date: new Date(journal.timestamp).toISOString(), count: 0 });
    });

    days.forEach(day => {
      data.forEach(journal => {
        if (
          new Date(journal.timestamp).getDay() === new Date(day.date).getDay()
        ) {
          day.count += 1;
        }
      });
    });
  }
  return days;
};
