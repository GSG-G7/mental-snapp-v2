import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import { withAuth } from '../Session/index';
import { withFirebase } from '../Firebase/index';

import JournalPage from './journal';
import { HEAT_MAP, HOME } from '../../constants/routes';

class Journal extends Component {
  state = {
    journal: {},
    loading: false,
  };

  async componentDidMount() {
    const {
      firebase,
      match: { params },
    } = this.props;
    const { id } = params;
    const result = await firebase.db.collection('journals').get();

    await result.forEach(docus => {
      if (docus.id === id) {
        this.setState({ journal: docus.data(), loading: true });
      }
    });
  }

  handleConfirm = () => {
    const {
      match: {
        params: { id },
      },
      firebase,
    } = this.props;
    this.setState({ journal: {} });
    firebase.db
      .collection('journals')
      .doc(id)
      .delete();
    const { history } = this.props;
    history.push(HEAT_MAP);
  };

  handleGoBack = e => {
    const { history } = this.props;
    history.push(HOME);
  };

  render() {
    const { journal, loading } = this.state;
    const {
      history: { goBack },
    } = this.props;
    return (
      <JournalPage
        journal={journal}
        handleGoBack={goBack}
        handleConfirm={this.handleConfirm}
        loading={loading}
      />
    );
  }
}

Journal.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    goBack: propTypes.func.isRequired,
  }).isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    user: propTypes.func.isRequired,
    db: propTypes.object.isRequired,
  }).isRequired,
};

const AuthJournal = compose(
  withAuth,
  withFirebase
)(Journal);

export default AuthJournal;
