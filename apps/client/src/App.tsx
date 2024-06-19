import Home from "./views/Home";
import Login from "./views/user/Login";
import Profile from "./views/user/Profile";
import AddBlog from "./views/Blogs/AddBlog";
import Register from "./views/user/Register";
import Friends from "./views/friends/Friends";
import "react-toastify/dist/ReactToastify.css";
import Requests from "./views/friends/Requests";
import { ToastContainer } from "react-toastify";
import CheckAuth from "./authentication/CheckAuth";
import RequireAuth from "./authentication/RequireAuth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
