import React from 'react';
import { Link } from 'react-router-dom';
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
        <i>
          <Link to="/home">
            <HomeIcon className="navbar__home-icon" />
          </Link>
        </i>
        <i>
          <Link to="/home">
            <Calendar className="navbar__calendar" />
          </Link>
        </i>
        <i>
          <Link to="/home">
            <AddNew className="navbar__add-icon" />
          </Link>
        </i>
        <i>
          <Link to="/home">
            <FeedsFilter className="navbar__feeds-filter" />
          </Link>
        </i>
        <i>
          <Link to="/home">
            <Settings className="navbar__settings" />
          </Link>
        </i>
      </nav>
    </div>
  );
};

export default NavBar;
