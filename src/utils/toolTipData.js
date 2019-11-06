export default value => {
  if (value.date) {
    return {
      'data-tip': `${value.date.slice(0, 10)} has ${value.count} journals`,
    };
  }
  return {
    'data-tip': 'No journals yet',
  };
};
