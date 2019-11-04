import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';
import MainHeading from '../../components/MainHeading';
import Card from '../../components/JournalCard';
import NavBar from '../../components/navigationBar';
import { ReactComponent as EditIcon } from '../assets/icons/editIcon.svg';
import * as ROUTES from '../../constants/routes';
import './home.css';

class Home extends Component {
  state = {
    isEditable: false,
    userName: 'Alaa Taima',
    journals: [
      {
        grateful: {
          title: 'Family',
          body: 'some dummy and very stupid data',
        },
        developing: {
          title: 'not finding time',
          body: 'some dummy and very stupid data',
        },
        challenge: {
          title: 'reading more articles',
          body: 'some dummy and very stupid data',
        },
        timestamp: '2019-10-30T09:17:27.037Z',
      },
      {
        grateful: {
          title: 'Family',
          body: 'some dummy and very stupid data',
        },
        developing: {
          title: 'not finding time',
          body: 'some dummy and very stupid data',
        },
        challenge: {
          title: 'reading more books',
          body: 'some dummy and very stupid data',
        },
        timestamp: '2019-10-30T09:17:27.037Z',
      },
    ],
  };

  handleClick = () => {
    this.setState({ isEditable: true });
  };

  render() {
    const { isEditable, userName, journals } = this.state;
    return (
      <div className="home">
        <section className="fixed-elements">
          <LogoHeader />
          <div className="home__user">
            <MainHeading className="home__user-name" text={`${userName} 's `} />
            <MainHeading className="home__journal" text="Journal" />
          </div>

          <div className="home__goal">
            <p className="goal__static">
              I am developing:
              <span
                className="goal__editable"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                Manage my tasks to finish them.
              </span>
            </p>
            <EditIcon className="goal__edit-icon" onClick={this.handleClick} />
          </div>

          <div className="home__entries">
            <MainHeading className="entries__recent" text="Recent Entries" />
            <Link to={ROUTES.JOURNAL}>
              <p className="entries__more">See more</p>
            </Link>
          </div>
        </section>

        <div className="cards-container">
          <Card
            className="home__journal-card"
            date={
              moment(journals[0].timestamp)
                .format('MMMM Do, h:mm a')
                .split(',')[0]
            }
            time={
              moment(journals[0].timestamp)
                .format('MMMM Do, h:mm a')
                .split(',')[1]
            }
            grateful={journals[0].grateful.title}
            challenge={journals[0].challenge.title}
            developing={journals[0].developing.title}
          />
          <Card
            className="home__journal-card"
            date={
              moment(journals[0].timestamp)
                .format('MMMM Do, h:mm a')
                .split(',')[0]
            }
            time={
              moment(journals[0].timestamp)
                .format('MMMM Do, h:mm a')
                .split(',')[1]
            }
            grateful={journals[0].grateful.title}
            challenge={journals[0].challenge.title}
            developing={journals[0].developing.title}
          />
          <Card
            className="home__journal-card"
            date={
              moment(journals[0].timestamp)
                .format('MMMM Do, h:mm a')
                .split(',')[0]
            }
            time={
              moment(journals[0].timestamp)
                .format('MMMM Do, h:mm a')
                .split(',')[1]
            }
            grateful={journals[0].grateful.title}
            challenge={journals[0].challenge.title}
            developing={journals[0].developing.title}
          />
          <Card
            date={
              moment(journals[1].timestamp)
                .format('MMMM Do, h:mm a')
                .split(',')[0]
            }
            time={
              moment(journals[1].timestamp)
                .format('MMMM Do, h:mm a')
                .split(',')[1]
            }
            grateful={journals[1].grateful.title}
            challenge={journals[1].challenge.title}
            developing={journals[1].developing.title}
          />
        </div>
        <NavBar />
      </div>
    );
  }
}

export default Home;
