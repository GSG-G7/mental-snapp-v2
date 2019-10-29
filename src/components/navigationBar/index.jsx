import React from 'react';
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
          <HomeIcon />
        </i>
        <i>
          <Calendar />
        </i>
        <i>
          <AddNew className="addnewicon" />
        </i>
        <i>
          <FeedsFilter />
        </i>
        <i>
          <Settings />
        </i>
      </nav>
    </div>
  );
};

export default NavBar;
