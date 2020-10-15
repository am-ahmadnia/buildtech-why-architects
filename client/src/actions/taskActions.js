import axios from 'axios';

import {
  GET_ERRORS,
  EMPTY_ERRORS,
  FETCH_TASKS,
  FETCH_TASK,
  TASK_UPDATED,
  TASK_ADDED,
} from './types';

export const addTask = (jwtToken, data, username, history) => async (
  dispatch
) => {
  const token = extractToken(jwtToken);
  try {
    await axios.post(
      `http://127.0.0.1:3000/api/admin/${username}/add-task`,
      data,
      {
        headers: { Authorization: token },
      }
    );
    history.push('/');
    dispatch({
      type: EMPTY_ERRORS,
    });
    dispatch({
      type: TASK_ADDED,
      payload: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const updateTask = (jwtToken, data, username, taskId, history) => async (
  dispatch
) => {
  const token = extractToken(jwtToken);
  try {
    await axios.post(
      `http://127.0.0.1:3000/api/users/${username}/${taskId}/update-task`,
      data,
      {
        headers: { Authorization: token },
      }
    );
    history.push('/');
    dispatch({
      type: EMPTY_ERRORS,
    });
    dispatch({
      type: TASK_UPDATED,
      payload: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const fetchTasks = (jwtToken) => async (dispatch) => {
  const token = extractToken(jwtToken);
  const tasks = await axios.get('http://127.0.0.1:3000/api/users/tasks', {
    headers: { Authorization: token },
  });
  dispatch({
    type: FETCH_TASKS,
    payload: tasks.data,
  });
};

export const fetchTask = (jwtToken, id) => async (dispatch) => {
  const token = extractToken(jwtToken);
  const task = await axios.get('http://127.0.0.1:3000/api/users/tasks/' + id, {
    headers: { Authorization: token },
  });
  dispatch({
    type: FETCH_TASK,
    payload: task.data,
  });
};

const extractToken = (token) => {
  return token.split(' ')[1];
};
