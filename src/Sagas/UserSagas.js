// @flow

import { call, put } from 'redux-saga/effects';
import apiCall from './APISaga';
import UserActions from '../Redux/UserRedux';
import { ApiUtils } from '../Lib';

export function* postUser(userService, action) {
  try {
    const userResponse = yield call(apiCall, userService.postUser, action);

    if (userResponse.ok && userResponse.data) {
      yield put(UserActions.postUserSuccess(userResponse.data));
    } else {
      yield put(
        UserActions.postUserFailure(
          ApiUtils.apiResolveError({
            statusCode: userResponse.status,
            serviceResponse: userResponse,
          }),
        ),
      );
    }
  } catch (err) {
    yield put(
      UserActions.postUserFailure(
        ApiUtils.apiResolveError({
          statusCode: null,
          serviceResponse: null,
        }),
      ),
    );
  }
}
