import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import supabase from "../helpers/supabase";
import PublicNav from "./PublicNav";
import PrivateNav from "./PrivateNav";
function Layout() {
  const { user, setUser } = useAuth();
  React.useEffect(async () => {
    const user = await supabase.auth.user();
    setUser(user);
  }, []);
  return (
    <>
      {user ? <PrivateNav /> : <PublicNav />}
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
