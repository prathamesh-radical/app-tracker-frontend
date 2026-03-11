import { Box, Card, CardContent, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import AppList from "../utils/AppList";
import { useState } from "react";
import {
    adminCellSx, adminRowSx, bodyCellSx, bodyRowSx, dateStyle, formatDate, headCellSx, headRowSx, idCellSx, tableContainerSx
} from "../utils/constant";

export default function GuestEntryAppDetails() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 100;
    const location = useLocation();
    const id = location.pathname.split('/')[3];
    const app = AppList.find(a => a.id == id);
    const adminName = location.state?.userName || '-';
    const visitorData = location.state?.visitorData || [];
    const sortedData = visitorData?.slice().sort((a, b) => new Date(b.datetime) - new Date(a.datetime)) || [];
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
                        {app?.appName || "App Details"}
                    </Typography>
                    <Box className="header-underline" />
                </Box>

                <Card className="stat-card" elevation={0}>
                    <CardContent className="stat-card-content">
                        <Typography className="stat-label">Total Visitors</Typography>
                        <Typography className="stat-value">{visitorData?.length || 0}</Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* ── Table ── */}
            <Box className="appdata-content">
                <TableContainer component={Paper} sx={tableContainerSx}>
                    <Table sx={{ minWidth: 1100 }}>
                        <TableHead>
                            <TableRow sx={adminRowSx}>
                                <TableCell sx={adminCellSx} colSpan={12}>
                                    Admin Name :- {adminName}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow sx={headRowSx}>
                                <TableCell sx={headCellSx}>#</TableCell>
                                <TableCell sx={headCellSx}>First Name</TableCell>
                                <TableCell sx={headCellSx}>Last Name</TableCell>
                                <TableCell sx={headCellSx}>Contact No.</TableCell>
                                <TableCell sx={headCellSx}>Address</TableCell>
                                <TableCell sx={headCellSx}>Status</TableCell>
                                <TableCell sx={headCellSx}>Vehicle Type</TableCell>
                                <TableCell sx={headCellSx}>Apartment</TableCell>
                                <TableCell sx={headCellSx}>Floor No.</TableCell>
                                <TableCell sx={headCellSx}>Flat No.</TableCell>
                                <TableCell sx={headCellSx}>Person to Meet</TableCell>
                                <TableCell sx={headCellSx}>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.map((item, index) => (
                                <TableRow key={index} sx={bodyRowSx}>
                                    <TableCell sx={idCellSx}>{adminId++}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.first_name || '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.last_name || '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.phone_no || '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.address || '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.is_active === 1 ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.vehicle_type || '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.apartment_name || '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.floor_no || '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.flat_no || '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.person_to_meet || '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <span style={dateStyle}>{formatDate(item.datetime)}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

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
            </Box>
        </Box>
    );
}