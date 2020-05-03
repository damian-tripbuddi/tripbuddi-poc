import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import UserProfileService from '../../dashboard/services/UserProfileService';

const PrivateRoute = ({ children, requiresProfile = true, ...rest }) => {
  const [authDetails, setAuthDetails] = useState({ authenticatedUser: null, userProfile: null });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const loadAuthDetails = async () => {
      let authenticatedUser = null;
      let userProfile = null;
      try {
        authenticatedUser = await Auth.currentAuthenticatedUser();
        userProfile = await UserProfileService.getCurrentUserProfile();
      } catch (e) {
        console.error(e);
      }
      setAuthDetails({ authenticatedUser, userProfile });
      setLoaded(true);
    };
    loadAuthDetails();
  }, []);

  return loaded ? (
    <Route
      {...rest}
      render={({ location }) => {
        return (
          <>
            {!!authDetails.authenticatedUser && !!authDetails.userProfile && children}
            {!!authDetails.authenticatedUser && !authDetails.userProfile && !requiresProfile && children}
            {!!authDetails.authenticatedUser && !authDetails.userProfile && requiresProfile && (
              <Redirect
                to={{
                  pathname: '/profile',
                  state: { from: location },
                }}
              />
            )}
            {!authDetails.authenticatedUser && (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            )}
          </>
        );
      }}
    />
  ) : null;
};

export default PrivateRoute;
