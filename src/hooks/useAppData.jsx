import useFetch from "./useFetch";
import AppList from "../utils/AppList";

export default function useAppData(appId) {
    const app = AppList.find((a) => a.id == appId);
    const endpoints = app?.endpoints ?? {};

    const main     = useFetch(endpoints.main       ?? null);
    const user     = useFetch(endpoints.userData   ?? null);
    const services = useFetch(endpoints.servicesData ?? null);

    if (!app) {
        return { app: null, data: [], loading: false, error: "App not found", userData: null, servicesData: null };
    }

    return {
        app,
        data:         main.data,
        loading:      main.loading,
        error:        main.error,
        userData:     endpoints.userData     ? user.data     : null,
        servicesData: endpoints.servicesData ? services.data : null,
    };
}