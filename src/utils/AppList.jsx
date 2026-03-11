import debtTrackerImage from "../assets/debttracker.png";
import invoicemanager from "../assets/invoicemanager.png";
import moneycollection from "../assets/moneycollection.jpg";
import visitormanagement from "../assets/visitormanagement.png";
import useFetch from "../hooks/useFetch";

export default function AppList() {
    const { data: debtorsData, loading: debtorsLoading, error: debtorsError } = useFetch('/api/debtors');
    const { data: mechanicData, loading: mechanicLoading, error: mechanicError } = useFetch('/api/mechanic');
    const { data: mechanicUserData, loading: mechanicUserDataLoading, error: mechanicUserDataError } = useFetch('/api/mechanic-data');
    const { data: mechanicServicesData } = useFetch('/api/mechanic-services-data');
    const { data: moneycollectData, loading: moneycollectLoading, error: moneycollectError } = useFetch('/api/money-collect');
    const { data: moneycollectUserData, loading: moneycollectUserDataLoading, error: moneycollectUserDataError } = useFetch('/api/money-collect-data');
    const { data: guestEntriesData, loading: guestEntriesLoading, error: guestEntriesError } = useFetch('/api/guest-entries');
    const { data: guestEntriesUserData, loading: guestEntriesUserDataLoading, error: guestEntriesUserDataError } = useFetch('/api/guest-entries-data');

    return [
        {
            id: 1,
            appName: 'My Debt Tracker',
            appId: 'com.peccular.debttracker',
            src: debtTrackerImage,
            appData: [{ data: debtorsData, loading: debtorsLoading, error: debtorsError, userData: null, userDataLoading: null, userDataError: null }]
        },
        {
            id: 2,
            appName: 'Mechanic Invoice Manager',
            appId: 'com.peccular.mechanic',
            src: invoicemanager,
            appData: [
                {
                    data: mechanicData,
                    loading: mechanicLoading,
                    error: mechanicError,
                    userData: mechanicUserData,
                    userDataLoading: mechanicUserDataLoading,
                    userDataError: mechanicUserDataError,
                    servicesData: mechanicServicesData,
                }
            ]
        },
        {
            id: 3,
            appName: 'Smart Money Collection',
            appId: 'com.peccular.moneycollect',
            src: moneycollection,
            appData: [
                {
                    data: moneycollectData,
                    loading: moneycollectLoading,
                    error: moneycollectError,
                    userData: moneycollectUserData,
                    userDataLoading: moneycollectUserDataLoading,
                    userDataError: moneycollectUserDataError
                }
            ]
        },
        {
            id: 4,
            appName: 'Entry Book Visitor Management',
            appId: 'com.peccular.entrybook',
            src: visitormanagement,
            appData: [
                {
                    data: guestEntriesData,
                    loading: guestEntriesLoading,
                    error: guestEntriesError,
                    userData: guestEntriesUserData,
                    userDataLoading: guestEntriesUserDataLoading,
                    userDataError: guestEntriesUserDataError
                }
            ]
        }
    ];
}