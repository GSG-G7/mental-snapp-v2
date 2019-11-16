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
        loading: true,
      };
    }

    componentDidMount() {
      const { firebase } = this.props;
      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          if (authUser.uid === localStorage.getItem('userId'))
            this.setState({ authUser: authUser.uid, loading: false });
          else {
            localStorage.removeItem('userId');
            this.setState({ authUser: null, loading: false });
          }
        } else {
          this.setState({ authUser: null, loading: false });
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser, loading } = this.state;
      return (
        <AuthUserContext.Provider value={{ authUser, loading }}>
          <Component {...this.props} authUser={authUser} />
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
