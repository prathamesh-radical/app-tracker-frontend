import useFetch from "./useFetch";
import AppList from "../utils/AppList";

export default function useAppData(appId) {
    const app = AppList.find((a) => a.id == appId);
    const endpoints = app?.endpoints ?? {};

    const main         = useFetch(endpoints.main         ?? null);
    const user         = useFetch(endpoints.userData     ?? null);
    const services     = useFetch(endpoints.servicesData ?? null);
    const steps        = useFetch(endpoints.stepsData    ?? null); 
    const activeStats  = useFetch(endpoints.activeUsers  ?? null); 

    if (!app) {
        return {
            app: null,
            data: [],
            loading: false,
            error: "App not found",
            userData: null,
            servicesData: null,
            stepsData: null,
            activeCount: 0,
            secondaryLoading: false
        };
    }

    const needsUserData     = Boolean(endpoints.userData);
    const needsServicesData = Boolean(endpoints.servicesData);
    const needsStepsData    = Boolean(endpoints.stepsData);
    const needsActiveStats  = Boolean(endpoints.activeUsers);

    const secondaryLoading =
        (needsUserData     && user.loading) ||
        (needsServicesData && services.loading) ||
        (needsStepsData    && steps.loading) ||
        (needsActiveStats  && activeStats.loading);

    return {
        app,
        data:         main.data,
        loading:      main.loading,
        error:        main.error,
        userData:     needsUserData     ? user.data     : null,
        servicesData: needsServicesData ? services.data : null,
        stepsData:    needsStepsData    ? steps.data    : null,
        activeCount:  needsActiveStats  ? activeStats.data : 0, 
        secondaryLoading,
    };
}