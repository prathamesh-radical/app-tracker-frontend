import { Box, Card, CardContent, Typography, Button, TextField, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiGrid, FiList } from "react-icons/fi";
import { FiDownload, FiUsers, FiStar } from "react-icons/fi";
import "../styles/apps.css";
import { MyContext } from "../context/context";
import { allApps } from "../utils/constant";
import { FaChevronRight } from "react-icons/fa";

export default function Apps() {
    const {
        debtorsData, debtorsActiveData, debtorsLoading, debtorsActiveLoading, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, smartMoneyData, smartMoneyUsersData, smartActiveData, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading, visitorsData, visitorsUserData, visitorsActiveData, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceData, danceLoading, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicData, rgMechanicActiveData, rgMechanicLoading, rgMechanicActiveLoading, loader
    } = useContext(MyContext);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const publisherParam = searchParams.get('publisher');

    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState(() => publisherParam || "all");
    const [viewMode, setViewMode] = useState("grid");

    const appList = allApps(
        debtorsData, debtorsActiveData, debtorsLoading, debtorsActiveLoading, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, smartMoneyData, smartMoneyUsersData, smartActiveData, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading, visitorsData, visitorsUserData, visitorsActiveData, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceData, danceLoading, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicData, rgMechanicActiveData, rgMechanicLoading, rgMechanicActiveLoading
    );

    const getFilteredApps = () => {
        let filtered = appList;

        if (activeFilter !== "all") {
            filtered = filtered.filter(app =>
                app.publisher.toLowerCase() === activeFilter.toLowerCase()
            );
        }

        if (searchQuery.trim()) {
            filtered = filtered.filter(app =>
                app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.packageName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    const filteredApps = getFilteredApps();

    const publishers = ["all", ...new Set(appList.map(app => app.publisher.toLowerCase()))];
    const getPublisherLabel = (pub) => {
        if (pub === "all") return "All Apps";
        return appList.find(app => app.publisher.toLowerCase() === pub)?.publisher || pub;
    };
    const getPublisherCount = (pub) => {
        return appList.filter(app =>
            pub === "all" ? true : app.publisher.toLowerCase() === pub
        ).length;
    };

    return (
        <Box className="apps-root">
            {/* Header Section */}
            <Box className="apps-header">
                <Box className="apps-header-left">
                    <Box className="apps-header-icon">
                        <FiGrid size={24} />
                    </Box>
                    <Box>
                        <Typography className="apps-title">
                            Select an App
                        </Typography>
                        <Typography className="apps-subtitle">
                            Choose an app to view detailed analytics and performance insights.
                        </Typography>
                    </Box>
                </Box>

                <Box className="apps-header-right">
                    <Box className="apps-total-count">
                        <Typography className="apps-total-label">Total Apps</Typography>
                        <Typography className="apps-total-value">{appList.length}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Search & Controls Section */}
            <Box className="apps-controls">
                <Box className="apps-search-wrapper">
                    <FiSearch className="search-icon" />
                    <TextField
                        fullWidth
                        placeholder="Search by app name or package name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="apps-search-field"
                        variant="outlined"
                    />
                    <Typography className="search-shortcut">⌘ K</Typography>
                </Box>

                <Box className="apps-view-toggle">
                    <Button
                        className={`view-btn grid-btn ${viewMode === "grid" ? "active" : ""}`}
                        onClick={() => setViewMode("grid")}
                    >
                        <FiGrid size={18} />
                    </Button>
                    <Button
                        className={`view-btn list-btn ${viewMode === "list" ? "active" : ""}`}
                        onClick={() => setViewMode("list")}
                    >
                        <FiList size={18} />
                    </Button>
                </Box>
            </Box>

            {/* Filter Tabs */}
            <Box className="apps-filters">
                {publishers.map((publisher) => (
                    <Button
                        key={publisher}
                        className={`filter-tab ${activeFilter === publisher ? "active" : ""}`}
                        onClick={() => setActiveFilter(publisher)}
                    >
                        <Typography className="filter-tab-text">
                            {getPublisherLabel(publisher)}
                        </Typography>
                        <Typography className="filter-tab-count">
                            {getPublisherCount(publisher)}
                        </Typography>
                    </Button>
                ))}
            </Box>

            {loader ? (
                <Box className="appList-loader">
                    <CircularProgress size={60} color="#fff" style={{ color: '#fff' }} />
                </Box>
            ) : (
                <Box className={`apps-container apps-view-${viewMode}`}>
                    {filteredApps.length > 0 ? (
                        filteredApps.map((app) => (
                            <Card
                                key={app.id}
                                className={`app-card app-card-${app.publisherColor}`}
                                elevation={0}
                                onClick={() => navigate(`/appdata/${app?.packageName}`)}
                            >
                                <CardContent className="app-card-content">
                                    {/* App Icon & Info */}
                                    <Box className="app-header-section">
                                        <Box className={`app-icon app-icon-${app.publisherColor}`}>
                                            <img src={app.icon} alt={app.name} className="app-icon-img" />
                                        </Box>
                                        <Box className="app-info">
                                            <Typography className="app-name">{app.name}</Typography>
                                            <Typography className="app-package">{app.packageName}</Typography>
                                        </Box>
                                        <Button className={`app-publisher-badge publisher-badge-${app.publisherColor}`}>
                                            {app.publisher}
                                        </Button>
                                    </Box>

                                    {/* Stats Section */}
                                    <Box className="app-stats">
                                        <Box className="data-stat">
                                            <Box className="apps-stat-icon">
                                                <FiDownload size={14} color="#fff" />
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <Typography className="stat-label">All Users</Typography>
                                                <Typography className="data-stat-value">{app.stats.allUsers}</Typography>
                                            </Box>
                                        </Box>

                                        <Box className="data-stat">
                                            <Box className="apps-stat-icon">
                                                <FiUsers size={14} color="#fff" />
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <Typography className="stat-label">Active Users</Typography>
                                                <Typography className="data-stat-value">{app.stats.activeUsers}</Typography>
                                            </Box>
                                        </Box>

                                        <Box className="data-stat">
                                            <Box className="apps-stat-icon">
                                                <FiStar size={14} color="#fff" />
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <Typography className="stat-label">Premium Users</Typography>
                                                <Typography className="data-stat-value">{app.stats.premium}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Box className="no-results">
                            <Typography className="no-results-text">No apps found</Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}