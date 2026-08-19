import { Modal, Paper as MuiPaper, Box, Button, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { defaultTableSx, formatDateTime } from "../utils/constant";

const modalSx = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'rgba(15, 23, 42, 0.95)',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    p: 4,
    color: 'rgba(226, 232, 240, 0.9)',
    maxHeight: '80vh',
    overflow: 'auto'
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Active':
            return '#10b981';
        case 'Expired':
            return '#ef4444';
        case 'Cancel':
            return '#f59e0b';
        case 'Free':
            return '#6b7280';
        case 'Trial':
            return '#8b5cf6';
        default:
            return '#8b5cf6';
    }
};

export default function DetailModal({ open, selectedItem, onClose, premiumData }) {
    const filteredPremiumData = premiumData?.filter(p => p?.admin_id === selectedItem?.id && p?.event_type != "unknown") || [];

    const uniqueData = Array.from(
        filteredPremiumData.reduce((map, item) => {
            const key = `${item.subscription_status}_${item.subscription_type}_${item.subscription_start_date}_${item.subscription_expiry_date}`;
            if (!map.has(key) || new Date(item.created_at) > new Date(map.get(key).created_at)) {
                map.set(key, item);
            }
            return map;
        }, new Map()).values()
    ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            sx={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <MuiPaper sx={modalSx}>
                <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                    Subscription History - {selectedItem?.shop_name}
                </Typography>

                {uniqueData.length > 0 ? (
                    <TableContainer sx={defaultTableSx.tableContainerSx}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={defaultTableSx.headRowSx}>
                                    <TableCell sx={defaultTableSx.headCellSx}>#</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Order No.</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Subscription Type</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Trial Start At</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Start Date</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Expiry Date</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Renewal Date</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Price</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Event Type</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {uniqueData.map((item, index) => {
                                    let status;

                                    if (item?.subscription_status === "premium_active") {
                                        status = "Active";
                                    } else if (item?.subscription_status === "premium_expired" && item?.order_id != null) {
                                        status = "Expired";
                                    } else if (item?.subscription_status === "premium_expired" && item?.order_id === null) {
                                        status = "Cancel";
                                    } else if (item?.subscription_status === "trial_active") {
                                        status = "Trial";
                                    } else if (item?.subscription_status === "none") {
                                        status = "Free";
                                    }

                                    return (
                                        <TableRow key={`${item.id}_${index}`} sx={{
                                            '&:hover': {
                                                backgroundColor: 'rgba(148, 163, 184, 0.05)'
                                            }
                                        }}>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>{index + 1}</TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>{item?.order_id}</TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>
                                                {item.subscription_type ? item.subscription_type.charAt(0).toUpperCase() + item.subscription_type.slice(1) : '-'}
                                            </TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>{formatDateTime(item.trial_started_at)}</TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>{formatDateTime(item.subscription_start_date)}</TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>{formatDateTime(item.subscription_expiry_date)}</TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>{formatDateTime(item.subscription_renewal_date)}</TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>{item.formatted_price || '-'}</TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>
                                                <Typography variant="caption" sx={{
                                                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px'
                                                }}>
                                                    {item.event_type}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{
                                                ...defaultTableSx.bodyCellSx,
                                                color: getStatusColor(status),
                                                fontWeight: 600
                                            }}>
                                                {status}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography align="center" sx={{ py: 4, color: 'rgba(148, 163, 184, 0.7)' }}>
                        No subscription history found
                    </Typography>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 3 }}>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{
                            backgroundColor: 'rgba(99, 102, 241, 0.8)',
                            '&:hover': {
                                backgroundColor: 'rgba(99, 102, 241, 1)'
                            }
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </MuiPaper>
        </Modal>
    );
}