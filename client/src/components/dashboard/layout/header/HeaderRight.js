import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProfileCard({ logout, user }) {
  return (
    <div className="dropdown-menu">
      <div className="az-dropdown-header d-sm-none">
        <Link to="" className="az-header-arrow">
          <i className="icon ion-md-arrow-back"></i>
        </Link>
      </div>
      <div className="az-header-profile">
        <div className="az-img-user">
          <img src={require('./../../../../images/profile.jpg').default} />
        </div>
        <h6>{`${user.firstName} ${user.lastName}`}</h6>
        <h6
          style={{ fontSize: '12px', color: 'grey', marginTop: '10px' }}
        >{`${user.username}`}</h6>
      </div>

      <Link to="/profile" className="dropdown-item">
        <i className="typcn typcn-user-outline"></i> پروفایل من
      </Link>
      <Link to="" className="dropdown-item">
        <i className="typcn typcn-time"></i> تست
      </Link>
      <Link to="" className="dropdown-item">
        <i className="typcn typcn-cog-outline"></i> تست
      </Link>
      <button onClick={logout} className="dropdown-item c-pointer">
        <i className="typcn typcn-power-outline"></i> خروج
      </button>
    </div>
  );
}

function Right({ logout, user }) {
  console.log('LOGOUT AND USER', logout, user);
  return (
    <div className="az-header-right">
      <div className="dropdown az-profile-menu">
        <a className="az-img-user">
          <img src={require('./../../../../images/profile.jpg').default} />
        </a>
        <ProfileCard logout={logout} user={user} />
      </div>
    </div>
  );
}

Right.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Right;
