import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Box
} from "@mui/material";
import { formatCurrency } from "../utils/constant";

const defaultTableSx = {
    tableContainerSx: {
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "1px solid rgba(148, 163, 184, 0.1)",
        borderRadius: "12px",
        overflow: "auto",
        "& .MuiTable-root": {
            borderCollapse: "collapse"
        }
    },
    headRowSx: {
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.1)"
    },
    headCellSx: {
        color: "rgba(148, 163, 184, 0.9)",
        fontWeight: 600,
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        padding: "16px 12px",
        backgroundColor: "transparent",
        borderBottom: "none"
    },
    bodyRowSx: {
        borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
        transition: "background-color 0.2s ease",
        "&:hover": {
            backgroundColor: "rgba(59, 130, 246, 0.05)"
        },
        "&:last-child": {
            borderBottom: "none"
        }
    },
    bodyCellSx: {
        color: "rgba(226, 232, 240, 0.9)",
        fontSize: "14px",
        padding: "14px 12px",
        borderBottom: "none",
        fontFamily: "'DM Sans', sans-serif"
    },
    idCellSx: {
        color: "rgba(148, 163, 184, 0.7)",
        fontWeight: 600,
        width: "50px",
        padding: "14px 12px",
        borderBottom: 'none'
    }
};

const chipSx = {
    name: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: '#93c5fd',
        fontSize: '12px',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        fontWeight: 500
    },
    price: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        color: '#86efac',
        fontSize: '12px',
        border: '1px solid rgba(34, 197, 94, 0.2)',
        fontWeight: 600
    },
    type: {
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        color: '#c084fc',
        fontSize: '12px',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        fontWeight: 600
    },
    active: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        color: '#86efac',
        fontSize: '12px',
        border: '1px solid rgba(34, 197, 94, 0.2)',
        fontWeight: 600
    },
    inactive: {
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        color: '#fca5a5',
        fontSize: '12px',
        border: '1px solid rgba(248, 113, 113, 0.2)',
        fontWeight: 600
    },
    email: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: '#93c5fd',
        fontSize: '12px',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        fontWeight: 500
    },
};

export default function ServiceDataTable({ currency, serviceId, Paper, currentData, selectedData }) {
    if (!currentData || currentData.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', padding: '20px', color: 'rgba(148, 163, 184, 0.7)' }}>
                No services data available
            </Box>
        );
    }

    const getServiceStatus = (service) => {
        if (service?.status) {
            return service.status === 'active' ? 'active' : 'inactive';
        }
        if (service?.is_active !== undefined) {
            return service.is_active === 1 ? 'active' : 'inactive';
        }
        return 'active';
    };

    return (
        <TableContainer component={Paper} sx={defaultTableSx.tableContainerSx}>
            <Table>
                {selectedData?.name === "Mechnaic Invoice Manager" ? (
                    <>
                        <TableHead>
                            <TableRow sx={defaultTableSx.headRowSx}>
                                <TableCell sx={defaultTableSx.headCellSx}>#</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Service Name</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Service Category</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Price for 2W</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Price for 4W</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.map((service) => {
                                const serviceName = service?.service_name || service?.name || "-";
                                const serviceType = service?.service_type || service?.type || service?.category || "-";
                                const price2w = service?.price_2w > 0 ? formatCurrency(service?.price_2w || 0, currency || 'USD') : "-";
                                const price4w = service?.price_4w > 0 ? formatCurrency(service?.price_4w || 0, currency || 'USD') : "-";
                                const status = getServiceStatus(service);
                                const isActive = status === 'active';
                                const statusText = isActive ? "Active" : "Inactive";

                                return (
                                    <TableRow
                                        key={service.id}
                                        sx={defaultTableSx.bodyRowSx}
                                    >
                                        <TableCell sx={defaultTableSx.idCellSx}>{serviceId++}</TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={serviceName}
                                                size="small"
                                                sx={chipSx.name}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={serviceType}
                                                size="small"
                                                sx={chipSx.type}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={price2w}
                                                size="small"
                                                sx={chipSx.price}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={price4w}
                                                size="small"
                                                sx={chipSx.price}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={statusText}
                                                size="small"
                                                sx={isActive ? chipSx.active : chipSx.inactive}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </>
                ) : (
                    <>
                        <TableHead>
                            <TableRow sx={defaultTableSx.headRowSx}>
                                <TableCell sx={defaultTableSx.headCellSx}>#</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Person Name</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Transaction Type</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Principal Amount</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Interest Type</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Interest Rate</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Rate Period</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Interest Amount</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Total Amount</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Paid Amount</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Pending Amount</TableCell>
                                <TableCell sx={defaultTableSx.headCellSx}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.map((service) => {
                                const serviceName = service?.service_name || service?.name || "-";
                                const isActive = service?.status === 'COMPLETED';
                                const numericRate = Number(service?.rate);
                                const interestRate = Number.isFinite(numericRate)
                                    ? numericRate.toFixed(2)
                                    : "-";

                                return (
                                    <TableRow key={service.id} sx={defaultTableSx.bodyRowSx}>
                                        <TableCell sx={defaultTableSx.idCellSx}>{serviceId++}</TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>{serviceName}</TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={service?.direction || "-"}
                                                size="small"
                                                sx={chipSx.type}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={service?.principal || "-"}
                                                size="small"
                                                sx={chipSx.email}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={service?.interest_type || "-"}
                                                size="small"
                                                sx={chipSx.email}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={interestRate}
                                                size="small"
                                                sx={chipSx.email}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={service?.rate_period || "-"}
                                                size="small"
                                                sx={chipSx.email}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={service?.total_interest || "-"}
                                                size="small"
                                                sx={chipSx.email}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={service?.total_amount || "-"}
                                                size="small"
                                                sx={chipSx.email}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={service?.paid_amount || "-"}
                                                size="small"
                                                sx={chipSx.email}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={service?.remaining_amount || "-"}
                                                size="small"
                                                sx={chipSx.email}
                                            />
                                        </TableCell>
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={service?.status || "-"}
                                                size="small"
                                                sx={isActive ? chipSx.active : chipSx.inactive}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </>
                )}
            </Table>
        </TableContainer>
    );
}