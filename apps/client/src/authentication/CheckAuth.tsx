import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function CheckAuth() {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default CheckAuth;
