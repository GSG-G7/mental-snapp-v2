import React from 'react';
// import { Link } from 're';
import { ReactComponent as HomeIcon } from '../assets/icons/homeIcon.svg';
import { ReactComponent as Calendar } from '../assets/icons/calendar.svg';
import { ReactComponent as AddNew } from '../assets/icons/addNew.svg';
import { ReactComponent as FeedsFilter } from '../assets/icons/feedsFilter.svg';
import { ReactComponent as Settings } from '../assets/icons/settings.svg';
import './navigation.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <nav>
        <Link />
        <i>
          <HomeIcon className="navbar__home-icon" />
        </i>
        <i>
          <Calendar className="navbar__calendar" />
        </i>
        <i>
          <AddNew className="navbar__add-icon" />
        </i>
        <i>
          <FeedsFilter className="navbar__feeds-filter" />
        </i>
        <i>
          <Settings className="navbar__settings" />
        </i>
      </nav>
    </div>
  );
};

export default NavBar;
