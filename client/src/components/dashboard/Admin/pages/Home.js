import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks } from './../../../../actions/taskActions';
import { withRouter } from 'react-router';
import { toPersianDate } from './../../../../utils/dateConvertor';

function Home({ fetchTasks, tasks, history }) {
  useEffect(() => {
    fetchTasks(localStorage.jwtToken);
  }, []);
  return (
    <Fragment>
      <div className="row row-sm mg-b-20">
        <div className="col-lg-12 col-xl-12 mg-lg-t-0">
          <div className="card card-table-one">
            <div className="c-card-header">
              <h2 className="card-title text-right">گزارش پیشرفت روزانه</h2>
              <Link to="/admin/add-task" className="btn btn-purple">
                فعالیت جدید
              </Link>
            </div>
            <div className="table-responsive table-rtl">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>عنوان پروژه</th>
                    <th>شرح فعالیت</th>
                    <th>تاریخ تحویل</th>
                    <th>درصد پیشرفت تا امروز</th>
                    <th>درصد پیشرفت امروز</th>
                    <th>زمان صرف شده {'(ساعت)'}</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => {
                    const {
                      _id,
                      projectTitle,
                      description,
                      deliveryDate,
                      progressUntilToday,
                      todaysProgress,
                      hoursSpent,
                    } = task;
                    return (
                      <tr
                        style={{ cursor: 'pointer' }}
                        onClick={() => history.push('/tasks/' + _id)}
                      >
                        <td>{projectTitle}</td>
                        <td>{description}</td>
                        <td>{toPersianDate(deliveryDate)}</td>
                        <td>% {progressUntilToday}</td>
                        <td>% {todaysProgress}</td>
                        <td>{hoursSpent}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Home.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
});

export default withRouter(connect(mapStateToProps, { fetchTasks })(Home));
