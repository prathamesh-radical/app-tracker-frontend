import { useContext } from "react";
import { MyContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function useFunction() {
    const { registerFormData, loginFormData, setLoading, setToken, setIsAuthenticated, handleNull } = useContext(MyContext);
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_ + "/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerFormData)
            });
            
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || "Registration successful! Please log in.");
                handleNull();
                navigate("/login");
            } else {
                toast.error(data.message || "Registration failed.");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_ + "/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginFormData)
            });
            
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || "Login successful!");
                setToken(data.token);
                setIsAuthenticated(true);
                localStorage.setItem('token', data.token);
                handleNull();
                navigate("/home");
            } else {
                toast.error(data.message || "Login failed.");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        toast.success("Logout successful!");
        navigate("/login");
    }

    return { handleRegister, handleLogin, handleLogout };
}