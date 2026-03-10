import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { MyContext } from "./context";

export const MyContextProvider = ({ children }) => {
    const { data: debtorsData, loading: debtorsLoading, error: debtorsError } = useFetch('/api/debtors');
    const { data: mechanicData, loading: mechanicLoading, error: mechanicError } = useFetch('/api/mechanic');
    const { data: mechanicUserData, loading: mechanicUserDataLoading, error: mechanicUserDataError } = useFetch('/api/mechanic-data');
    const { data: mechanicServicesData, loading: mechanicServicesDataLoading, error: mechanicServicesDataError } = useFetch('/api/mechanic-services-data');
    const { data: moneycollectData, loading: moneycollectLoading, error: moneycollectError } = useFetch('/api/money-collect');
    const { data: moneycollectUserData, loading: moneycollectUserDataLoading, error: moneycollectUserDataError } = useFetch('/api/money-collect-data');
    const { data: guestEntriesData, loading: guestEntriesLoading, error: guestEntriesError } = useFetch('/api/guest-entries');
    const { data: guestEntriesUserData, loading: guestEntriesUserDataLoading, error: guestEntriesUserDataError } = useFetch('/api/guest-entries-data');
    const loader = debtorsLoading || mechanicLoading || mechanicUserDataLoading || mechanicServicesDataLoading || moneycollectLoading || guestEntriesLoading || moneycollectUserDataLoading || guestEntriesUserDataLoading;
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
        debtorsData, debtorsLoading, debtorsError, mechanicData, mechanicLoading, mechanicError, mechanicUserData, mechanicUserDataLoading, mechanicUserDataError, mechanicServicesData, mechanicServicesDataLoading, mechanicServicesDataError, moneycollectData, moneycollectLoading, moneycollectError, moneycollectUserData, moneycollectUserDataLoading, moneycollectUserDataError, guestEntriesData, guestEntriesLoading, guestEntriesError, guestEntriesUserData, guestEntriesUserDataLoading, guestEntriesUserDataError, loader, registerFormData, handleChange, loading, setLoading, loginFormData, token, setToken, isAuthenticated, setIsAuthenticated, handleNull
    };

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};