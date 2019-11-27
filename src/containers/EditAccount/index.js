import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Form, message } from 'antd';

import EditAccount from './editAccount';
import { withAuth } from '../Session/index';
import { withFirebase } from '../Firebase';
import { ACCOUNT_SETTINGS } from '../../constants/routes';

class EditAccountPage extends Component {
  state = {
    info: {
      name: '',
      email: '',
    },
    checked: false,
    error: '',
  };

  async componentDidMount() {
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');

    try {
      const user = await firebase.user(userId).get();
      const userInfo = {
        name: user.data().name,
        email: user.data().email,
      };
      this.setState({
        info: userInfo,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  handleSubmit = e => {
    const {
      firebase,
      form: { validateFields },
      history: { push },
    } = this.props;

    e.preventDefault();
    const user = firebase.auth.currentUser;
    const userId = localStorage.getItem('userId');
    // Validate form fields on submit
    validateFields(async (err, values) => {
      if (!err) {
        try {
          if (!values.password) {
            await user.updateProfile({
              displayName: values.name,
            });
            await user.updateEmail(values.email);

            await firebase
              .user(userId)
              .set({ name: values.name, email: values.email }, { merge: true });
          } else {
            await user.updateProfile({
              displayName: values.name,
            });
            await user.updateEmail(values.email);
            await user.updatePassword(values.password);

            await firebase
              .user(userId)
              .set({ name: values.name, email: values.email }, { merge: true });
          }

          localStorage.removeItem('confirm');
          push(ACCOUNT_SETTINGS);
          message.success('Account updated successfully');
        } catch (error) {
          if (error.message) this.setState({ error: error.message });
        }
      }
    });
  };

  handleCheckBoxChange = ({ target: { checked } }) =>
    this.setState({ checked });

  render() {
    const {
      history: { push },
      form: { getFieldDecorator },
    } = this.props;
    const { info, checked, error } = this.state;
    return (
      <EditAccount
        userInfo={info}
        checked={checked}
        handleChange={this.handleCheckBoxChange}
        handlePush={push}
        error={error}
        handleGoBack={push}
        handleSubmit={this.handleSubmit}
        getFieldDecorator={getFieldDecorator}
      />
    );
  }
}

EditAccountPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    user: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
};

const editAccount = Form.create({ name: 'Edit Account' })(EditAccountPage);

const AuthEditAccount = compose(
  withAuth,
  withFirebase
)(editAccount);

export default AuthEditAccount;
