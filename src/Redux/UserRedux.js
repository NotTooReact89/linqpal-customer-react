import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postUserRequest: ['params'],
  postUserSuccess: ['response'],
  postUserFailure: ['postUserError'],
  userReset: [],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  fetching: false,
  response: {},
  postUserError: null,
};

/* ------------- Reducers ------------- */

const postUserRequest = (state) => ({
  ...state,
  fetching: true,
  postUserError: null,
});

const postUserSuccess = (state, action) => {
  const { response } = action;

  return {
    ...state,
    fetching: false,
    response,
    postUserError: null,
  };
};

const postUserFailure = (state, { postUserError }) => ({
  ...state,
  fetching: false,
  postUserError,
});

const userReset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_USER_REQUEST]: postUserRequest,
  [Types.POST_USER_SUCCESS]: postUserSuccess,
  [Types.POST_USER_FAILURE]: postUserFailure,
  [Types.USER_RESET]: userReset,
});

/* ------------- Selectors ------------- */

export const submittingUser = (state: State) => state.user.fetching;
export const postUserResponse = (state: State) => state.user.response;
