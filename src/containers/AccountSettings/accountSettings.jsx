import React, { Component } from "react";
import { Icon } from "antd";
import Logo from "../../components/LogoHeader";
import SubHeading from "../../components/subHeading";

import NavigationBar from "../../components/navigationBar";

import "./accountSettings.css";

export class accountSettings extends Component {
  state = {};

  render() {
    return (
      <div className="settings">
        <Logo />

        <section className="settings__title">
          <SubHeading text="Account Settings" />
          <span className="settings__edit-btn">
            <span className="settings__edit-btn__text">Edit</span>
            <Icon type="edit" className="settings__edit-btn__icon" />
          </span>
        </section>

        <section className="settings__body">
          <div>
            <p className="settings__body__title">
              <Icon type="user" className="settings__body__icon" />
              Name:
            </p>
            <span className="settings__body__info">fares</span>
          </div>

          <div>
            <p className="settings__body__title">
              <Icon type="mail" className="settings__body__icon" />
              Email:
            </p>
            <span className="settings__body__info">fares</span>
          </div>

          <div>
            <p className="settings__body__title">
              <Icon type="lock" className="settings__body__icon" />
              Password:
            </p>
            <span className="settings__body__info">********</span>
          </div>

          <div className="settings__logout">
            <Icon type="logout" className="settings__body__icon" />
            <span>Log Out</span>
          </div>
        </section>

        <section>
          <NavigationBar />
        </section>
      </div>
    );
  }
}

export default accountSettings;
