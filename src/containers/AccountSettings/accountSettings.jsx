/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Spin } from 'antd';

import LogoHeader from '../../components/LogoHeader';
import SubHeading from '../../components/subHeading';
import NavigationBar from '../../components/navigationBar';

import './accountSettings.css';

const accountSettings = ({ info, handleLogOut, loading }) => {
  const redirect = () => {
    if (!info.createdByGoogle && !info.createdByTwitter) {
      return '/confirm-password';
    }
    if (info.createdByGoogle) {
      return 'https://myaccount.google.com/personal-info';
    }
    if (info.createdByTwitter) {
      return 'https://twitter.com/settings/account';
    }
    return '/home';
  };

  return (
    <div className="settings">
      <div className="container">
        <LogoHeader />
      </div>

      <div className="settings__desktop-container container">
        <section className="settings__title">
          <SubHeading text="Account Settings" />

          <a href={redirect()} className={info}>
            <span className="settings__edit-btn__text">Edit</span>
            <Icon type="edit" className="settings__edit-btn__icon" />
          </a>
        </section>
        <section className="settings__body">
          <div>
            <p className="settings__body__title">
              <Icon type="user" className="settings__body__icon" />
              Name:
            </p>
            <span className="settings__body__info">
              {loading ? <Spin /> : info && info.name}
            </span>
          </div>

          <div>
            <p className="settings__body__title">
              <Icon type="mail" className="settings__body__icon" />
              Email:
            </p>
            <span className="settings__body__info">
              {loading ? <Spin /> : info && info.email}
            </span>
          </div>

          <div>
            <p className="settings__body__title">
              <Icon type="lock" className="settings__body__icon" />
              Password:
            </p>
            <span className="settings__body__info">********</span>
          </div>

          <button
            type="button"
            className="settings__logout"
            onClick={handleLogOut}
          >
            <Icon type="logout" className="settings__body__icon" />
            <span>Log Out</span>
          </button>
        </section>
      </div>
      <section>
        <NavigationBar />
      </section>
    </div>
  );
};

accountSettings.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    createdByGoogle: PropTypes.bool,
    createdByTwitter: PropTypes.bool,
  }),
  loading: PropTypes.bool.isRequired,
  handleLogOut: PropTypes.func.isRequired,
};

export default accountSettings;
