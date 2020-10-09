import React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from './Screens/Dashboard';

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Dashboard} />
    </Switch>
  </div>
);

export default routes;
