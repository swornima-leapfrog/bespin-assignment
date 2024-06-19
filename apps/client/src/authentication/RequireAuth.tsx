import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "~/components/Navbar";

function RequireAuth() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="px-44">
        <Outlet />
      </div>
    </>
  );
}

export default RequireAuth;
