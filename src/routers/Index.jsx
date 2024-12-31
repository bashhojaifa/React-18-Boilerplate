import { createBrowserRouter } from "react-router-dom";

// Internal dependencies
// import Layout from "../layouts/Layout";
import ProtectRoute from "./ProtectRoute";
import PrivateRoute from "./PrivateRoute";
import { AuthRoles } from "../constants/roles";
import { Home } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   // path: "/auth",
      //   element: <ProtectRoute />,
      //   children: [
      //     {
      //       path: "auth",
      //       element: <Auth />,
      //     },
      //   ],
      // },
      // {
      //   path: "/admin",
      //   // element: <PrivateRoute roles={[AuthRoles.ADMIN]} />,
      //   children: [
      //     {
      //       path: "",
      //       element: ,
      //     },
      //   ],
      // },
    ],
  },
]);

export default router;
