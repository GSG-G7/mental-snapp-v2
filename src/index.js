import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import Firebase, { FirebaseContext } from './containers/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,

  document.getElementById('root')
);
