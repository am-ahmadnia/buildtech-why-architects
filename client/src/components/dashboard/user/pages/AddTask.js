import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTask } from '../../../../actions/taskActions';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';

import { datepickerStyles } from './../../../../assets/scss/jsonStyle';
import { DatePicker } from 'react-persian-datepicker';

function AddTask({ addTask, username, errors, history }) {
  const { id } = useParams();
  const [data, setData] = useState({
    projectTitle: '',
    description: '',
    deliveryDate: '',
    progressUntilToday: '',
  });
  const [_errors, setErrors] = useState({});
  useEffect(() => {
    setErrors({ ..._errors, ...errors });
  }, [errors]);
  const unsetError = (id) => {
    setErrors({ ..._errors, [id]: '' });
  };
  const onChange = (e) => {
    unsetError(e.target.name);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const dateOnChange = (e, id) => {
    unsetError(id);
    setData({ ...data, [id]: e._d });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    addTask(localStorage.jwtToken, data, username, history);
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
                        <input
                          type="text"
                          name="projectTitle"
                          onChange={onChange}
                        />
                        <span className="error">{_errors.projectTitle}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>شرح فعالیت</strong>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="description"
                          onChange={onChange}
                        />
                        <span className="error">{_errors.description}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>تاریخ تحویل</strong>
                      </td>
                      <td>
                        <DatePicker
                          className="form-control"
                          calendarStyles={datepickerStyles}
                          onChange={(e) => dateOnChange(e, 'deliveryDate')}
                        />
                        <span className="error">{_errors.deliveryDate}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>درصد پیشرفت تا امروز</strong>
                      </td>
                      <td>
                        <input
                          type="number"
                          name="progressUntilToday"
                          onChange={onChange}
                        />
                        <span className="error">
                          {_errors.progressUntilToday}
                        </span>
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

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
  errors: state.errors,
});

export default withRouter(connect(mapStateToProps, { addTask })(AddTask));
