import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './../private-route/PrivateRoute';
import { connect } from 'react-redux';

import Header from './layout/header/Header';
import NotFound from './../pages/NotFound';
import Admin from './Admin/Admin';
import Users from './user/User';

import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './../utils/Alert';

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
};

function Dashboard({ match, auth, history }) {
  return (
    <Provider template={AlertTemplate} {...options}>
      <Alerts />
      <Header user={auth.user} url={match.url} />
      <div className="az-content az-content-dashboard">
        <div className="container">
          <div className="az-content-body">
            <Switch>
              <PrivateRoute path="/admin" component={Admin} />
              <PrivateRoute path="/" component={Users} />
              <PrivateRoute path="/*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </Provider>
  );
}

function Designer() {
  return <div>Designer Route</div>;
}
function Executive() {
  return <div>Executive Route</div>;
}

function X({ testClick }) {
  return (
    <div>
      <h2>Admin Route</h2>
      <button onClick={testClick}>test</button>
    </div>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  // admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // admin: state.admin
});

export default withRouter(connect(mapStateToProps)(Dashboard));
