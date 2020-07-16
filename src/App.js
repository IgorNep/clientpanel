import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import ClientDetails from "./components/clients/ClientDetails";
import AddClient from "./components/clients/AddClient";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import store from "./store";
import { rrfProps } from "./store";
import EditClient from "./components/clients/EditClient";
import Login from "./components/auth/Login";
import Settings from "./components/settings/Settings";
import Register from "./components/auth/Register";

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={UserIsAuthenticated(Dashboard)}
              />
              <Route
                exact
                path="/client/add"
                component={UserIsAuthenticated(AddClient)}
              />
              <Route
                exact
                path="/client/:id"
                component={UserIsAuthenticated(ClientDetails)}
              />
              <Route
                exact
                path="/client/edit/:id"
                component={UserIsAuthenticated(EditClient)}
              />
              <Route
                exact
                path="/settings"
                component={UserIsAuthenticated(Settings)}
              />
              <Route
                exact
                path="/register"
                component={UserIsNotAuthenticated(Register)}
              />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
            </Switch>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
