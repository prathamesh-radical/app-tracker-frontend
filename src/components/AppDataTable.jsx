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
import {
    formatDate,
    getCombinedInitials,
    getInitials,
} from "../utils/constant";

const defaultTableSx = {
    tableContainerSx: {
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "1px solid rgba(148, 163, 184, 0.1)",
        borderRadius: "12px",
        overflow: "hidden",
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
    email: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: '#93c5fd',
        fontSize: '12px',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        fontWeight: 500
    },
    count: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: '#93c5fd',
        fontSize: '15px',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        fontWeight: 600
    },
    acronym: {
        background: 'rgba(34,197,94,0.1)',
        color: '#86efac',
        border: '1px solid rgba(34,197,94,0.2)',
        fontSize: '12px',
        fontWeight: 600
    },
    members: {
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        color: '#c084fc',
        fontSize: '12px',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        fontWeight: 600
    },
    steps: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        color: '#34d399',
        fontSize: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        fontWeight: 600,
    }
};

export default function AppDataTable({ adminId, Paper, currentData, userData, servicesData, packageName, selectedData, stepsData }) {
    const ShowFullName = [
        "com.peccular.moneycollect",
        "com.radicalapp.buddywalk",
        "com.radicalapp.mechanic"
    ].includes(packageName);

    const ShowPhoneNumber = [
        "com.radicalapp.buddywalk",
    ].includes(packageName);

    const HidePhoneNumber = [
        "com.peccular.debttracker",
        "com.peccular.moneycollect",
        "com.radicalapp.buddywalk",
        "com.radicalapp.mechanic"
    ].includes(packageName);

    const hideUsersCount = [
        "com.peccular.dancestudiomanager",
        "com.radicalapp.buddywalk",
        "com.radicalapp.mechanic"
    ].includes(packageName);

    const hideUsersCurrency = [
        "com.radicalapp.buddywalk",
        "com.radicalapp.mechanic"
    ].includes(packageName);

    let tableCellHeading = 'Users';

    if (packageName === "com.peccular.mechanic") {
        tableCellHeading = 'Invoices';
    } else if (packageName === "com.peccular.debttracker" || packageName === "com.peccular.entrybook") {
        tableCellHeading = 'Entries';
    } else {
        tableCellHeading = 'Users';
    }

    if (packageName === selectedData?.packageName) {
        return (
            <TableContainer component={Paper} sx={defaultTableSx.tableContainerSx}>
                <Table>
                    <TableHead>
                        <TableRow sx={defaultTableSx.headRowSx}>
                            <TableCell sx={defaultTableSx.headCellSx}>#</TableCell>
                            <TableCell sx={defaultTableSx.headCellSx}>Profile</TableCell>
                            {packageName === "com.peccular.mechanic" && (
                                <TableCell sx={defaultTableSx.headCellSx}>Shop Name</TableCell>
                            )}
                            {packageName === "com.peccular.dancestudiomanager" && (
                                <TableCell sx={defaultTableSx.headCellSx}>Studio Name</TableCell>
                            )}
                            {packageName === "com.peccular.moneycollect" && (
                                <TableCell sx={defaultTableSx.headCellSx}>Acronym</TableCell>
                            )}
                            {packageName != "com.peccular.mechanic" && (
                                ShowFullName ? (
                                    <TableCell sx={defaultTableSx.headCellSx}>Full Name</TableCell>
                                ) : (
                                    <>
                                        <TableCell sx={defaultTableSx.headCellSx}>First Name</TableCell>
                                        <TableCell sx={defaultTableSx.headCellSx}>Last Name</TableCell>
                                    </>
                                )
                            )}
                            <TableCell sx={defaultTableSx.headCellSx}>Email</TableCell>
                            {packageName === "com.peccular.mechanic" && (
                                <TableCell sx={defaultTableSx.headCellSx}>Services</TableCell>
                            )}
                            {!HidePhoneNumber && (
                                <TableCell sx={defaultTableSx.headCellSx}>Contact No.</TableCell>
                            )}
                            {!hideUsersCurrency && (
                                <TableCell sx={defaultTableSx.headCellSx}>Currency</TableCell>
                            )}
                            {packageName != "com.radicalapp.mechanic" && (
                                <TableCell sx={defaultTableSx.headCellSx}>Country</TableCell>
                            )}
                            {packageName === "com.radicalapp.buddywalk" && (
                                <>
                                    <TableCell sx={defaultTableSx.headCellSx}>No. of Grp</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>No. of Members</TableCell>
                                    <TableCell sx={defaultTableSx.headCellSx}>Monthly Steps</TableCell>
                                </>
                            )}
                            {!hideUsersCount && (
                                <TableCell sx={defaultTableSx.headCellSx}>{tableCellHeading}</TableCell>
                            )}
                            <TableCell sx={defaultTableSx.headCellSx}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((item) => {
                            const customersData = userData?.filter(m => (m.admin_id || m.bank_id || m.user_id) === item.id);

                            const profileUrl = item.profile_url || item.photo_url || item?.profile_photo_url || "";
                            const firstName = item?.firstName || item?.firstname || item?.first_name || "-";
                            const lastName = item?.lastName || item?.lastname || item?.last_name || "-";
                            const contactNo = item?.contact || item.phone_number || item?.phone_number || item?.phone_no || "-";
                            const totalLength = item.entries || customersData?.length || 0;
                            const createdAt = item?.created_at || item?.date || "-";
                            const countryName = item?.country || item?.country_name || "-";

                            const isUrl = (
                                !profileUrl || profileUrl === '' || profileUrl === null || profileUrl === 'Null' || profileUrl === undefined
                            );

                            const hasNameField = Object.keys(item).some(
                                key => key.toLowerCase() === 'name'
                            );

                            const now = new Date();
                            const currentMonth = now.getMonth();
                            const currentYear = now.getFullYear();
                            const userJoinings = servicesData?.filter(m => m.user_id === item.id) || [];
                            const totalGroupsCount = userJoinings.length;
                            const userGroupIds = userJoinings.map(m => m.group_id);
                            const totalMembersCount = servicesData?.filter(m =>
                                userGroupIds.includes(m.group_id)
                            ).length || 0;
                            const userMonthlySteps = stepsData?.filter(s => {
                                const stepDate = new Date(s.step_date);
                                return (
                                    s.user_id === item.id &&
                                    stepDate.getMonth() === currentMonth &&
                                    stepDate.getFullYear() === currentYear
                                );
                            }) || [];
                            const totalSteps = userMonthlySteps.reduce((sum, current) => sum + (current.step_count || 0), 0);
                            const filteredServices = servicesData?.filter(s => s.admin_id === item.id);

                            return (
                                <TableRow key={item.id} sx={defaultTableSx.bodyRowSx}>
                                    <TableCell sx={defaultTableSx.idCellSx}>{adminId++}</TableCell>
                                    <TableCell sx={defaultTableSx.bodyCellSx}>
                                        {isUrl ? (
                                            <Box sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                                border: '1px solid rgba(255,255,255,0.2)'
                                            }}>
                                                {hasNameField ? getCombinedInitials(item?.name) : getInitials(item)}
                                            </Box>
                                        ) : (
                                            <Box
                                                component="img"
                                                src={profileUrl}
                                                alt={item.name}
                                                sx={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                    </TableCell>
                                    {packageName === "com.peccular.moneycollect" && (
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip
                                                label={item.acronym ? item.acronym : '-'}
                                                size="small"
                                                sx={chipSx.acronym}
                                            />
                                        </TableCell>
                                    )}
                                    {packageName === "com.peccular.mechanic" && (
                                        <TableCell sx={defaultTableSx.bodyCellSx}>{item.shop_name ? item.shop_name : '-'}</TableCell>
                                    )}
                                    {packageName === "com.peccular.dancestudiomanager" && (
                                        <TableCell sx={defaultTableSx.bodyCellSx}>{item.studio_name || '-'}</TableCell>
                                    )}
                                    {packageName != "com.peccular.mechanic" && (
                                        ShowFullName ? (
                                            <TableCell sx={defaultTableSx.bodyCellSx}>{item.name}</TableCell>
                                        ) : (
                                            <>
                                                <TableCell sx={defaultTableSx.bodyCellSx}>{firstName ? firstName : '-'}</TableCell>
                                                <TableCell sx={defaultTableSx.bodyCellSx}>{lastName ? lastName : '-'}</TableCell>
                                            </>
                                        )
                                    )}
                                    <TableCell sx={defaultTableSx.bodyCellSx}>
                                        <Chip label={item.email ? item.email : '-'} size="small" sx={chipSx.email} />
                                    </TableCell>
                                    {packageName === "com.peccular.mechanic" && (
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip label={filteredServices?.length} size="small" sx={chipSx.count} />
                                        </TableCell>
                                    )}
                                    {!HidePhoneNumber && (
                                        <TableCell sx={defaultTableSx.bodyCellSx}>{contactNo}</TableCell>
                                    )}
                                    {!hideUsersCurrency && (
                                        <TableCell sx={defaultTableSx.bodyCellSx}>{item.currency ? item.currency : '-'}</TableCell>
                                    )}
                                    {packageName != "com.radicalapp.mechanic" && (
                                        <TableCell sx={defaultTableSx.bodyCellSx}>{countryName}</TableCell>
                                    )}
                                    {packageName === "com.radicalapp.buddywalk" && (
                                        <>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>
                                                <Chip label={totalGroupsCount} size="small" sx={chipSx.count} />
                                            </TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>
                                                <Chip label={totalMembersCount} size="small" sx={chipSx.members} />
                                            </TableCell>
                                            <TableCell sx={defaultTableSx.bodyCellSx}>
                                                <Chip label={totalSteps} size="small" sx={chipSx.steps} />
                                            </TableCell>
                                        </>
                                    )}
                                    {!hideUsersCount && (
                                        <TableCell sx={defaultTableSx.bodyCellSx}>
                                            <Chip label={totalLength} size="small" sx={chipSx.count} />
                                        </TableCell>
                                    )}
                                    <TableCell sx={defaultTableSx.bodyCellSx}>{formatDate(createdAt)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <Box sx={{ textAlign: 'center', padding: '20px', color: 'rgba(248, 113, 113, 0.9)' }}>
            App layout not configured
        </Box>
    );
}