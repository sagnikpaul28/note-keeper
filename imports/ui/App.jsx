import React from 'react';
import { Router, Route, Switch } from 'react-router';
import history from 'history';

import { Home } from './Home';
import { NotFound } from './NotFound';

createBrowserHistory = history.createBrowserHistory;
const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);