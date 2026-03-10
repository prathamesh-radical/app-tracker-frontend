import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "../context/context";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(MyContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}