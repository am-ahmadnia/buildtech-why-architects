import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { setAlert } from './../../actions/alertActions';
import PropTypes from 'prop-types';
import {
  TASK_UPDATED,
  USER_ADDED,
  USER_DELETED,
  USER_EDITED,
  ADMIN_REGISTERED,
  TASK_ADDED,
} from './../../actions/types';

const Alerts = ({
  userAdded,
  userEdited,
  userDeleted,
  adminRegistered,
  taskUpdated,
  taskAdded,
  setAlert,
}) => {
  const alert = useAlert();

  useEffect(() => {
    if (taskAdded) {
      alert.success('فعالیت با موفقیت اضافه شد');
      setTimeout(setAlert(TASK_ADDED, false), 3000);
    }
    if (taskUpdated) {
      alert.success('فعالیت با موفقیت ویرایش شد');
      setTimeout(setAlert(TASK_UPDATED, false), 3000);
    }
    // if (userAdded) {
    //   alert.success('کاربر با موفقیت اضافه شد');
    //   setTimeout(setAlert(USER_ADDED, false), 3000);
    // }
    // if (userEdited) {
    //   alert.success('کاربر با موفقیت ویرایش شد');
    //   setTimeout(setAlert(USER_EDITED, false), 3000);
    // }
    // if (userDeleted) {
    //   alert.success('کاربر با موفقیت حذف شد');
    //   setTimeout(setAlert(USER_DELETED, false), 3000);
    // }
    // if (adminRegistered) {
    //   alert.success('ادمین با موفقیت اضافه شد');
    //   setTimeout(setAlert(ADMIN_REGISTERED, false), 3000);
    // }
    // if (adminRegistered) {
    //   alert.success('ادمین با موفقیت اضافه شد');
    //   setTimeout(setAlert(ADMIN_REGISTERED, false), 3000);
    // }
  });

  return <Fragment></Fragment>;
};

Alerts.propTypes = {
  setAlert: PropTypes.func.isRequired,
  taskUpdated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  taskUpdated: state.alerts.taskUpdated,
  taskAdded: state.alerts.taskAdded,
});

export default connect(mapStateToProps, { setAlert })(Alerts);
