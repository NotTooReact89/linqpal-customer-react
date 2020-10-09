// @flow

import { call } from 'redux-saga/effects';
import { ApiUtils } from '../Lib';

export default function* apiCall(serviceCall: *, ...args: *) {
  let serviceCallResponse = yield call(
    serviceCall,
    ...args,
    ApiUtils.createApiHeaders(),
  );
  return serviceCallResponse;
}
