// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as user } from './UserRedux';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
  });

export default rootReducer;
