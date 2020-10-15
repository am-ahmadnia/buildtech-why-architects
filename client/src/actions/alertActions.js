import { TASK_UPDATED, TASK_ADDED } from './types';

export const setAlert = (alertName, status) => (dispatch) => {
  switch (alertName) {
    // case USER_ADDED:
    // dispatch({
    // type: USER_ADDED,
    // payload: status,
    // });
    // break;
    // case USER_EDITED:
    // dispatch({
    // type: USER_EDITED,
    // payload: status,
    // });
    // break;
    // case USER_DELETED:
    // dispatch({
    // type: USER_DELETED,
    // payload: status,
    // });
    // break;
    case TASK_UPDATED:
      dispatch({
        type: TASK_UPDATED,
        payload: status,
      });
      break;
    case TASK_ADDED:
      dispatch({
        type: TASK_ADDED,
        payload: status,
      });
      break;

    default:
      break;
  }
};
