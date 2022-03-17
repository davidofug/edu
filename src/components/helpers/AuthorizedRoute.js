import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function AuthorizedRoute({ children, isAllowed, ...rest }) {
  const { user, setUser } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;

  if (!isAllowed) {
    return (
      <div>
        <h1>You're not authorized to access this resource!</h1>
      </div>
    );
  }

  return children;
}

export default AuthorizedRoute;
