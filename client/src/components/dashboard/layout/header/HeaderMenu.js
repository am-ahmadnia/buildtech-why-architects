import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Menu({}) {
  let url = '';
  const splittedUrl = window.location.href.split('/');
  url = '/' + splittedUrl.slice(3, splittedUrl.length - 1).join('/');

  return (
    <div className="az-header-menu">
      <div className="az-header-menu-header">
        <Link to="" className="close">
          &times;
        </Link>
        <Link to="/dashboard/admin" className="az-logo">
          <span></span> buildtech
        </Link>
      </div>
      <ul className="nav">
        <li className="nav-item" style={{ marginLeft: '28px' }}>
          <Link to="/" className="nav-link">
            <i className="typcn typcn-chart-area-outline"></i> فعالیت ها
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
