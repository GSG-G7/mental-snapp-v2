import React, { Component } from 'react';
import NavBar from '../../components/navigationBar';
import MainHeading from '../../components/MainHeading';
import Card from '../../components/JournalCard';
import { ReactComponent as EditIcon } from '../assets/icons/editIcon.svg';

class Home extends Component {
  state = {
    isEditable: false,
    date: `${String(new Date().getDate())} ${
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][new Date().getMonth()]
    }`,
    time: `${String(new Date().getHours())}:${String(new Date().getMinutes())}`,
  };

  handleClick = () => {
    this.setState({ isEditable: true });
  };

  render() {
    const { isEditable, date, time } = this.state;
    return (
      <div>
        <NavBar />
        <MainHeading text="Alaa Taima's Journal" />
        <span>I am developing </span>
        <span contentEditable={isEditable} suppressContentEditableWarning>
          Manage my work tasks to finish them .
        </span>
        <EditIcon onClick={this.handleClick} />
        <MainHeading text="Recent Entries" />
        <span>See More</span>
        <div>
          <Card
            date={date}
            time={time}
            grateful="family"
            challenge="no time"
            developing="be on time"
          />
          <Card
            date={date}
            time={time}
            grateful="family"
            challenge="no time"
            developing="be on time"
          />
        </div>
      </div>
    );
  }
}

export default Home;
