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
    <section className="bg-gray-50 light:text-gray-300 dark:bg-black dark:text-gray-300">
      {user ? <PrivateNav /> : <PublicNav />}
      <div className="container mx-auto">
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
