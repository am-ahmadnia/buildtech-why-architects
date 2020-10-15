import React, { Fragment, useEffect } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from './../../private-route/PrivateRoute';

import NotFound from './../../pages/NotFound';
import Home from './pages/Home';

function Admin() {
  return (
    <Fragment>
      <Switch>
        <PrivateRoute path="/add-task" component={x} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/*" component={NotFound} />
      </Switch>
    </Fragment>
  );
}

function x() {
  console.log('fuck you my nigga');
  return <div>sicko mode</div>;
}

Admin.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(Admin));
