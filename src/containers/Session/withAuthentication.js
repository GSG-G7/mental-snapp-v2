import React from 'react';
import propTypes from 'prop-types';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      const { firebase } = this.props;
      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        authUser.uid === localStorage.getItem('userId')
          ? this.setState({ authUser: authUser.uid })
          : this.setState({ authUser: null });
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  WithAuthentication.propTypes = {
    firebase: propTypes.shape({
      auth: propTypes.object.isRequired,
    }).isRequired,
  };
  return withFirebase(WithAuthentication);
};
export default withAuthentication;
