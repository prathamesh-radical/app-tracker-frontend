import currency from 'currency.js';
import debtTrackerImage from "../assets/debttracker.png";
import invoiceImage from "../assets/invoice.png";
import moneycollection from "../assets/moneycollection.jpg";
import visitormanagement from "../assets/visitormanagement.png";
import dancestudiomanager from "../assets/dancestudiomanager.jpg";
import buddywalk from "../assets/buddywalk.png";
import mechanic from "../assets/mechanic.png";
import { HiUsers } from "react-icons/hi2";
import { FaUserSecret } from "react-icons/fa6";
import { GiQueenCrown } from "react-icons/gi";
import { TbCrownOff } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";

export const tableContainerSx = {
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.5) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(148, 163, 184, 0.08)',
    borderRadius: '16px',
    boxShadow: '0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
    overflowY: 'hidden',
    overflowX: 'auto',
};

export const adminRowSx = {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
};

export const adminCellSx = {
    textAlign: 'center !important',
    color: '#fff',
    fontWeight: 600,
    fontSize: '1rem !important',
    letterSpacing: '0.1em',
    padding: '14px 20px',
    borderBottom: 'none',
    whiteSpace: 'nowrap',
};

export const headRowSx = {
    background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%)',
    borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
};

export const headCellSx = {
    color: '#94a3b8',
    fontWeight: 600,
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '14px 20px',
    borderBottom: 'none',
    whiteSpace: 'nowrap',
};

export const bodyCellSx = {
    color: '#cbd5e1',
    fontSize: '0.875rem',
    padding: '13px 20px',
    borderBottom: '1px solid rgba(148, 163, 184, 0.06)',
};

export const idCellSx = {
    ...bodyCellSx,
    color: '#64748b',
    fontFamily: 'monospace',
    fontSize: '0.78rem',
};

export const bodyRowSx = {
    transition: 'background 0.2s ease',
    '&:hover': {
        background: 'rgba(59, 130, 246, 0.05)',
    },
    '&:last-child td': {
        borderBottom: 'none',
    },
};

export const emailChipSx = {
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#93c5fd',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    fontSize: '0.75rem',
    height: '24px',
    fontFamily: 'monospace',
};

export const countChipSx = {
    background: 'rgba(6, 182, 212, 0.1)',
    color: '#67e8f9',
    border: '1px solid rgba(6, 182, 212, 0.2)',
    fontSize: '0.85rem',
    height: '24px',
    fontWeight: 600,
};

export const dateStyle = {
    color: '#64748b',
    fontSize: '0.88rem',
    fontFamily: 'monospace',
};

export function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
export function formatCurrency(amount, currencyCode) {
    const symbol = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currencyCode,
    })
        .formatToParts(0)
        .find(part => part.type === 'currency')?.value || currencyCode;

    return currency(amount, { symbol, precision: 2 }).format();
}

export const getCombinedInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
};

export const getInitials = (user = {}) => {
    const firstName = user.firstName || user.firstname || user?.first_name || "";
    const lastName = user.lastName || user.lastname || user?.last_name || "";

    if (!firstName && !lastName) return "?";

    const fInitial = firstName.trim()?.charAt(0) || "";
    const lInitial = lastName.trim()?.charAt(0) || "";

    return (fInitial + lInitial).toUpperCase() || "?";
};

export const allApps = (
    debtorsData, debtorsActiveData, debtorsLoading, debtorsActiveLoading, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, smartMoneyData, smartMoneyUsersData, smartActiveData, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading, visitorsData, visitorsUserData, visitorsActiveData, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceData, danceLoading, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicData, rgMechanicActiveData, rgMechanicLoading, rgMechanicActiveLoading
) => [
        {
            id: 1,
            name: "My Debt Tracker",
            packageName: "com.peccular.debttracker",
            icon: debtTrackerImage,
            publisher: "Peccular",
            publisherColor: "blue",
            stats: {
                allUsers: debtorsData?.length,
                activeUsers: debtorsActiveData?.length || 0,
                premium: debtorsData?.filter(item => item?.is_premium === 1)?.length || 0,
            },
            mapping: {
                dataKey: debtorsData,
                loadingKey: debtorsLoading + debtorsActiveLoading,
                activeCountKey: debtorsActiveData,
                userDataKey: null,
                serviceDataKey: null,
                stepsDataKey: null,
            }
        },
        {
            id: 2,
            name: "Mechanic Invoice Manager",
            packageName: "com.peccular.mechanic",
            icon: invoiceImage,
            publisher: "Peccular",
            publisherColor: "blue",
            stats: {
                allUsers: mechanicData?.length,
                activeUsers: mechanicActiveData?.length || 0,
                premium: mechanicData?.filter(item => item?.subscription_status === 'premium_active')?.length || 0
            },
            mapping: {
                dataKey: mechanicData,
                loadingKey: mechanicLoading + mechanicUsersLoading + mechanicServiceLoading + mechanicActiveLoading,
                activeCountKey: mechanicActiveData,
                userDataKey: mechanicUsersData,
                serviceDataKey: mechanicServiceData,
                stepsDataKey: null,
            }
        },
        {
            id: 3,
            name: "Smart Money Collection",
            packageName: "com.peccular.moneycollect",
            icon: moneycollection,
            publisher: "Peccular",
            publisherColor: "blue",
            stats: {
                allUsers: smartMoneyData?.length,
                activeUsers: smartActiveData?.length || 0,
                premium: "-"
            },
            mapping: {
                dataKey: smartMoneyData,
                loadingKey: smartMoneyLoading + smartMoneyUsersLoading + smartActiveLoading,
                activeCountKey: smartActiveData,
                userDataKey: smartMoneyUsersData,
                serviceDataKey: null,
                stepsDataKey: null,
            }
        },
        {
            id: 4,
            name: "Entry Book Visitor Manager",
            packageName: "com.peccular.entrybook",
            icon: visitormanagement,
            publisher: "Peccular",
            publisherColor: "blue",
            stats: {
                allUsers: visitorsData?.length,
                activeUsers: visitorsActiveData?.length || 0,
                premium: "-"
            },
            mapping: {
                dataKey: visitorsData,
                loadingKey: visitorsLoading + visitorsUserLoading + visitorsActiveLoading,
                activeCountKey: visitorsActiveData,
                userDataKey: visitorsUserData,
                serviceDataKey: null,
                stepsDataKey: null,
            }
        },
        {
            id: 5,
            name: "Dance Studio Management",
            packageName: "com.peccular.dancestudiomanager",
            icon: dancestudiomanager,
            publisher: "Peccular",
            publisherColor: "blue",
            stats: {
                allUsers: danceData?.length || 0,
                activeUsers: "-",
                premium: "-"
            },
            mapping: {
                dataKey: danceData,
                loadingKey: danceLoading,
                activeCountKey: null,
                userDataKey: null,
                serviceDataKey: null,
                stepsDataKey: null,
            }
        },
        {
            id: 6,
            name: "BuddyWalk Group Steps Counter",
            packageName: "com.radicalapp.buddywalk",
            icon: buddywalk,
            publisher: "Radical Global",
            publisherColor: "purple",
            stats: {
                allUsers: buddyWalkData?.length,
                activeUsers: buddyActiveData?.length || 0,
                premium: "-"
            },
            mapping: {
                dataKey: buddyWalkData,
                loadingKey: buddyWalkLoading + buddyGroupLoading + buddyGroupMemberLoading + buddyStepsLoading + buddyActiveLoading,
                activeCountKey: buddyActiveData,
                userDataKey: buddyGroupData,
                serviceDataKey: buddyGroupMemberData,
                stepsDataKey: buddyStepsData,
            }
        },
        {
            id: 7,
            name: "RG Mechanic Invoice Manager",
            packageName: "com.radicalapp.mechanic",
            icon: mechanic,
            publisher: "Radical Global",
            publisherColor: "purple",
            stats: {
                allUsers: rgMechanicData?.length,
                activeUsers: rgMechanicActiveData?.length,
                premium: "-"
            },
            mapping: {
                dataKey: rgMechanicData,
                loadingKey: rgMechanicLoading + rgMechanicActiveLoading,
                activeCountKey: rgMechanicActiveData,
                userDataKey: null,
                serviceDataKey: null,
                stepsDataKey: null,
            }
        }
    ];

export const stats = (data, activeCountData, newUsersCount, trialUsersData, premiumUsersData, expiredUsersData) => [
    {
        id: 'totalUsers',
        label: "Total Users",
        text: 'Tap to view',
        value: data?.length,
        icon: HiUsers,
        className: "total-users-icon"
    },
    {
        id: 'activeUsers',
        label: "Active Users",
        text: 'Tap to view',
        value: activeCountData?.length || 0,
        icon: HiUsers,
        className: "active-users-icon"
    },
    {
        id: 'newUsers',
        label: "New Users",
        text: 'Tap to view',
        value: `${newUsersCount || 0} (Today)`,
        icon: HiUsers,
        className: "new-users-icon"
    },
    {
        id: 'freeTrialUsers',
        label: "Free Trial Users",
        text: 'Tap to view',
        value: trialUsersData?.length || 0,
        icon: HiUsers,
        className: "freetrial-users-icon"
    },
    {
        id: 'premiumUsers',
        label: "Premium Users",
        text: 'Tap to view',
        value: premiumUsersData?.length || 0,
        icon: GiQueenCrown,
        className: "engagement-icon"
    },
    {
        id: 'nonPremiumUsers',
        label: "Premium Expired Users",
        text: 'Tap to view',
        value: expiredUsersData?.length || 0,
        icon: TbCrownOff,
        className: "updated-icon"
    },
];

export const statsData = (totalServices, activeServices, inactiveServices) => [
    {
        id: 'totalServices',
        icon: HiUsers,
        label: 'Total Services',
        value: totalServices,
        text: 'Services',
        className: 'total-users-icon'
    },
    {
        id: 'activeServices',
        icon: FaCheckCircle,
        label: 'Active Services',
        value: activeServices,
        text: 'Active',
        className: 'active-users-icon'
    },
    {
        id: 'inactiveServices',
        icon: MdOutlineErrorOutline,
        label: 'Inactive Services',
        value: inactiveServices,
        text: 'Inactive',
        className: 'engagement-icon'
    },
];