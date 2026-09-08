import { useState, useEffect, useRef, useCallback } from "react";
import { MyContext } from "./context";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { getCountriesForCurrency } from "currency-country";
import useFetch from "../hooks/useFetch";
import { allApps } from "../utils/constant";

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

function getCountryFromCurrency(currency) {
    if (!currency) return null;

    const normalizedCurrency = String(currency).trim().toUpperCase();
    const countryCodes = getCountriesForCurrency(normalizedCurrency);

    return countryCodes
        .map((countryCode) => countryNames.of(countryCode))
        .filter(Boolean)
        .join(", ") || null;
}

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
    const { data: debtorsData, loading: debtorsLoading } = useFetch('/api/debtors');
    const { data: debtorsActiveData, loading: debtorsActiveLoading } = useFetch('/api/debt-active-users');

    const { data: mechanicData, loading: mechanicLoading } = useFetch('/api/mechanic');
    const { data: mechanicUsersData, loading: mechanicUsersLoading } = useFetch('/api/mechanic-data');
    const { data: mechanicServiceData, loading: mechanicServiceLoading } = useFetch('/api/mechanic-services-data');
    const { data: mechanicPremiumData, loading: mechanicPremiumLoading } = useFetch('/api/mechanic-premium-users');
    const { data: mechanicActiveData, loading: mechanicActiveLoading } = useFetch('/api/mechanic-active-users');

    const { data: smartMoneyData, loading: smartMoneyLoading } = useFetch('/api/money-collect');
    const { data: smartMoneyUsersData, loading: smartMoneyUsersLoading } = useFetch('/api/money-collect-data');
    const { data: smartActiveData, loading: smartActiveLoading } = useFetch('/api/smart-active-users');

    const { data: visitorsData, loading: visitorsLoading } = useFetch('/api/guest-entries');
    const { data: visitorsUserData, loading: visitorsUserLoading } = useFetch('/api/guest-entries-data');
    const { data: visitorsActiveData, loading: visitorsActiveLoading } = useFetch('/api/guest-active-users');

    const { data: danceData, loading: danceLoading } = useFetch('/api/dance-studio-users');

    const { data: buddyWalkData, loading: buddyWalkLoading } = useFetch('/api/buddy-walk-steps');
    const { data: buddyGroupData, loading: buddyGroupLoading } = useFetch('/api/get-group-data');
    const { data: buddyGroupMemberData, loading: buddyGroupMemberLoading } = useFetch('/api/get-group-member-data');
    const { data: buddyStepsData, loading: buddyStepsLoading } = useFetch('/api/user-steps');
    const { data: buddyActiveData, loading: buddyActiveLoading } = useFetch('/api/buddy-active-users');

    const { data: rgMechanicData, loading: rgMechanicLoading } = useFetch('/api/get-rg-mechanic-users');
    const { data: rgMechanicActiveData, loading: rgMechanicActiveLoading } = useFetch('/api/rg-mechanic-active-users');
    const { data: rgMechanicServiceData, loading: rgMechanicServiceLoading } = useFetch('/api/rg-mechanic-services-data');
    const { data: rgMechanicInvoiceData, loading: rgMechanicInvoiceLoading } = useFetch('/api/rg-mechanic-invoices-data');

    const { data: MoneyLenderData, loading: MoneyLenderLoading } = useFetch('/api/money-lender');
    const { data: MoneyLenderUsersData, loading: MoneyLenderUsersLoading } = useFetch('/api/money-lender-data');
    const { data: MoneyLenderActiveData, loading: MoneyLenderActiveLoading } = useFetch('/api/money-lender-active-users');
    const { data: MoneyLenderSettingsData, loading: MoneyLenderSettingsLoading } = useFetch('/api/money-lender-settings');

    const loader = debtorsLoading + debtorsActiveLoading + mechanicLoading + mechanicUsersLoading + mechanicServiceLoading + mechanicActiveLoading + MoneyLenderLoading + MoneyLenderUsersLoading + MoneyLenderActiveLoading + MoneyLenderSettingsLoading + visitorsLoading + visitorsUserLoading + visitorsActiveLoading + danceLoading + buddyWalkLoading + buddyGroupLoading + buddyGroupMemberLoading + buddyStepsLoading + buddyActiveLoading + rgMechanicLoading + rgMechanicActiveLoading + rgMechanicServiceLoading + rgMechanicInvoiceLoading + mechanicPremiumLoading + smartMoneyLoading + smartMoneyUsersLoading + smartActiveLoading;

    const filteredMoneyLenderData = MoneyLenderData.map((lender) => {
        const settings = MoneyLenderSettingsData.find(
            (setting) => String(setting.user_id) === String(lender.id)
        );

        return {
            ...lender,
            currency: settings?.currency || null,
            country: getCountryFromCurrency(settings?.currency),
        };
    });

    const [registerFormData, setRegisterFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const [forgotFormData, setForgotFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

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
    }, [setToken, setIsAuthenticated]);

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
        setForgotFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    function handleNull() {
        setRegisterFormData({ email: "", password: "", confirmPassword: "" });
        setLoginFormData({ email: "", password: "" });
        setForgotFormData({ password: "", confirmPassword: "" })
    }

    const appList = allApps(
        debtorsData, debtorsActiveData, debtorsLoading, debtorsActiveLoading, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicPremiumData, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, mechanicPremiumLoading, smartMoneyData, smartMoneyUsersData, smartActiveData, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading, visitorsData, visitorsUserData, visitorsActiveData, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceData, danceLoading, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicData, rgMechanicActiveData, rgMechanicServiceData, rgMechanicInvoiceData, rgMechanicLoading, rgMechanicActiveLoading, rgMechanicServiceLoading, rgMechanicInvoiceLoading, MoneyLenderData, MoneyLenderUsersData, MoneyLenderActiveData, MoneyLenderLoading, MoneyLenderUsersLoading, MoneyLenderActiveLoading, MoneyLenderSettingsData, MoneyLenderSettingsLoading, filteredMoneyLenderData
    );

    const values = {
        debtorsData, debtorsActiveData, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicPremiumData, MoneyLenderData, MoneyLenderUsersData, MoneyLenderActiveData, MoneyLenderSettingsData, filteredMoneyLenderData, MoneyLenderSettingsLoading, visitorsData, visitorsUserData, visitorsActiveData, danceData, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, rgMechanicData, rgMechanicActiveData, rgMechanicServiceData, rgMechanicInvoiceData, debtorsLoading, debtorsActiveLoading, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, MoneyLenderLoading, MoneyLenderUsersLoading, MoneyLenderActiveLoading, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceLoading, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicLoading, rgMechanicActiveLoading, rgMechanicServiceLoading, rgMechanicInvoiceLoading, mechanicPremiumLoading, loader, registerFormData, handleChange, loading, setLoading, loginFormData, token, setToken, isAuthenticated, setIsAuthenticated, handleNull, handleLogout, registerNavigate, forgotFormData, setForgotFormData, appList, smartMoneyData, smartMoneyUsersData, smartActiveData, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading
    };

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};