import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log(props);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export const AuthRedirectRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const AuthRedirect = (props) => {
    if (isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    return <Component {...props} />;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return AuthRedirect(props);
      }}
    />
  );
};
