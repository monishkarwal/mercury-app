import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Redirect, Route } from "react-router-dom";

const AuthenticatedRoute = ({ component, ...rest }) => {
  const authContext = useContext(AuthContext);
  if (authContext.isAuthenticated()) {
    return <Route {...rest} component={component} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default AuthenticatedRoute;
