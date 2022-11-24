import { POST_RESET } from '../actionTypes';

// const initialState = '';

export const reset = (state = null, action) => {
  switch (action.type) {
    case POST_RESET:
      return action.message;
    default:
      return state;
  }
};
