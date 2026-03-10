import { useState } from "react";
import { MyContext } from "./context";

export const MyContextProvider = ({ children }) => {
    const [registerFormData, setRegisterFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loginFormData, setLoginFormData] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    const handleChange = (field) => (e) => {
        setRegisterFormData((prev) => ({ ...prev, [field]: e.target.value }));
        setLoginFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    function handleNull() {
        setRegisterFormData({ email: "", password: "", confirmPassword: "" });
        setLoginFormData({ email: "", password: "" });
    }

    const values = {
        registerFormData, handleChange, loading, setLoading, loginFormData, token, setToken, isAuthenticated, setIsAuthenticated, handleNull
    };

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};