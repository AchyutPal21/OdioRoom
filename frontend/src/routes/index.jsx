import { createBrowserRouter } from "react-router";
import App from "../App";
import GlobalErrorPage from "./GlobalErrorPage";
import PageNotFound from "./PageNotFound";
import Home from "../pages/Home/Home";
import Authenticate from "../pages/Authenticate/Authenticate";
import { protectedLoader } from "./loaders/protectedLoader";
import { publicLoader } from "./loaders/publicLoader";
import Activate from "../pages/Activate/Activate";
import { semiProtectedLoader } from "./loaders/semiProtectedLoader";
import Rooms from "../pages/Rooms/Rooms";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // ErrorBoundary: GlobalErrorPage,
    children: [
      {
        index: true,
        Component: Home,
        loader: publicLoader
      },
      {
        path: "authenticate",
        Component: Authenticate,
        loader: publicLoader
      },
      {
        path: "activate",
        Component: Activate,
        loader: semiProtectedLoader
      },
      {
        path: "rooms",
        Component: Rooms,
        loader: protectedLoader
      },
      {
        path: "*",
        Component: PageNotFound 
      }
    ]
  },
]);

export { router };