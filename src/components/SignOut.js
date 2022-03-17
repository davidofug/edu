import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "./helpers/functions";
function SignOut() {
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = "Ablestate Cohorts | Sign Out";
    signOut();
    navigate("/", { replace: true });
  }, []);
  return <div>You're sign out</div>;
}

export default SignOut;
