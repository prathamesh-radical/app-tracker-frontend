import { MdGridView, MdElectricBolt } from "react-icons/md";
import { IoDownloadOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { BiPackage } from "react-icons/bi";

export const publishers = (
    peccularData, peccularTotalInstalls, peccularActiveUsers, radicalData, radicalTotalInstalls, radicalActiveUsers, filteredPeccularData, filteredRadicalData
) => [
        {
            id: 1,
            name: "Peccular",
            badge: "Publisher",
            icon: "📦",
            color: "blue",
            bgGradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            viewAnalytics: "View analytics",
            stats: {
                totalApps: { value: peccularData?.length, label: "Apps" },
                totalInstalls: { value: peccularTotalInstalls, label: "Total Users" },
                activeUsers: { value: peccularActiveUsers, label: "Active Users" }
            },
            topApp: {
                name: filteredPeccularData[0]?.appName,
                packageName: filteredPeccularData[0]?.appId,
                rating: 4.6,
                icon: "⚡"
            }
        },
        {
            id: 2,
            name: "Radical Global",
            badge: "Publisher",
            icon: "🎯",
            color: "purple",
            bgGradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
            viewAnalytics: "View analytics",
            stats: {
                totalApps: { value: radicalData?.length, label: "Apps" },
                totalInstalls: { value: radicalTotalInstalls, label: "Total Users" },
                activeUsers: { value: radicalActiveUsers, label: "Active Users" }
            },
            topApp: {
                name: filteredRadicalData[0]?.appName,
                packageName: filteredRadicalData[0]?.appId,
                rating: 4.7,
                icon: "⚡"
            }
        }
    ];

export const summaryStats = (
    peccularData, radicalData, peccularTotalInstalls, radicalTotalInstalls, peccularActiveUsers, radicalActiveUsers, topApp
) => [
    {
        id: 1,
        appId: null,
        title: "Total Apps",
        value: peccularData?.length + radicalData?.length,
        description: "All publishers",
        icon: MdGridView,
        bgColor: "rgba(16, 185, 129, 0.1)",
        iconColor: "#10b981"
    },
    {
        id: 2,
        appId: null,
        title: "Total Users",
        value: peccularTotalInstalls + radicalTotalInstalls,
        description: "All apps",
        icon: IoDownloadOutline,
        bgColor: "rgba(217, 119, 6, 0.1)",
        iconColor: "#d97706"
    },
    {
        id: 3,
        appId: null,
        title: "Active Users",
        value: peccularActiveUsers + radicalActiveUsers,
        description: "All apps",
        icon: FiUsers,
        bgColor: "rgba(139, 92, 246, 0.1)",
        iconColor: "#8b5cf6"
    },
    {
        id: 4,
        appId: topApp[0]?.appId,
        title: "Top App",
        value: topApp[0]?.appName,
        description: "All apps",
        icon: MdElectricBolt,
        bgColor: "rgba(139, 92, 246, 0.1)",
        iconColor: "#8b5cf6"
    }
];