import { useState, useEffect, useRef, useCallback } from "react";
import { MyContext } from "./context";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

function getValidToken() {
    const stored = localStorage.getItem('token');
    if (!stored) return null;
    try {
        const { exp } = jwtDecode(stored);
        if (exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            return null;
        }
        return stored;
    } catch {
        localStorage.removeItem('token');
        return null;
    }
}

export const MyContextProvider = ({ children }) => {
    const [registerFormData, setRegisterFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState(() => getValidToken());
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!getValidToken());

    const navigateRef = useRef(null);

    const registerNavigate = useCallback((navigateFn) => {
        navigateRef.current = navigateFn;
    }, []);

    const handleLogout = useCallback(() => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        toast.success("Session expired. Please log in again.");
        navigateRef.current?.("/login");
    }, []);

    useEffect(() => {
        const checkTokenExpiry = () => {
            const currentToken = localStorage.getItem('token');
            if (!currentToken) return;
            try {
                const { exp } = jwtDecode(currentToken);
                if (exp < Date.now() / 1000) handleLogout();
            } catch {
                handleLogout();
            }
        };

        const interval = setInterval(checkTokenExpiry, 60_000);
        return () => clearInterval(interval);
    }, [handleLogout]);

    const handleChange = (field) => (e) => {
        setRegisterFormData((prev) => ({ ...prev, [field]: e.target.value }));
        setLoginFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    function handleNull() {
        setRegisterFormData({ email: "", password: "", confirmPassword: "" });
        setLoginFormData({ email: "", password: "" });
    }

    const values = {
        registerFormData, handleChange, loading, setLoading, loginFormData, token, setToken, isAuthenticated, setIsAuthenticated, handleNull, handleLogout, registerNavigate,
    };

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};