import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignIn from './auth/components/SignIn';
import SignUp from './auth/components/SignUp';
import MainNavigation from './nav/MainNavigation';
import './App.css';

const routes = (
  <Switch>
    <Route path="/signin">
      <SignIn />
    </Route>
    <Route path="/signup">
      <SignUp />
    </Route>
    <Redirect to="/signin" />
  </Switch>
);

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        {routes}
      </main>
    </Router>
  );
}

export default App;
