import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from './../../../../actions/authActions';

import Left from './HeaderLeft';
import Right from './HeaderRight';
import Menu from './HeaderMenu';

function Header({ logoutUser, user, url }) {
  return (
    <div className="az-header">
      <div className="container">
        <Right logout={logoutUser} user={user} />
        <Menu />
        <Left />
      </div>
    </div>
  );
}

export default connect(null, { logoutUser })(Header);
