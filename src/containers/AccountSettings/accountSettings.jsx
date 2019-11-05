import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import Logo from '../../components/LogoHeader';
import SubHeading from '../../components/subHeading';
import NavigationBar from '../../components/navigationBar';

import './accountSettings.css';

const accountSettings = ({ info }) => {
  const logOut = () => {
    // clear cockie & redirect to the login page
  };
  // const { createdAccount, name, email } = info;

  return (
    <div className="settings">
      <Logo />

      <div className="settings__desktop-container">
        <section className="settings__title">
          <SubHeading text="Account Settings" />

          <Link
            to="/confirm-password"
            className={
              info &&
              (info.createdAccount
                ? 'settings__edit-btn'
                : 'settings__edit-btn hidden-edit-btn')
            }
          >
            <span className="settings__edit-btn__text">Edit</span>
            <Icon type="edit" className="settings__edit-btn__icon" />
          </Link>
        </section>

        <section className="settings__body">
          <div>
            <p className="settings__body__title">
              <Icon type="user" className="settings__body__icon" />
              Name:
            </p>
            <span className="settings__body__info">
              {(info && info.name) || 'in Progress'}
            </span>
          </div>

          <div>
            <p className="settings__body__title">
              <Icon type="mail" className="settings__body__icon" />
              Email:
            </p>
            <span className="settings__body__info">
              {(info && info.email) || 'in Progress'}
            </span>
          </div>

          <div>
            <p className="settings__body__title">
              <Icon type="lock" className="settings__body__icon" />
              Password:
            </p>
            <span className="settings__body__info">********</span>
          </div>

          <button type="button" className="settings__logout" onClick={logOut}>
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
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAccount: PropTypes.bool.isRequired,
  }).isRequired,
};

export default accountSettings;
