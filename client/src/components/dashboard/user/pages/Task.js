import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTask, fetchTask } from '../../../../actions/taskActions';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import { toPersianDate } from './../../../../utils/dateConvertor';
import axios from 'axios';

function Task({ fetchTask, updateTask, task, username, errors, history }) {
  const [data, setData] = useState({
    todaysProgress: '',
    hoursSpent: '',
  });
  const [_data, setXData] = useState({
    todaysProgress: '',
    hoursSpent: '',
  });
  const [_errors, setErrors] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchTask(localStorage.jwtToken);
    setErrors({ ..._errors, ...errors });
  }, [errors, task]);
  const unsetError = (id) => {
    setErrors({ ..._errors, [id]: '' });
  };
  const onChange = (e) => {
    unsetError(e.target.name);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    updateTask(
      localStorage.jwtToken,
      {
        todaysProgress: data.todaysProgress,
        hoursSpent: data.hoursSpent,
      },
      username,
      id,
      history
    );
  };
  return (
    <Fragment>
      <form noValidate onSubmit={onSubmit}>
        <div className="row row-sm mg-b-20">
          <div className="col-lg-12 col-xl-12 mg-lg-t-0">
            <div className="card card-table-one">
              <div className="table-responsive table-rtl">
                <table className="table task-table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>عنوان پروژه</strong>
                      </td>
                      <td>
                        <input type="text" disabled value={task.projectTitle} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>شرح فعالیت</strong>
                      </td>
                      <td>
                        <input type="text" disabled value={task.description} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>تاریخ تحویل</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          disabled
                          value={toPersianDate(task.deliveryDate)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>درصد پیشرفت تا امروز</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          disabled
                          value={task.progressUntilToday}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>درصد پیشرفت امروز</strong>
                      </td>
                      <td>
                        <input
                          type="number"
                          onChange={onChange}
                          name="todaysProgress"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>زمان صرف شده {'(ساعت)'}</strong>
                      </td>
                      <td>
                        <input
                          type="number"
                          onChange={onChange}
                          name="hoursSpent"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ width: '100%', backgroundColor: '#6F42C1' }}
                        >
                          ذخیره
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}

Task.propTypes = {
  fetchTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
  task: state.task.task,
  errors: state.errors,
});

export default withRouter(
  connect(mapStateToProps, { updateTask, fetchTask })(Task)
);
