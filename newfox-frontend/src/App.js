import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { useAuth } from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';
import SignIn from './auth/components/SignIn';
import SignUp from './auth/components/SignUp';
import Catalog from './catalog/catalog';
import MainNavigation from './nav/MainNavigation';

import './App.css';

const App = () => {
  const { token, userId, login, logout } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/catalog">
          <Catalog />
        </Route>
        <Redirect to="/catalog" />
      </Switch>
    );
  } else {
    routes = (
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
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout
      }}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
