import { useContext } from "react";
import debtTrackerImage from "../assets/debttracker.png";
import invoicemanager from "../assets/invoicemanager.png";
import moneycollection from "../assets/moneycollection.jpg";
import visitormanagement from "../assets/visitormanagement.png";
import { MyContext } from "../context/context";

export default function AppList() {
    const { 
        debtorsData, debtorsLoading, debtorsError, mechanicData, mechanicLoading, mechanicError, mechanicServicesData, moneycollectData, moneycollectLoading, moneycollectError, mechanicUserData, mechanicUserDataLoading, mechanicUserDataError, moneycollectUserData, moneycollectUserDataLoading, moneycollectUserDataError, guestEntriesData, guestEntriesLoading, guestEntriesError, guestEntriesUserData, guestEntriesUserDataLoading, guestEntriesUserDataError
    } = useContext(MyContext);

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