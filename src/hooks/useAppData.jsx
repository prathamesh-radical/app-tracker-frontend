import useFetch from "./useFetch";
import AppList from "../utils/AppList";

export default function useAppData(appId) {
    const app = AppList.find((a) => a.id == appId);
    const endpoints = app?.endpoints ?? {};

    const main     = useFetch(endpoints.main         ?? null);
    const user     = useFetch(endpoints.userData     ?? null);
    const services = useFetch(endpoints.servicesData ?? null);

    if (!app) {
        return {
            app: null,
            data: [],
            loading: false,
            error: "App not found",
            userData: null,
            servicesData: null,
            secondaryLoading: false
        };
    }

    const needsUserData     = Boolean(endpoints.userData);
    const needsServicesData = Boolean(endpoints.servicesData);

    const secondaryLoading =
        (needsUserData     && user.loading) ||
        (needsServicesData && services.loading);

    return {
        app,
        data:         main.data,
        loading:      main.loading,
        error:        main.error,
        userData:     needsUserData     ? user.data     : null,
        servicesData: needsServicesData ? services.data : null,
        secondaryLoading,
    };
}