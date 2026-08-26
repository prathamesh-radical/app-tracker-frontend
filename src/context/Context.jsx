import { useState, useEffect, useRef, useCallback } from "react";
import { MyContext } from "./context";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import useFetch from "../hooks/useFetch";
import { allApps } from "../utils/constant";

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

    // const filteredMechanicData = mechanicData?.filter(item => item?.subscription_order_id != null);
    // const filteredMechanicPremiumData = mechanicPremiumData?.filter(item => item?.order_id != null);

    // const combinedSubscriptionData = [
    //     ...(filteredMechanicData || []).map(item => ({
    //         ...item,
    //         order_id: item.subscription_order_id,
    //     })),

    //     ...(filteredMechanicPremiumData || []),
    // ];

    // const uniqueSubscriptionData = Array.from(
    //     new Map(
    //         combinedSubscriptionData.map(item => [
    //             item.order_id,
    //             item
    //         ])
    //     ).values()
    // );

    // const orderIds = uniqueSubscriptionData?.map(item => item?.order_id);

    const loader = debtorsLoading + debtorsActiveLoading + mechanicLoading + mechanicUsersLoading + mechanicServiceLoading + mechanicActiveLoading + smartMoneyLoading + smartMoneyUsersLoading + smartActiveLoading + visitorsLoading + visitorsUserLoading + visitorsActiveLoading + danceLoading + buddyWalkLoading + buddyGroupLoading + buddyGroupMemberLoading + buddyStepsLoading + buddyActiveLoading + rgMechanicLoading + rgMechanicActiveLoading + rgMechanicServiceLoading + rgMechanicInvoiceLoading + mechanicPremiumLoading;

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

    // useEffect(() => {
    //     const fetchAllSubscriptionsByOrderIds = async () => {
    //         if (!orderIds || orderIds.length === 0) {
    //             setSubscriptionLoading(false);
    //             return;
    //         }

    //         try {
    //             const jwtToken = localStorage.getItem('token');

    //             const response = await fetch(
    //                 `${import.meta.env.VITE_BACKEND_URL}/api/bulk-subscriptions`,
    //                 {
    //                     method: 'POST',
    //                     headers: {
    //                         Authorization: `Bearer ${jwtToken}`,
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({
    //                         orderIds: orderIds,
    //                         packageName: 'com.peccular.mechanic',
    //                     })
    //                 }
    //             );

    //             const result = await response.json();

    //             if (result.success) {
    //                 setMechanicSubscriptionData(result);
    //             }
    //         } catch (err) {
    //             toast.error('Failed to fetch subscription data', err);
    //         } finally {
    //             setSubscriptionLoading(false);
    //         }
    //     };

    //     fetchAllSubscriptionsByOrderIds();
    // }, [orderIds]);

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
        setForgotFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    function handleNull() {
        setRegisterFormData({ email: "", password: "", confirmPassword: "" });
        setLoginFormData({ email: "", password: "" });
        setForgotFormData({ password: "", confirmPassword: "" })
    }

    const appList = allApps(
        debtorsData, debtorsActiveData, debtorsLoading, debtorsActiveLoading, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicPremiumData, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, mechanicPremiumLoading, smartMoneyData, smartMoneyUsersData, smartActiveData, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading, visitorsData, visitorsUserData, visitorsActiveData, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceData, danceLoading, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicData, rgMechanicActiveData, rgMechanicServiceData, rgMechanicInvoiceData, rgMechanicLoading, rgMechanicActiveLoading, rgMechanicServiceLoading, rgMechanicInvoiceLoading
    );

    const values = {
        debtorsData, debtorsActiveData, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicPremiumData, smartMoneyData, smartMoneyUsersData, smartActiveData, visitorsData, visitorsUserData, visitorsActiveData, danceData, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, rgMechanicData, rgMechanicActiveData, rgMechanicServiceData, rgMechanicInvoiceData, debtorsLoading, debtorsActiveLoading, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceLoading, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicLoading, rgMechanicActiveLoading, rgMechanicServiceLoading, rgMechanicInvoiceLoading, mechanicPremiumLoading, loader, registerFormData, handleChange, loading, setLoading, loginFormData, token, setToken, isAuthenticated, setIsAuthenticated, handleNull, handleLogout, registerNavigate, forgotFormData, setForgotFormData, appList
    };

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};