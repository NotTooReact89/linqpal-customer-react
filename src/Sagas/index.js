// @flow

import { takeLatest, all } from 'redux-saga/effects';

/* ------------- Services ---------- */

import { UserService } from '../Services';

/* ------------- Types ------------- */

import { UserTypes } from '../Redux/UserRedux';

/* ------------- Sagas ------------- */

import { postUser } from './UserSagas';

/* ------------- API --------------- */

const userService = UserService.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root(): Generator<*, *, *> {
  yield all([takeLatest(UserTypes.POST_USER_REQUEST, postUser, userService)]);
}
