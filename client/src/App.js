import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwtDecode from 'jwt-decode'
import config from './config'
import { setAuthToken, cacheStore } from './utils/helpers'
import { NotificationContainer } from 'react-notifications'

import './sass/main.scss';
import 'react-notifications/lib/notifications.css'

// Global Components
import AdminRoute from './components/common/AdminRoute'
import LoadingBar from 'react-redux-loading-bar'
import { setCurrentUser } from './actions/auth';

// Route Page
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard'
import UpdateProfile from './components/profile/UpdateProfile'

// Check for token
if (cacheStore().getItem(config.tokenKey)) {
  // Set auth token header auth
  setAuthToken(cacheStore().getItem(config.tokenKey));
  // Decode token and get user info and exp
  const decoded = jwtDecode(cacheStore().getItem(config.tokenKey));
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter basename="/">
          <React.Fragment>
            <div className="body">
              <NotificationContainer />
              <LoadingBar scope="sectionBar" />
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />

              <Switch>
                <AdminRoute name="Dashboard" path="/dashboard" component={Dashboard} />
              </Switch>

              <Switch>
                <AdminRoute name="Profile" path="/profile" component={UpdateProfile} />
              </Switch>

            </div>
          </React.Fragment>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;