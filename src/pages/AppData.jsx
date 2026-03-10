import { Box, Card, CardContent, CircularProgress, Typography, Paper, Pagination } from "@mui/material";
import "../styles/appdata.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import AppList from "../utils/AppList";
import { MdOutlineErrorOutline } from "react-icons/md";
import AppDataTable from "../components/AppDataTable";

export default function AppData() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 100;
    const location = useLocation();
    const appName = location.state?.appName;
    const id = location.pathname.split('/')[2];
    const appList = AppList();
    const app = appList.find(a => a.id == id);
    const { data, loading, error, userData, servicesData } = app?.appData?.[0] || {};

    const sortedData = data?.sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date)) || [];
    const totalPages = Math.ceil((sortedData.length) / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    let adminId = startIndex + 1;

    return (
        <Box className="appdata-container">

            {/* ── Header ── */}
            <Box className="app-header-wrapper">
                <Box sx={{ minWidth: 0, flex: "1 1 auto" }}>
                    <Typography variant="h4" className="app-title">
                        {appName}
                    </Typography>
                    <Box className="header-underline" />
                </Box>

                <Card className="stat-card" elevation={0}>
                    <CardContent className="stat-card-content">
                        <Typography className="stat-label">Total Admins</Typography>
                        <Typography className="stat-value">
                            {loading
                                ? <CircularProgress size={20} color="secondary" />
                                : error
                                    ? <MdOutlineErrorOutline color="red" />
                                    : data?.length || 0
                            }
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* ── Content ── */}
            <Box className={`appdata-content${loading || error || !data ? " appdata-state-center" : ""}`}>
                {loading ? (
                    <CircularProgress size={60} color="secondary" />

                ) : error ? (
                    <Box className="appdata-error">
                        <MdOutlineErrorOutline size={60} color="red" />
                        <Typography className="error-text">Failed to load data</Typography>
                    </Box>

                ) : data ? (
                    <>
                        <AppDataTable
                            app={app}
                            adminId={adminId}
                            Paper={Paper}
                            currentData={currentData}
                            userData={userData}
                            servicesData={servicesData}
                        />

                        {totalPages > 1 && (
                            <Box className="pagination-wrapper">
                                <Typography className="pagination-range-text">
                                    Showing {startIndex + 1}–{Math.min(endIndex, sortedData.length)} of {sortedData.length}
                                </Typography>
                                <Box className="pagination-box">
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={(e, p) => setPage(p)}
                                        color="primary"
                                        shape="rounded"
                                        size="small"
                                        sx={{
                                            "& .MuiPaginationItem-root": {
                                                color: "#64748b",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontSize: { xs: "0.72rem", sm: "0.8rem" },
                                                fontWeight: 500,
                                                minWidth: { xs: "28px", sm: "32px" },
                                                height: { xs: "28px", sm: "32px" },
                                                transition: "all 0.2s ease",
                                            },
                                            "& .MuiPaginationItem-root.Mui-selected": {
                                                background: "linear-gradient(135deg, #3b82f6, #06b6d4) !important",
                                                color: "#fff !important",
                                                boxShadow: "0 0 12px rgba(59, 130, 246, 0.4)",
                                            },
                                            "& .MuiPaginationItem-root:hover:not(.Mui-selected)": {
                                                backgroundColor: "rgba(59, 130, 246, 0.08)",
                                                color: "#93c5fd",
                                            },
                                            "& .MuiPaginationItem-root.Mui-disabled": {
                                                color: "rgba(100, 116, 139, 0.3)",
                                            },
                                            "& .MuiPaginationItem-ellipsis": {
                                                color: "#334155",
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </>

                ) : (
                    <Typography className="empty-text">No data available</Typography>
                )}
            </Box>
        </Box>
    );
}