import { useState, useEffect, useRef, useCallback } from "react";
import { MyContext } from "./context";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import useFetch from "../hooks/useFetch";

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
    const {data: debtorsData, loading: debtorsLoading} = useFetch('/api/debtors');
    const {data: debtorsActiveData, loading: debtorsActiveLoading} = useFetch('/api/debt-active-users');

    const {data: mechanicData, loading: mechanicLoading} = useFetch('/api/mechanic');
    const {data: mechanicUsersData, loading: mechanicUsersLoading} = useFetch('/api/mechanic-data');
    const {data: mechanicServiceData, loading: mechanicServiceLoading} = useFetch('/api/mechanic-services-data');
    const {data: mechanicActiveData, loading: mechanicActiveLoading} = useFetch('/api/mechanic-active-users');

    const {data: smartMoneyData, loading: smartMoneyLoading} = useFetch('/api/money-collect');
    const {data: smartMoneyUsersData, loading: smartMoneyUsersLoading} = useFetch('/api/money-collect-data');
    const {data: smartActiveData, loading: smartActiveLoading} = useFetch('/api/smart-active-users');

    const {data: visitorsData, loading: visitorsLoading} = useFetch('/api/guest-entries');
    const {data: visitorsUserData, loading: visitorsUserLoading} = useFetch('/api/guest-entries-data');
    const {data: visitorsActiveData, loading: visitorsActiveLoading} = useFetch('/api/guest-active-users');

    const {data: danceData, loading: danceLoading} = useFetch('/api/dance-studio-users');

    const {data: buddyWalkData, loading: buddyWalkLoading} = useFetch('/api/buddy-walk-steps');
    const {data: buddyGroupData, loading: buddyGroupLoading} = useFetch('/api/get-group-data');
    const {data: buddyGroupMemberData, loading: buddyGroupMemberLoading} = useFetch('/api/get-group-member-data');
    const {data: buddyStepsData, loading: buddyStepsLoading} = useFetch('/api/user-steps');
    const {data: buddyActiveData, loading: buddyActiveLoading} = useFetch('/api/buddy-active-users');

    const {data: rgMechanicData, loading: rgMechanicLoading} = useFetch('/api/get-rg-mechanic-users');
    const {data: rgMechanicActiveData, loading: rgMechanicActiveLoading} = useFetch('/api/rg-mechanic-active-users');

    const loader = debtorsLoading + debtorsActiveLoading + mechanicLoading + mechanicUsersLoading + mechanicServiceLoading + mechanicActiveLoading + smartMoneyLoading + smartMoneyUsersLoading + smartActiveLoading + visitorsLoading + visitorsUserLoading + visitorsActiveLoading + danceLoading + buddyWalkLoading + buddyGroupLoading + buddyGroupMemberLoading + buddyStepsLoading + buddyActiveLoading + rgMechanicLoading + rgMechanicActiveLoading;

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
        debtorsData, debtorsActiveData, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, smartMoneyData, smartMoneyUsersData, smartActiveData, visitorsData, visitorsUserData, visitorsActiveData, danceData, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, rgMechanicData, rgMechanicActiveData, loader, registerFormData, handleChange, loading, setLoading, loginFormData, token, setToken, isAuthenticated, setIsAuthenticated, handleNull, handleLogout, registerNavigate,
    };

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};