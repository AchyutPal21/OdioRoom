import { createBrowserRouter } from "react-router";
import App from "../App";
import GlobalErrorPage from "./GlobalErrorPage";
import PageNotFound from "./PageNotFound";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <GlobalErrorPage />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "*",
        element: <PageNotFound />
      }
    ]
  },
]);

export { router };