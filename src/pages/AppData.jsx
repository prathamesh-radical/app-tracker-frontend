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
    InputAdornment,
    Chip,
    Stack
} from "@mui/material";
import { useState, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineErrorOutline, MdSearch, MdFilterList, MdDownload } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import AppDataTable from "../components/AppDataTable";
import { HiUsers } from "react-icons/hi2";
import { FaUserSecret } from "react-icons/fa6";
import { GiQueenCrown } from "react-icons/gi";
import { TbCrownOff } from "react-icons/tb";
import "../styles/appdata.css";
import { allApps, stats } from "../utils/constant";
import { MyContext } from "../context/context";
import { FilterModal, SortModal } from "../components/FilterSortModals";

export default function AppData() {
    const {
        debtorsData, debtorsActiveData, debtorsLoading, debtorsActiveLoading, mechanicData, mechanicUsersData, mechanicServiceData, mechanicActiveData, mechanicLoading, mechanicUsersLoading, mechanicServiceLoading, mechanicActiveLoading, smartMoneyData, smartMoneyUsersData, smartActiveData, smartMoneyLoading, smartMoneyUsersLoading, smartActiveLoading, visitorsData, visitorsUserData, visitorsActiveData, visitorsLoading, visitorsUserLoading, visitorsActiveLoading, danceData, danceLoading, buddyWalkData, buddyGroupData, buddyGroupMemberData, buddyStepsData, buddyActiveData, buddyWalkLoading, buddyGroupLoading, buddyGroupMemberLoading, buddyStepsLoading, buddyActiveLoading, rgMechanicData, rgMechanicActiveData, rgMechanicServiceData, rgMechanicInvoiceData, rgMechanicLoading, rgMechanicActiveLoading, rgMechanicServiceLoading, rgMechanicInvoiceLoading
    } = useContext(MyContext);

    const [page, setPage] = useState(1);
    const [selectedStat, setSelectedStat] = useState('totalUsers');
    const [sortModalOpen, setSortModalOpen] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState('newest');
    const [currentFilters, setCurrentFilters] = useState({
        country: [],
        currency: [],
        servicesCount: { min: '', max: '' },
        invoicesCount: { min: '', max: '' },
        createdDate: { from: '', to: '' },
    });
    const [hasActiveFilters, setHasActiveFilters] = useState(false);
    const [hasActiveSort, setHasActiveSort] = useState(false);

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
            const userDate = user.createdAt || user.created_at || user?.date;
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
    
    // ── ENRICH DATA WITH COUNTS ──
    const enrichDataWithCounts = (dataToEnrich) => {
        return dataToEnrich.map(item => {
            let servicesCount = 0;
            let invoicesCount = 0;

            if (packageName === "com.peccular.mechanic" || packageName === "com.radicalapp.mechanic") {
                servicesCount = servicesData?.filter(s => s.admin_id === item.id)?.length || 0;
                invoicesCount = servicesData?.filter(i => i.admin_id === item.id)?.length || 0;
            }

            return {
                ...item,
                servicesCount,
                invoicesCount
            };
        });
    };

    // ── SORTING LOGIC ──
    const applySorting = (dataToSort) => {
        const enrichedData = enrichDataWithCounts(dataToSort);
        const sorted = [...enrichedData];
        
        switch (currentSort) {
            case 'newest':
                return sorted.sort((a, b) => new Date(b.createdAt || b.created_at || b.date) - new Date(a.createdAt || a.created_at || a.date));
            case 'oldest':
                return sorted.sort((a, b) => new Date(a.createdAt || a.created_at || a.date) - new Date(b.createdAt || b.created_at || b.date));
            case 'nameAZ':
                return sorted.sort((a, b) => (a.shop_name || a.name || '').localeCompare(b.shop_name || b.name || ''));
            case 'nameZA':
                return sorted.sort((a, b) => (b.shop_name || b.name || '').localeCompare(a.shop_name || a.name || ''));
            case 'mostServices':
                return sorted.sort((a, b) => b.servicesCount - a.servicesCount);
            case 'leastServices':
                return sorted.sort((a, b) => a.servicesCount - b.servicesCount);
            case 'mostInvoices':
                return sorted.sort((a, b) => b.invoicesCount - a.invoicesCount);
            case 'leastInvoices':
                return sorted.sort((a, b) => a.invoicesCount - b.invoicesCount);
            default:
                return sorted;
        }
    };

    // ── FILTERING LOGIC ──
    const applyFiltering = (dataToFilter) => {
        return dataToFilter.filter(item => {
            if (currentFilters.country.length > 0 && !currentFilters.country.includes(item.country)) {
                return false;
            }

            if (currentFilters.currency.length > 0 && !currentFilters.currency.includes(item.currency)) {
                return false;
            }

            const servicesCount = item.servicesCount || 0;
            if (currentFilters.servicesCount.min && servicesCount < parseInt(currentFilters.servicesCount.min)) {
                return false;
            }
            if (currentFilters.servicesCount.max && servicesCount > parseInt(currentFilters.servicesCount.max)) {
                return false;
            }

            const invoicesCount = item.invoicesCount || 0;
            if (currentFilters.invoicesCount.min && invoicesCount < parseInt(currentFilters.invoicesCount.min)) {
                return false;
            }
            if (currentFilters.invoicesCount.max && invoicesCount > parseInt(currentFilters.invoicesCount.max)) {
                return false;
            }

            if (currentFilters.createdDate.from || currentFilters.createdDate.to) {
                const itemDate = new Date(item.createdAt || item.created_at);
                if (currentFilters.createdDate.from && itemDate < new Date(currentFilters.createdDate.from)) {
                    return false;
                }
                if (currentFilters.createdDate.to) {
                    const toDate = new Date(currentFilters.createdDate.to);
                    toDate.setHours(23, 59, 59, 999);
                    if (itemDate > toDate) {
                        return false;
                    }
                }
            }

            return true;
        });
    };

    const getFilteredData = () => {
        let result = data;

        switch (selectedStat) {
            case 'totalUsers':
                result = data;
                break;
            case 'activeUsers':
                result = activeCountData;
                break;
            case 'newUsers':
                result = newUsersData;
                break;
            case 'freeTrialUsers':
                result = trialUsersData;
                break;
            case 'premiumUsers':
                result = premiumUsersData;
                break;
            case 'nonPremiumUsers':
                result = expiredUsersData;
                break;
            default:
                result = data;
        }

        // Apply filters
        result = applyFiltering(result);

        // Apply sorting
        result = applySorting(result);

        return result;
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

    // ── GET SORT LABEL ──
    const getSortLabel = () => {
        const sortOptions = {
            'newest': 'Newest First',
            'oldest': 'Oldest First',
            'nameAZ': 'Shop Name A-Z',
            'nameZA': 'Shop Name Z-A',
            'mostServices': 'Most Services',
            'leastServices': 'Least Services',
            'mostInvoices': 'Most Invoices',
            'leastInvoices': 'Least Invoices',
        };
        return sortOptions[currentSort] || 'Newest First';
    };

    // ── HANDLE SORT ──
    const handleApplySort = (sortOption) => {
        setCurrentSort(sortOption);
        setPage(1);
        setHasActiveSort(sortOption !== 'newest');
    };

    // ── HANDLE FILTER ──
    const handleApplyFilter = (filters) => {
        setCurrentFilters(filters);
        setPage(1);
        
        const hasFilters = 
            filters.country.length > 0 ||
            filters.currency.length > 0 ||
            filters.servicesCount.min ||
            filters.servicesCount.max ||
            filters.invoicesCount.min ||
            filters.invoicesCount.max ||
            filters.createdDate.from ||
            filters.createdDate.to;
        
        setHasActiveFilters(hasFilters);
    };

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
                <Box className="appdata-header-left">
                    <Button
                        variant={hasActiveFilters ? "contained" : "outlined"}
                        startIcon={<CiFilter />}
                        onClick={() => setFilterModalOpen(true)}
                    >
                        Filter
                        {hasActiveFilters && (
                            <Chip
                                label="Active"
                                size="small"
                                variant="filled"
                                sx={{ ml: 1, height: '20px' }}
                            />
                        )}
                    </Button>
                    <Button
                        variant={hasActiveSort ? "contained" : "outlined"}
                        startIcon={<IoFilter />}
                        onClick={() => setSortModalOpen(true)}
                    >
                        Sort
                        {hasActiveSort && (
                            <Chip
                                label="Active"
                                size="small"
                                variant="filled"
                                sx={{ ml: 1, height: '20px' }}
                            />
                        )}
                    </Button>
                </Box>
            </Box>

            {/* ── Active Filters & Sorts Display ── */}
            {(hasActiveFilters || hasActiveSort) && (
                <Box sx={{ px: 2, py: 1, backgroundColor: '#f5f5f5', borderRadius: '4px', mb: 2 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Typography variant="caption" sx={{ alignSelf: 'center' }}>
                            Active Filters & Sorts:
                        </Typography>

                        {/* Active Sort */}
                        {hasActiveSort && (
                            <Chip label={`Sort: ${getSortLabel()}`} size="small" />
                        )}

                        {/* Active Filters */}
                        {currentFilters.country.map(c => (
                            <Chip key={`country-${c}`} label={`Country: ${c}`} size="small" />
                        ))}
                        {currentFilters.currency.map(c => (
                            <Chip key={`currency-${c}`} label={`Currency: ${c}`} size="small" />
                        ))}
                        {(currentFilters.servicesCount.min || currentFilters.servicesCount.max) && (
                            <Chip
                                label={`Services: ${currentFilters.servicesCount.min || '0'}-${currentFilters.servicesCount.max || '∞'}`}
                                size="small"
                            />
                        )}
                        {(currentFilters.invoicesCount.min || currentFilters.invoicesCount.max) && (
                            <Chip
                                label={`Invoices: ${currentFilters.invoicesCount.min || '0'}-${currentFilters.invoicesCount.max || '∞'}`}
                                size="small"
                            />
                        )}
                        {(currentFilters.createdDate.from || currentFilters.createdDate.to) && (
                            <Chip
                                label={`Date: ${currentFilters.createdDate.from || 'start'} to ${currentFilters.createdDate.to || 'end'}`}
                                size="small"
                            />
                        )}
                    </Stack>
                </Box>
            )}

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

            {/* ── MODALS ── */}
            <SortModal
                open={sortModalOpen}
                onClose={() => setSortModalOpen(false)}
                onApplySort={handleApplySort}
                currentSort={currentSort}
            />

            <FilterModal
                open={filterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                onApplyFilter={handleApplyFilter}
                data={data}
                currentFilters={currentFilters}
            />
        </Box>
    );
}