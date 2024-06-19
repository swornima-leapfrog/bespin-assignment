import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./views/Home";
import Login from "./views/user/Login";
import Profile from "./views/user/Profile";
import AddBlog from "./views/Blogs/AddBlog";
import Register from "./views/user/Register";
import Friends from "./views/friends/Friends";
import Requests from "./views/friends/Requests";
import CheckAuth from "./authentication/CheckAuth";
import RequireAuth from "./authentication/RequireAuth";
import SearchList from "./views/friends/SearchList";

function App() {
  const routes = createBrowserRouter([
    {
      element: <CheckAuth />,
      children: [
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        }
      ]
    },
    {
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/friends",
          element: <Friends />
        },
        {
          path: "/requests",
          element: <Requests />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
        {
          path: "/blogs/add",
          element: <AddBlog />
        },
        {
          path: "/friends/search/:search",
          element: <SearchList />
        },
        { path: "/*", element: <Home /> }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
