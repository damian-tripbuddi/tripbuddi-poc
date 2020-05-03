import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './dashboard/components/LoginForm/LoginForm';
import LogoutForm from './dashboard/components/LogoutForm';
import UserProfileForm from './dashboard/components/UserProfileForm';
import PrivateRoute from './common/components/PrivateRoute';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home as DashboardHome, Proposal } from './dashboard/pages';
import { HomePage, NotFound, Page, Preview } from './website/pages';

import { apiEndpoint } from './prismic-configuration';

import './App.css';
import useThemeFromPrismic from './common/hooks/useThemeFromPrismic';

function App() {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];

  const theme = useThemeFromPrismic();

  return (
    <React.StrictMode>
      <CssBaseline />
      <Helmet>
        <script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/login'>
              <LoginForm />
            </Route>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/preview' component={Preview} />
            <PrivateRoute requiresProfile={false} exact path='/profile'>
              <UserProfileForm />
            </PrivateRoute>
            <PrivateRoute exact path='/dashboard'>
              <DashboardHome />
            </PrivateRoute>
            <PrivateRoute exact path='/proposal/:proposalId'>
              <Proposal />
            </PrivateRoute>
            <PrivateRoute exact requiresProfile={false} path='/logout'>
              <LogoutForm />
            </PrivateRoute>
            <Route exact path='/:uid' component={Page} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
