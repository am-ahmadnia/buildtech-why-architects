import React from 'react';
import { Link } from 'react-router-dom';

import {
  whyLogoStyles,
  btLogoStyles,
} from './../../../../assets/scss/jsonStyle';

function Left({}) {
  return (
    <div className="az-header-left">
      <Link to="/" className="az-logo">
        <span></span>{' '}
        <img
          style={whyLogoStyles}
          src={require('./../../../../images/logo.png').default}
        />
      </Link>
      <Link to="/" className="az-logo">
        <span></span>{' '}
        <img
          style={btLogoStyles}
          src={require('./../../../../images/logo2.png').default}
        />
      </Link>
      <Link to="" id="azMenuShow" className="az-header-menu-icon d-lg-none">
        <span></span>
      </Link>
    </div>
  );
}

export default Left;
