import { Box, Card, CardContent, Typography, Button, CircularProgress, Icon } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdGridView } from "react-icons/md";
import { IoDownloadOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { BiPackage } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa";
import "../styles/home.css";
import AppList from "../utils/AppList";
import { MyContext } from "../context/context";
import { publishers, summaryStats } from "../utils/dashboardUtils";

export default function Home() {
    const {
        debtorsData, debtorsActiveData, mechanicData, mechanicActiveData, smartMoneyData, smartActiveData, visitorsData, visitorsActiveData, danceData, buddyWalkData, buddyActiveData, rgMechanicData, rgMechanicActiveData, loader
    } = useContext(MyContext);
    const [hoveredPublisher, setHoveredPublisher] = useState(null);
    const navigate = useNavigate();
    const allApps = AppList(debtorsData, mechanicData, smartMoneyData, visitorsData, danceData, buddyWalkData, rgMechanicData);
    const peccularData = allApps.filter(app => app.appId.startsWith('com.peccular'));
    const radicalData = allApps.filter(app => app.appId.startsWith('com.radicalapp'));
    const peccularTotalInstalls = (
        debtorsData?.length + mechanicData?.length + smartMoneyData?.length + visitorsData?.length + danceData?.length
    );
    const peccularActiveUsers = (
        debtorsActiveData?.length + mechanicActiveData?.length + smartActiveData?.length + visitorsActiveData?.length
    );
    const radicalTotalInstalls = buddyWalkData?.length + rgMechanicData?.length;
    const radicalActiveUsers = buddyActiveData?.length + rgMechanicActiveData?.length;

    const highestPeccularLength = Math.max(
        ...([
            debtorsData,
            mechanicData,
            smartMoneyData,
            visitorsData,
            danceData
        ].map(item => item?.length || 0))
    );

    const highestRadicalLength = Math.max(
        ...([buddyWalkData, rgMechanicData].map(item => item?.length || 0))
    );

    const overAllHighestLength = Math.max(
        ...([
            debtorsData,
            mechanicData,
            smartMoneyData,
            visitorsData,
            danceData,
            buddyWalkData,
            rgMechanicData
        ].map(item => item?.length || 0))
    );

    const filteredPeccularData = peccularData?.filter(item => item?.totalLength === highestPeccularLength);
    const filteredRadicalData = radicalData?.filter(item => item?.totalLength === highestRadicalLength);
    const topApp = allApps?.filter(item => item?.totalLength === overAllHighestLength);

    const publishersData = publishers(
        peccularData, peccularTotalInstalls, peccularActiveUsers, radicalData, radicalTotalInstalls, radicalActiveUsers, filteredPeccularData, filteredRadicalData
    );
    const summaryStatsData = summaryStats(
        peccularData, radicalData, peccularTotalInstalls, radicalTotalInstalls, peccularActiveUsers, radicalActiveUsers, topApp
    );

    return (
        <Box className="dashboard-root">
            {/* Header Section */}
            <Box className="dashboard-header">
                <Box>
                    <Typography variant="h3" className="dashboard-title">
                        Dashboard Overview
                    </Typography>
                    <Typography variant="body2" className="dashboard-subtitle">
                        Track your app performance and users across all publishers.
                    </Typography>
                </Box>
            </Box>

            {loader ? (
                <Box className="dashboard-loader">
                    <CircularProgress size={60} color="#fff" style={{ color: '#fff'}} />
                </Box>
            ) : (
                <>
                    <Box className="publishers-grid">
                        {publishersData.map((publisher, index) => (
                            <Card
                                key={publisher.id}
                                className={`publisher-card publisher-card-${publisher.color} ${hoveredPublisher === index ? 'hovered' : ''}`}
                                elevation={0}
                                onMouseEnter={() => setHoveredPublisher(index)}
                                onMouseLeave={() => setHoveredPublisher(null)}
                                onClick={() => navigate(`/apps?publisher=${publisher.name.toLowerCase()}`)}
                            >
                                <CardContent className="publisher-card-content">
                                    {/* Publisher Header */}
                                    <Box className="publisher-header">
                                        <Box className="publisher-info">
                                            <Box
                                                className={`publisher-icon-large publisher-icon-${publisher.color}`}
                                                sx={{ background: publisher.bgGradient }}
                                            >
                                                {publisher.icon}
                                            </Box>
                                            <Box>
                                                <Typography className="publisher-name">
                                                    {publisher.name}
                                                </Typography>
                                                <Typography className="publisher-link">
                                                    {publisher.viewAnalytics}
                                                    <span className="arrow">›</span>
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Button className={`publisher-badge publisher-badge-${publisher.color}`}>
                                            {publisher.badge}
                                        </Button>
                                    </Box>

                                    {/* Divider */}
                                    <Box className="card-divider" />

                                    {/* Stats Section */}
                                    <Box className="publisher-stats">
                                        <Box className="stat-item-large">
                                            <Typography className="stat-label-large">{publisher.stats.totalApps.label}</Typography>
                                            <Box className="dash-stat-content">
                                                <Typography className="stat-value-large">
                                                    {publisher.stats.totalApps.value}
                                                </Typography>
                                                <Box className={`stat-icon-large stat-icon-${publisher.color}`}>
                                                    <MdGridView />
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box className="stat-item-large">
                                            <Typography className="stat-label-large">{publisher.stats.totalInstalls.label}</Typography>
                                            <Box className="dash-stat-content">
                                                <Typography className="stat-value-large">
                                                    {publisher.stats.totalInstalls.value}
                                                </Typography>
                                                <Box className={`stat-icon-large stat-icon-${publisher.color}`}>
                                                    <IoDownloadOutline />
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box className="stat-item-large">
                                            <Typography className="stat-label-large">{publisher.stats.activeUsers.label}</Typography>
                                            <Box className="dash-stat-content">
                                                <Typography className="stat-value-large">
                                                    {publisher.stats.activeUsers.value}
                                                </Typography>
                                                <Box className={`stat-icon-large stat-icon-${publisher.color}`}>
                                                    <FiUsers />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Divider */}
                                    <Box className="card-divider" />

                                    {/* Top App Section */}
                                    <Box className={`top-app-large top-app-${publisher.color}`}>
                                        <Box className="top-app-icon-large">
                                            {publisher.topApp.icon}
                                        </Box>
                                        <Box className="top-app-content">
                                            <Typography className="top-app-label-large">Top App:</Typography>
                                            <Typography className={`top-app-name-large top-app-name-${publisher.color}`}>
                                                {publisher.topApp.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Box className="summary-grid">
                        {summaryStatsData.map((stat) => {
                            const IconComponent = stat.icon;
                            return (
                                <Card
                                    key={stat.id}
                                    className={`summary-card ${stat?.id === 1 && "cursor-pointer"}`}
                                    elevation={0}
                                    onClick={() => {
                                        if (stat.id === 1) {
                                            navigate(`/apps?publisher=all`);
                                        }
                                    }}
                                >
                                    <CardContent className="summary-card-content">
                                        <Box className="summary-icon-box" style={{ backgroundColor: stat.bgColor }}>
                                            <IconComponent style={{ color: stat.iconColor, fontSize: "20px" }} />
                                        </Box>
                                        <Box className="summary-info">
                                            <Typography className="summary-label">{stat.title}</Typography>
                                            <Typography className="summary-value">{stat.value}</Typography>
                                            <Typography className="summary-description">{stat.description}</Typography>
                                        </Box>
                                        {stat?.id === 1 && <FaChevronRight color="#fff" />}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Box>
                </>
            )}
        </Box>
    );
}