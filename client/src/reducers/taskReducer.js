import { FETCH_TASK, FETCH_TASKS } from './../actions/types';

const initialState = {
  tasks: [],
  task: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case FETCH_TASK:
      return {
        ...state,
        task: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
