import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AppData from "../pages/AppData";
import MechanicAppDetails from "../pages/MechanicAppDetails";
import SmartMoneyAppDetails from "../pages/SmartMoneyAppDetails";
import GuestEntryAppDetails from "../pages/GuestEntryAppDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter(
  [
    {
      path: `/`,
      element: <Main />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "/appdata/:appid", element: <ProtectedRoute><AppData /></ProtectedRoute> },
        { path: "/appdata/mechanic/:appid/:userid", element: <ProtectedRoute><MechanicAppDetails /></ProtectedRoute> },
        { path: "/appdata/smartmoney/:appid/:userid", element: <ProtectedRoute><SmartMoneyAppDetails /></ProtectedRoute> },
        { path: "/appdata/guestentry/:appid/:userid", element: <ProtectedRoute><GuestEntryAppDetails /></ProtectedRoute> },
      ],
    },
  ],
);