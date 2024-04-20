import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Signin from "../pages/Auth/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

export default router;
