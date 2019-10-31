import React from 'react';
import UnAthenticated from './index';

export default {
  component: UnAthenticated,
  title: 'UnAthenticated',
};

export const authentication = () => (
  <UnAthenticated text="You are unthenticated" />
);
