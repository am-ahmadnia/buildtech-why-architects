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
import Task from './pages/Task';
import AddTask from './pages/AddTask';
import Profile from './pages/Profile';

function User() {
  return (
    <Fragment>
      <Switch>
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/add-task" component={AddTask} />
        <PrivateRoute path="/tasks/:id" component={Task} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/*" component={NotFound} />
      </Switch>
    </Fragment>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(User));
