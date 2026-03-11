import debtTrackerImage from "../assets/debttracker.png";
import invoicemanager from "../assets/invoicemanager.png";
import moneycollection from "../assets/moneycollection.jpg";
import visitormanagement from "../assets/visitormanagement.png";

const AppList = [
    {
        id: 1,
        appName: 'My Debt Tracker',
        appId: 'com.peccular.debttracker',
        src: debtTrackerImage,
        endpoints: {
            main: '/api/debtors',
        },
    },
    {
        id: 2,
        appName: 'Mechanic Invoice Manager',
        appId: 'com.peccular.mechanic',
        src: invoicemanager,
        endpoints: {
            main: '/api/mechanic',
            userData: '/api/mechanic-data',
            servicesData: '/api/mechanic-services-data',
        },
    },
    {
        id: 3,
        appName: 'Smart Money Collection',
        appId: 'com.peccular.moneycollect',
        src: moneycollection,
        endpoints: {
            main: '/api/money-collect',
            userData: '/api/money-collect-data',
        },
    },
    {
        id: 4,
        appName: 'Entry Book Visitor Management',
        appId: 'com.peccular.entrybook',
        src: visitormanagement,
        endpoints: {
            main: '/api/guest-entries',
            userData: '/api/guest-entries-data',
        },
    },
];

export default AppList;