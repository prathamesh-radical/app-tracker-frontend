import debtTrackerImage from "../assets/debttracker.png";
import invoicemanager from "../assets/invoicemanager.png";
import moneycollection from "../assets/moneycollection.jpg";
import visitormanagement from "../assets/visitormanagement.png";
import dancestudiomanager from "../assets/dancestudiomanager.jpg";
import buddywalk from "../assets/buddywalk.png";
import mechanic from "../assets/mechanic.png";

const AppList = [
    {
        id: 1,
        appName: 'My Debt Tracker',
        appId: 'com.peccular.debttracker',
        src: debtTrackerImage,
        endpoints: {
            main: '/api/debtors',
            activeUsers: '/api/debt-active-users',
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
            activeUsers: '/api/mechanic-active-users',
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
            activeUsers: '/api/smart-active-users',
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
            activeUsers: '/api/guest-active-users',
        },
    },
    {
        id: 5,
        appName: 'Dance Studio Management',
        appId: 'com.peccular.dancestudiomanager',
        src: dancestudiomanager,
        endpoints: {
            main: '/api/dance-studio-users',
        },
    },
    {
        id: 6,
        appName: 'BuddyWalk Group steps Counter',
        appId: 'com.radicalapp.buddywalk',
        src: buddywalk,
        endpoints: {
            main: '/api/buddy-walk-steps',
            userData: '/api/get-group-data',
            servicesData: '/api/get-group-member-data',
            stepsData: '/api/user-steps',
            activeUsers: '/api/buddy-active-users',
        },
    },
    {
        id: 7,
        appName: 'RG Mechanic Invoice Manager',
        appId: 'com.radicalapp.mechanic',
        src: mechanic,
        endpoints: {
            main: '/api/get-rg-users',
            activeUsers: '/api/rg-active-users',
        },
    },
];

export default AppList;