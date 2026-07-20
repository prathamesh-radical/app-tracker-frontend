import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AppData from "../pages/AppData";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Apps from "../pages/Apps";
import ServiceDataPage from "../pages/ServiceDataPage";
import ForgotPassword from "../pages/ForgotPassword";

export const router = createBrowserRouter(
  [
    {
      path: `/`,
      element: <Main />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/home", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
        { path: "/apps", element: <ProtectedRoute><Apps /></ProtectedRoute> },
        { path: "/appdata/:appid", element: <ProtectedRoute><AppData /></ProtectedRoute> },
        { path: "/appdata/:appid/:userid", element: <ProtectedRoute><ServiceDataPage /></ProtectedRoute> },
      ],
    },
  ],
);