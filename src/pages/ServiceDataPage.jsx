import {
    Box,
    CircularProgress,
    Typography,
    Paper,
    Pagination,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";
import ServiceDataTable from "../components/ServiceDataTable";
import "../styles/servicedata.css";
import { statsData } from "../utils/constant";

export default function ServiceDataPage() {
    const location = useLocation();
    const { filteredServices, currency, selectedData, packageName } = location.state || {};

    const [page, setPage] = useState(1);
    const [selectedStat, setSelectedStat] = useState('totalServices');
    const itemsPerPage = 100;

    const isLoading = false;

    const getServiceStatus = (service) => {
        if (service?.status) {
            return service.status === 'active' ? 'active' : 'inactive';
        }
        if (service?.is_active !== undefined) {
            return service.is_active === 1 ? 'active' : 'inactive';
        }
        return 'active';
    };

    const totalServices = filteredServices?.length || 0;
    const activeServices = filteredServices?.filter(s => getServiceStatus(s) === 'active').length || 0;
    const inactiveServices = filteredServices?.filter(s => getServiceStatus(s) === 'inactive').length || 0;

    const statisticsData = statsData(totalServices, activeServices, inactiveServices);

    const getFilteredData = () => {
        if (!filteredServices || filteredServices.length === 0) {
            return [];
        }

        switch (selectedStat) {
            case 'totalServices':
                return filteredServices;
            case 'activeServices':
                return filteredServices.filter(s => getServiceStatus(s) === 'active');
            case 'inactiveServices':
                return filteredServices.filter(s => getServiceStatus(s) === 'inactive');
            default:
                return filteredServices;
        }
    };

    const filteredData = getFilteredData();
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    let serviceId = startIndex + 1;

    return (
        <Box className="servicedata-container">
            {/* ── Header Section ── */}
            <Box className="servicedata-header">
                <Box className="servicedata-header-left">
                    <Box className="service-icon-wrapper">
                        {selectedData?.icon && (
                            <Box
                                component="img"
                                src={selectedData?.icon}
                                alt={selectedData?.name}
                                className="service-icon"
                            />
                        )}
                    </Box>
                    <Box>
                        <Typography className="service-name">
                            Services - {selectedData?.name}
                        </Typography>
                        <Typography className="service-subtitle">
                            {packageName}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* ── Stats Bar ── */}
            <Box className="stats-bar">
                {statisticsData.map((stat, index) => (
                    <Box
                        key={index}
                        className={`servicedata-stat-item ${selectedStat === stat.id ? 'servicedata-stat-item-active' : ''}`}
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
            <Box className={`servicedata-content ${isLoading || !filteredData?.length ? "servicedata-state-center" : ""}`}>
                {isLoading ? (
                    <Box className="loading-container">
                        <CircularProgress size={60} color="#fff" style={{ color: '#fff' }} />
                        <Typography className="loading-text">Loading services...</Typography>
                    </Box>
                ) : !filteredData || filteredData.length === 0 ? (
                    <Box className="error-container">
                        <MdOutlineErrorOutline size={60} color="red" />
                        <Typography className="error-text">No services available</Typography>
                    </Box>
                ) : filteredData?.length > 0 ? (
                    <>
                        <Box className="table-wrapper">
                            <ServiceDataTable
                                currency={currency}
                                packageName={packageName}
                                selectedData={selectedData}
                                serviceId={serviceId}
                                Paper={Paper}
                                currentData={currentData}
                            />
                        </Box>

                        {totalPages > 1 && (
                            <Box className="pagination-container">
                                <Typography className="pagination-info">
                                    Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} services
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