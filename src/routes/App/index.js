import React from 'react';
import 'antd/dist/antd.css';
import ServerError from '../../containers/errors/ServerError';
import './style.css';

const App = () => {
  return (
    <div className="App">
      <h1>Hello from App</h1>
      <ServerError />
    </div>
  );
};

export default App;
