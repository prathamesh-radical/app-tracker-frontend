import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
    Paper,
    Pagination,
    TextField,
    Button,
    InputAdornment
} from "@mui/material";
import { useState, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineErrorOutline, MdSearch, MdFilterList, MdDownload } from "react-icons/md";
import AppDataTable from "../components/AppDataTable";
import { HiUsers } from "react-icons/hi2";
import { FaUserSecret } from "react-icons/fa6";
import { GiQueenCrown } from "react-icons/gi";
import { TbCrownOff } from "react-icons/tb";
import "../styles/appdata.css";
import { allApps, stats } from "../utils/constant";
import { MyContext } from "../context/context";

export default function AppData() {
    const {
        debtorsData, debtorsActiveData, debtorsLoading, debtorsActiveLoading, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, smartMoneyData, smartMoneyUsersData, smartActiveData, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading, visitorsData, visitorsUserData, visitorsActiveData, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceData, danceLoading, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicData, rgMechanicActiveData, rgMechanicServiceData, rgMechanicInvoiceData, rgMechanicLoading, rgMechanicActiveLoading, rgMechanicServiceLoading, rgMechanicInvoiceLoading
    } = useContext(MyContext);

    const [page, setPage] = useState(1);
    const [selectedStat, setSelectedStat] = useState('totalUsers');
    const itemsPerPage = 100;
    const location = useLocation();

    const appList = allApps(
        debtorsData, debtorsActiveData, debtorsLoading, debtorsActiveLoading, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, smartMoneyData, smartMoneyUsersData, smartActiveData, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading, visitorsData, visitorsUserData, visitorsActiveData, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceData, danceLoading, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicData, rgMechanicActiveData, rgMechanicServiceData, rgMechanicInvoiceData, rgMechanicLoading, rgMechanicActiveLoading, rgMechanicServiceLoading, rgMechanicInvoiceLoading
    );

    const packageName = location?.pathname?.split('/').pop();

    const currentPageData = appList?.filter(item => item.packageName === packageName);
    const selectedData = currentPageData[0];

    const data = useMemo(() => {
        return selectedData?.mapping?.dataKey
            ? [...selectedData.mapping.dataKey].reverse()
            : [];
    }, [selectedData]);

    const isLoading = useMemo(() => {
        return selectedData ? selectedData?.mapping?.loadingKey : false;
    }, [selectedData]);

    const activeCountData = useMemo(() => {
        return selectedData?.mapping?.activeCountKey || [];
    }, [selectedData]);

    const userData = useMemo(() => {
        return selectedData?.mapping?.userDataKey;
    }, [selectedData]);

    const servicesData = useMemo(() => {
        return selectedData?.mapping?.serviceDataKey;
    }, [selectedData]);

    const stepsData = useMemo(() => {
        return selectedData?.mapping?.stepsDataKey;
    }, [selectedData]);

    const newUsersData = useMemo(() => {
        return data?.filter((user) => {
            const userDate = user.createdAt || user.created_at;
            if (!userDate) return false;

            const created = new Date(userDate);
            const now = new Date();

            return (
                created.getFullYear() === now.getFullYear() &&
                created.getMonth() === now.getMonth() &&
                created.getDate() === now.getDate()
            );
        }) || [];
    }, [data]);

    const trialUsersData = useMemo(() => {
        return data?.filter(item => item?.subscription_status === 'trial_active') || [];
    }, [data]);

    const premiumUsersData = useMemo(() => {
        return data?.filter(item => item?.subscription_status === 'premium_active') || [];
    }, [data]);

    const expiredUsersData = useMemo(() => {
        return data?.filter(item => item?.subscription_status === 'premium_expired') || [];
    }, [data]);

    const getFilteredData = () => {
        switch (selectedStat) {
            case 'totalUsers':
                return data;
            case 'activeUsers':
                return activeCountData;
            case 'newUsers':
                return newUsersData;
            case 'freeTrialUsers':
                return trialUsersData;
            case 'premiumUsers':
                return premiumUsersData;
            case 'nonPremiumUsers':
                return expiredUsersData;
            default:
                return data;
        }
    };

    const filteredData = getFilteredData();

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    let adminId = startIndex + 1;

    const newUsersCount = newUsersData.length;

    const statsData = stats(data, activeCountData, newUsersCount, trialUsersData, premiumUsersData, expiredUsersData);

    const slice = selectedData?.packageName === "com.peccular.mechanic" ? 6 : 3;

    return (
        <Box className="appdata-container">
            {/* ── Header Section ── */}
            <Box className="appdata-header">
                <Box className="appdata-header-left">
                    <Box className="app-icon-wrapper">
                        {selectedData?.icon && (
                            <CardMedia
                                component="img"
                                image={selectedData?.icon}
                                alt={selectedData?.name}
                                className="app-icon"
                            />
                        )}
                    </Box>
                    <Box>
                        <Typography className="app-name">
                            {selectedData?.name}
                        </Typography>
                        <Typography className="app-subtitle">
                            {selectedData?.packageName}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* ── Stats Bar ── */}
            <Box className="stats-bar">
                {statsData.slice(0, slice).map((stat, index) => (
                    <Box 
                        key={index} 
                        className={`appdata-stat-item ${selectedStat === stat.id ? 'appdata-stat-item-active' : ''}`}
                        onClick={() => {
                            setSelectedStat(stat.id);
                            setPage(1);
                        }}
                    >
                        <Box className={`data-stat-icon ${stat.className}`}>
                            <stat.icon size={20} />
                        </Box>
                        <Box className="stat-content">
                            <Typography className="stat-label">{stat.label}</Typography>
                            <Typography className="stat-number">{stat.value}</Typography>
                            <Typography className="stat-label">{stat.text}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* ── Content Area ── */}
            <Box className={`appdata-content ${isLoading || !filteredData?.length ? "appdata-state-center" : ""}`}>
                {isLoading ? (
                    <Box className="loading-container">
                        <CircularProgress size={60} color="#fff" style={{ color: '#fff' }} />
                        <Typography className="loading-text">Loading data...</Typography>
                    </Box>
                ) : !filteredData || filteredData.length === 0 ? (
                    <Box className="error-container">
                        <MdOutlineErrorOutline size={60} color="red" />
                        <Typography className="error-text">No data available</Typography>
                    </Box>
                ) : filteredData?.length > 0 ? (
                    <>
                        <Box className="table-wrapper">
                            <AppDataTable
                                packageName={packageName}
                                selectedData={selectedData}
                                adminId={adminId}
                                Paper={Paper}
                                currentData={currentData}
                                userData={userData}
                                servicesData={servicesData}
                                stepsData={stepsData}
                            />
                        </Box>

                        {totalPages > 1 && (
                            <Box className="pagination-container">
                                <Typography className="pagination-info">
                                    Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} users
                                </Typography>
                                <Box className="pagination-wrapper">
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={(_, p) => setPage(p)}
                                        color="primary"
                                        shape="rounded"
                                        size="small"
                                    />
                                </Box>
                            </Box>
                        )}
                    </>

                ) : (
                    <Box className="empty-container">
                        <Typography className="empty-icon">📭</Typography>
                        <Typography className="empty-text">No results found</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}