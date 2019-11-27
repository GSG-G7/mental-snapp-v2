import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Spin } from 'antd';

import LogoHeader from '../../components/LogoHeader';
import MainHeading from '../../components/MainHeading';
import JournalCard from '../../components/JournalCard';
import NavBar from '../../components/navigationBar';
import { FEED } from '../../constants/routes';
import { ReactComponent as EditIcon } from '../assets/icons/editIcon.svg';
import './home.css';

const Home = props => {
  const {
    isEditable,
    userName,
    recentJournals,
    goal,
    handleBlur,
    handelSave,
    handleClick,
    handleDelete,
    handleJournalDetails,
    loading,
  } = props;

  const handleRecentJournals = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', margin: '9vh auto' }}>
          <Spin size="large" />
        </div>
      );
    }
    if (recentJournals.length > 0) {
      return recentJournals.map((journal, index) => (
        <JournalCard
          index={index}
          key={journal.id}
          className="home__journal-card"
          date={moment(journal.timestamp).format('MMMM Do YYYY')}
          time={moment(journal.timestamp).format('h:mm a')}
          grateful={journal.grateful && journal.grateful.title}
          challenge={journal.challenge && journal.challenge.title}
          developing={journal.developing && journal.developing.title}
          handleDelete={() => handleDelete(journal.id)}
          journalId={journal.id}
          handleJournalDetails={() => {
            return handleJournalDetails(journal.id);
          }}
        />
      ));
    }
    return (
      <h5 className="home__emptyJournals">
        You haven&apos;t added any journals yet.
      </h5>
    );
  };

  return (
    <div className="home">
      <section className="fixed-elements container">
        <LogoHeader />
        <div className="home__user">
          <MainHeading className="home__user-name" text={userName} />
          <span className="home__journal">Journal</span>
        </div>

        {goal.trim() && (
          <div className="home__goal">
            <div className="goal__static">
              I am developing:
              <span
                className={
                  !isEditable ? 'goal__editable' : 'goal__editable-edit'
                }
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={handleBlur}
              >
                {loading ? <Spin size="small" /> : goal}
              </span>
            </div>
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
        )}

        <div className="home__entries">
          <MainHeading className="entries__recent" text="Recent Journals" />
          <Link to={FEED}>
            <p className="entries__more link">See more</p>
          </Link>
        </div>
      </section>
      {/* handling the journals using the upper function */}
      <div className="cards-container container">{handleRecentJournals()}</div>
      <NavBar />
    </div>
  );
};

Home.propTypes = {
  isEditable: propTypes.bool.isRequired,
  loading: propTypes.bool.isRequired,
  userName: propTypes.string.isRequired,
  recentJournals: propTypes.arrayOf(propTypes.object).isRequired,
  goal: propTypes.string.isRequired,
  handleBlur: propTypes.func.isRequired,
  handelSave: propTypes.func.isRequired,
  handleClick: propTypes.func.isRequired,
  handleDelete: propTypes.func.isRequired,
  handleJournalDetails: propTypes.func.isRequired,
};

export default Home;
