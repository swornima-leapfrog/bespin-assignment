import { Face, Logout } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "~/authentication/AuthContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.resetQueries();
    queryClient.clear();

    setUser(null);
  };

  return (
    <>
      <nav className="bg-slate-700 text-white py-4 px-44">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">
            <Link to="/home">Socio</Link>
          </h2>
          <div className="flex gap-8 items-center">
            <Link to="/home">Home</Link>
            <Link to="/friends">Friends</Link>
            <Link to="/requests">Requests</Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link to={`/profile/${user?.id}`}>
              <Face className="text-white !text-2xl" />
            </Link>
            <IconButton onClick={handleLogout} className="!p-0">
              <Logout className="text-white" />
            </IconButton>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
