import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Icon } from 'antd';
import LogoHeader from '../../components/LogoHeader';
import MainHeading from '../../components/MainHeading';
import Card from '../../components/JournalCard';
import NavBar from '../../components/navigationBar';
import { ReactComponent as EditIcon } from '../assets/icons/editIcon.svg';
import * as ROUTES from '../../constants/routes';
import './home.css';

const Home = props => {
  const {
    isEditable,
    userName,
    journals,
    goal,
    handleBlur,
    handelSave,
    handleClick,
  } = props;

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
              className={!isEditable ? 'goal__editable' : 'goal__editable-edit'}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={handleBlur}
            >
              {goal}
            </span>
          </p>
          {!isEditable ? (
            <EditIcon className="goal__edit-icon" onClick={handleClick} />
          ) : (
            <Icon
              className="goal__save-icon"
              theme="twoTone"
              twoToneColor="#52c41a"
              onClick={handelSave}
              type="check-circle"
            />
          )}
        </div>

        <div className="home__entries">
          <MainHeading className="entries__recent" text="Recent Entries" />
          <Link to={ROUTES.FEED}>
            <p className="entries__more">See more</p>
          </Link>
        </div>
      </section>

      <div className="cards-container">
        {journals.length > 0 &&
          journals.map(journal => (
            <Link to={`journal/${journal.id}`} key={journal.id}>
              <Card
                className="home__journal-card"
                date={moment(journal.timestamp).format('MMMM Do')}
                time={moment(journal.timestamp).format('h:mm a')}
                grateful={journal.grateful && journal.grateful.title}
                challenge={journal.challenge && journal.challenge.title}
                developing={journal.developing && journal.developing.title}
              />
            </Link>
          ))}
      </div>
      <NavBar />
    </div>
  );
};

export default Home;

Home.propTypes = {
  isEditable: propTypes.bool.isRequired,
  userName: propTypes.string.isRequired,
  journals: propTypes.arrayOf(propTypes.object).isRequired,
  goal: propTypes.string.isRequired,
  handleBlur: propTypes.func.isRequired,
  handelSave: propTypes.func.isRequired,
  handleClick: propTypes.func.isRequired,
};
