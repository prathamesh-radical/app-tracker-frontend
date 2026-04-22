import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box } from "@mui/material";
import {
    bodyCellSx, bodyRowSx, countChipSx, dateStyle, emailChipSx, formatCurrency, formatDate, getCombinedInitials, getInitials, headCellSx, headRowSx, idCellSx, tableContainerSx
} from "../utils/constant";
import { useNavigate } from "react-router-dom";

export default function AppDataTable({ app, adminId, Paper, currentData, userData, servicesData }) {
    const navigate = useNavigate();

    if (app?.appName === 'My Debt Tracker') {
        return (
            <TableContainer component={Paper} sx={tableContainerSx}>
                <Table>
                    <TableHead>
                        <TableRow sx={headRowSx}>
                            <TableCell sx={headCellSx}>#</TableCell>
                            <TableCell sx={headCellSx}>Profile</TableCell>
                            <TableCell sx={headCellSx}>First Name</TableCell>
                            <TableCell sx={headCellSx}>Last Name</TableCell>
                            <TableCell sx={headCellSx}>Email</TableCell>
                            <TableCell sx={headCellSx}>Currency</TableCell>
                            <TableCell sx={headCellSx}>Country</TableCell>
                            <TableCell sx={headCellSx}>Users</TableCell>
                            <TableCell sx={headCellSx}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((item) => {
                            const isUrl = (
                                item.profile_url === '' || item.profile_url === null || item.profile_url === 'Null' || item.profile_url === undefined
                            );

                            return (
                                <TableRow key={item.id} sx={bodyRowSx}>
                                    <TableCell sx={idCellSx}>{adminId++}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        {isUrl ? (
                                            <Box
                                                sx={{
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
                                                }}
                                            >
                                                {getInitials(item.firstname, item.lastname)}
                                            </Box>
                                        ) : (
                                            <Box
                                                component="img"
                                                src={item.profile_url}
                                                alt={item.name}
                                                sx={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                                                onError={(e) => { e.target.style.display = 'none'; }} // Fallback if link breaks
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>{item.firstname ? item.firstname : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.lastname ? item.lastname : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <Chip label={item.email ? item.email : '-'} size="medium" sx={emailChipSx} />
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>{item.currency ? item.currency : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.country ? item.country : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <Chip label={item.entries ?? 0} size="medium" sx={countChipSx} />
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <span style={dateStyle}>{formatDate(item.created_at)}</span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    if (app?.appName === 'Mechanic Invoice Manager') {

        return (
            <TableContainer component={Paper} sx={tableContainerSx}>
                <Table>
                    <TableHead>
                        <TableRow sx={headRowSx}>
                            <TableCell sx={headCellSx}>#</TableCell>
                            <TableCell sx={headCellSx}>Shop Name</TableCell>
                            <TableCell sx={headCellSx}>First Name</TableCell>
                            <TableCell sx={headCellSx}>Last Name</TableCell>
                            <TableCell sx={headCellSx}>Email</TableCell>
                            <TableCell sx={headCellSx}>Services</TableCell>
                            <TableCell sx={headCellSx}>Contact No.</TableCell>
                            <TableCell sx={headCellSx}>Country</TableCell>
                            <TableCell sx={headCellSx}>Currency</TableCell>
                            <TableCell sx={headCellSx}>Users</TableCell>
                            <TableCell sx={headCellSx}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((item) => {
                            const customersData = userData?.filter(m => m.admin_id === item.id);
                            const filteredServices = servicesData?.filter(s => s.admin_id === item.id);

                            return (
                                <TableRow
                                    key={item.id}
                                    sx={bodyRowSx}
                                    className="cursor-pointer"
                                    onClick={() => navigate(
                                        `/appdata/mechanic/${app.id}/${item.id}`,
                                        {
                                            state: {
                                                userName: item.firstName + " " + item.lastName, customersData: customersData, currency: item.currency
                                            }
                                        }
                                    )}
                                >
                                    <TableCell sx={idCellSx}>{adminId++}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.shop_name ? item.shop_name : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.firstName ? item.firstName : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.lastName ? item.lastName : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}><Chip label={item.email ? item.email : '-'} size="medium" sx={emailChipSx} /></TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        {filteredServices.length >= 1 ? (
                                            filteredServices?.map((service, idx) => (
                                                <Box key={idx}>
                                                    {item?.currency ? (
                                                        `${service.name} - ${formatCurrency(0, item?.currency || 'USD').replace(/[\d.,\s]/g, '')}${service.price}`
                                                    ) : (
                                                        `${service.name} - ${service.price}`
                                                    )}
                                                </Box>
                                            ))
                                        ) : (
                                            'No services'
                                        )}
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>{item.country_code} {item.contact}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.country ? item.country : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.currency ? item.currency : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <Chip label={customersData?.length || 0} size="medium" sx={countChipSx} />
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <span style={dateStyle}>{formatDate(item.created_at)}</span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    if (app?.appName === 'Smart Money Collection') {
        return (
            <TableContainer component={Paper} sx={tableContainerSx}>
                <Table>
                    <TableHead>
                        <TableRow sx={headRowSx}>
                            <TableCell sx={headCellSx}>#</TableCell>
                            <TableCell sx={headCellSx}>Acronym</TableCell>
                            <TableCell sx={headCellSx}>Name</TableCell>
                            <TableCell sx={headCellSx}>Email</TableCell>
                            <TableCell sx={headCellSx}>Currency</TableCell>
                            <TableCell sx={headCellSx}>Country</TableCell>
                            <TableCell sx={headCellSx}>Entries</TableCell>
                            <TableCell sx={headCellSx}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((item) => {
                            const bankUsersData = userData?.filter(m => m.bank_id === item.id);

                            return (
                                <TableRow
                                    key={item.id}
                                    sx={bodyRowSx}
                                    className="cursor-pointer"
                                    onClick={() => navigate(
                                        `/appdata/smartmoney/${app.id}/${item.id}`, { state: { bankName: item.name, usersData: bankUsersData, currency: item.currency } }
                                    )}
                                >
                                    <TableCell sx={idCellSx}>{adminId++}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <Chip
                                            label={item.acronym ? item.acronym : '-'}
                                            size="small"
                                            sx={{
                                                ...countChipSx,
                                                background: 'rgba(34,197,94,0.08)', color: '#86efac', border: '1px solid rgba(34,197,94,0.2)'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>{item.name}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <Chip label={item.email ? item.email : '-'} size="medium" sx={emailChipSx} />
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>{item.currency ? item.currency : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.country ? item.country : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <Chip label={bankUsersData?.length || 0} size="medium" sx={countChipSx} />
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <span style={dateStyle}>{formatDate(item.created_at)}</span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    if (app?.appName === 'Entry Book Visitor Management') {
        return (
            <TableContainer component={Paper} sx={tableContainerSx}>
                <Table>
                    <TableHead>
                        <TableRow sx={headRowSx}>
                            <TableCell sx={headCellSx}>#</TableCell>
                            <TableCell sx={headCellSx}>First Name</TableCell>
                            <TableCell sx={headCellSx}>Last Name</TableCell>
                            <TableCell sx={headCellSx}>Email</TableCell>
                            <TableCell sx={headCellSx}>Contact No.</TableCell>
                            <TableCell sx={headCellSx}>Currency</TableCell>
                            <TableCell sx={headCellSx}>Country</TableCell>
                            <TableCell sx={headCellSx}>Entries</TableCell>
                            <TableCell sx={headCellSx}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((item) => {
                            const visitorData = userData?.filter(m => m.user_id === item.id);

                            return (
                                <TableRow
                                    key={item.id}
                                    sx={bodyRowSx}
                                    className="cursor-pointer"
                                    onClick={() => navigate(
                                        `/appdata/guestentry/${app.id}/${item.id}`,
                                        { state: { userName: item.first_name + " " + item.last_name, visitorData: visitorData } }
                                    )}
                                >
                                    <TableCell sx={idCellSx}>{adminId++}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.first_name}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.last_name}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <Chip label={item.email} size="medium" sx={emailChipSx} />
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>{item.phone_no}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.currency ? item.currency : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.country ? item.country : '-'}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <Chip label={visitorData.length || 0} size="medium" sx={countChipSx} />
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        <span style={dateStyle}>{formatDate(item.date)}</span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    if (app?.appName === 'Dance Studio Management') {
        return (
            <TableContainer component={Paper} sx={tableContainerSx}>
                <Table>
                    <TableHead>
                        <TableRow sx={headRowSx}>
                            <TableCell sx={headCellSx}>#</TableCell>
                            <TableCell sx={headCellSx}>Name</TableCell>
                            <TableCell sx={headCellSx}>Studio Name</TableCell>
                            <TableCell sx={headCellSx}>Email</TableCell>
                            <TableCell sx={headCellSx}>Phone No.</TableCell>
                            <TableCell sx={headCellSx}>Currency</TableCell>
                            <TableCell sx={headCellSx}>Country</TableCell>
                            <TableCell sx={headCellSx}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((item) => (
                            <TableRow key={item.id} sx={bodyRowSx}>
                                <TableCell sx={idCellSx}>{adminId++}</TableCell>
                                <TableCell sx={bodyCellSx}>
                                    {item.first_name + ' ' + item.last_name || '-'}
                                </TableCell>
                                <TableCell sx={bodyCellSx}>
                                    {item.studio_name || '-'}
                                </TableCell>
                                <TableCell sx={bodyCellSx}>
                                    {item.email}
                                </TableCell>
                                <TableCell sx={bodyCellSx}>{item.phone_number || '-'}</TableCell>
                                <TableCell sx={bodyCellSx}>{item.currency || '-'}</TableCell>
                                <TableCell sx={bodyCellSx}>{item.country_name || '-'}</TableCell>
                                <TableCell sx={bodyCellSx}>
                                    <span style={dateStyle}>{formatDate(item.created_at)}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    if (app?.appName === 'BuddyWalk Group steps Counter') {
        return (
            <TableContainer component={Paper} sx={tableContainerSx}>
                <Table>
                    <TableHead>
                        <TableRow sx={headRowSx}>
                            <TableCell sx={headCellSx}>#</TableCell>
                            <TableCell sx={headCellSx}>Profile</TableCell>
                            <TableCell sx={headCellSx}>User</TableCell>
                            <TableCell sx={headCellSx}>Email</TableCell>
                            <TableCell sx={headCellSx}>Country</TableCell>
                            <TableCell sx={headCellSx}>No. of Grp</TableCell>
                            <TableCell sx={headCellSx}>No. of Members</TableCell>
                            <TableCell sx={headCellSx}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((item) => {
                            const isUrl = item.photo_url === '' || item.photo_url === null;

                            const userJoinings = servicesData?.filter(m => m.user_id === item.id) || [];
                            const totalGroupsCount = userJoinings.length;

                            const userGroupIds = userJoinings.map(m => m.group_id);

                            const totalMembersCount = servicesData?.filter(m =>
                                userGroupIds.includes(m.group_id)
                            ).length || 0;

                            return (
                                <TableRow key={item.id} sx={bodyRowSx}>
                                    <TableCell sx={idCellSx}>{adminId++}</TableCell>
                                    <TableCell sx={bodyCellSx}>
                                        {isUrl ? (
                                            <Box sx={{
                                                width: 40, height: 40, borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                                                color: '#fff', fontSize: '14px', fontWeight: 'bold',
                                                textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)'
                                            }}>
                                                {getCombinedInitials(item.name)}
                                            </Box>
                                        ) : (
                                            <Box component="img" src={item.photo_url} alt={item.name}
                                                sx={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell sx={bodyCellSx}>{item.name}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.email}</TableCell>
                                    <TableCell sx={bodyCellSx}>{item.country || '-'}</TableCell>

                                    {/* Total Groups (Created + Joined) */}
                                    <TableCell sx={bodyCellSx}>
                                        <Chip label={totalGroupsCount} size="medium" sx={countChipSx} />
                                    </TableCell>

                                    {/* Total Members across all his groups */}
                                    <TableCell sx={bodyCellSx}>
                                        <Chip label={totalMembersCount} size="medium" sx={{ ...countChipSx, backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }} />
                                    </TableCell>

                                    <TableCell sx={bodyCellSx}>
                                        <span style={dateStyle}>{formatDate(item.created_at)}</span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return null;
}