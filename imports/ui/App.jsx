import React from 'react';
import { Router, Route, Switch } from 'react-router';
import history from 'history';

import { Home } from './Home';
import { Login } from './Login';
import { SignUp } from './SignUp';
import NotesPage from './NotesPage';
import { NotFound } from './NotFound';

createBrowserHistory = history.createBrowserHistory;
const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/sign-up" component={SignUp}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/notes" component={NotesPage}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);