import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../App";

type ProtectedRouteType = {
  path: string;
  render: JSX.Element;
  exact?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteType> = (props) => {
  return (
    <Route
      {...props}
      render={(params) =>
        isAuthenticated() ? props.render : <Redirect to="/auth/login" />
      }
    />
  );
};

export default ProtectedRoute;
