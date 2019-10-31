import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../assets/icons/homeIcon.svg';
import { ReactComponent as Calendar } from '../assets/icons/calendar.svg';
import { ReactComponent as AddNew } from '../assets/icons/addNew.svg';
import { ReactComponent as FeedsFilter } from '../assets/icons/feedsFilter.svg';
import { ReactComponent as Settings } from '../assets/icons/settings.svg';
import * as ROUTES from '../../constants/routes';
import './navigation.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <nav>
        <i>
          <NavLink to={ROUTES.HOME} activeClassName="clicked">
            <HomeIcon className="navbar__home-icon" />
          </NavLink>
        </i>
        <i>
          <NavLink to={ROUTES.HEAT_MAP} activeClassName="clicked">
            <Calendar className="navbar__calendar" />
          </NavLink>
        </i>
        <i>
          <NavLink to={ROUTES.QUESTION} activeClassName="clicked">
            <AddNew className="navbar__add-icon" />
          </NavLink>
        </i>
        <i>
          <NavLink to={ROUTES.FEED} activeClassName="clicked">
            <FeedsFilter className="navbar__feeds-filter" />
          </NavLink>
        </i>
        <i>
          <NavLink to={ROUTES.ACCOUNT_SETTINGS} activeClassName="clicked">
            <Settings className="navbar__settings" />
          </NavLink>
        </i>
      </nav>
    </div>
  );
};

export default NavBar;
