import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Chip,
    Stack,
    Divider
} from "@mui/material";
import { useState } from "react";

// ── SORT MODAL ──
export function SortModal({ open, onClose, onApplySort, currentSort }) {
    const [selectedSort, setSelectedSort] = useState(currentSort || 'newest');

    const sortOptions = [
        { id: 'newest', label: 'Newest First', description: 'Recently created first' },
        { id: 'oldest', label: 'Oldest First', description: 'Older items first' },
        { id: 'nameAZ', label: 'Shop Name A-Z', description: 'Alphabetical order' },
        { id: 'nameZA', label: 'Shop Name Z-A', description: 'Reverse alphabetical' },
        { id: 'mostServices', label: 'Most Services', description: 'High to low' },
        { id: 'leastServices', label: 'Least Services', description: 'Low to high' },
        { id: 'mostInvoices', label: 'Most Invoices', description: 'High to low' },
        { id: 'leastInvoices', label: 'Least Invoices', description: 'Low to high' },
    ];

    const handleApply = () => {
        onApplySort(selectedSort);
        onClose();
    };

    // ── RESET FUNCTION ──
    const handleReset = () => {
        setSelectedSort('newest');
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600, fontSize: '18px' }}>
                Sort Options
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ py: 3 }}>
                <RadioGroup
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                >
                    <Stack spacing={2}>
                        {sortOptions.map((option) => (
                            <Box
                                key={option.id}
                                sx={{
                                    p: 2,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    backgroundColor: selectedSort === option.id ? '#f5f5f5' : 'transparent',
                                    borderColor: selectedSort === option.id ? '#1976d2' : '#e0e0e0',
                                    '&:hover': {
                                        backgroundColor: '#fafafa',
                                        borderColor: '#1976d2',
                                    },
                                }}
                            >
                                <FormControlLabel
                                    value={option.id}
                                    control={<Radio />}
                                    label={
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {option.label}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {option.description}
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{ width: '100%' }}
                                />
                            </Box>
                        ))}
                    </Stack>
                </RadioGroup>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleReset} variant="text" color="error">
                    Reset Sort
                </Button>
                <Box sx={{ ml: 'auto' }}>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleApply} variant="contained" color="primary" sx={{ ml: 1 }}>
                        Apply Sort
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

// ── FILTER MODAL ──
export function FilterModal({ open, onClose, onApplyFilter, data, currentFilters }) {
    const [filters, setFilters] = useState(
        currentFilters || {
            country: [],
            currency: [],
            servicesCount: { min: '', max: '' },
            invoicesCount: { min: '', max: '' },
            createdDate: { from: '', to: '' },
        }
    );

    // Extract unique values from data
    const getUniqueValues = (key) => {
        if (!data) return [];
        const values = data
            .map(item => item[key])
            .filter(val => val && val !== '')
            .filter((val, idx, arr) => arr.indexOf(val) === idx);
        return values.sort();
    };

    const countries = getUniqueValues('country');
    const currencies = getUniqueValues('currency');

    const handleCountryChange = (country) => {
        setFilters(prev => ({
            ...prev,
            country: prev.country.includes(country)
                ? prev.country.filter(c => c !== country)
                : [...prev.country, country]
        }));
    };

    const handleCurrencyChange = (currency) => {
        setFilters(prev => ({
            ...prev,
            currency: prev.currency.includes(currency)
                ? prev.currency.filter(c => c !== currency)
                : [...prev.currency, currency]
        }));
    };

    const handleApply = () => {
        onApplyFilter(filters);
        onClose();
    };

    const handleReset = () => {
        setFilters({
            country: [],
            currency: [],
            servicesCount: { min: '', max: '' },
            invoicesCount: { min: '', max: '' },
            createdDate: { from: '', to: '' },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600, fontSize: '18px' }}>
                Filter Options
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ py: 3 }}>
                <Stack spacing={3}>
                    {/* COUNTRY FILTER */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                            Country
                        </Typography>
                        <FormGroup>
                            {countries.length > 0 ? (
                                countries.map((country) => (
                                    <FormControlLabel
                                        key={country}
                                        control={
                                            <Checkbox
                                                checked={filters.country.includes(country)}
                                                onChange={() => handleCountryChange(country)}
                                            />
                                        }
                                        label={country}
                                    />
                                ))
                            ) : (
                                <Typography variant="caption" color="textSecondary">
                                    No countries available
                                </Typography>
                            )}
                        </FormGroup>
                    </Box>

                    <Divider />

                    {/* CURRENCY FILTER */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                            Currency
                        </Typography>
                        <FormGroup>
                            {currencies.length > 0 ? (
                                currencies.map((currency) => (
                                    <FormControlLabel
                                        key={currency}
                                        control={
                                            <Checkbox
                                                checked={filters.currency.includes(currency)}
                                                onChange={() => handleCurrencyChange(currency)}
                                            />
                                        }
                                        label={currency}
                                    />
                                ))
                            ) : (
                                <Typography variant="caption" color="textSecondary">
                                    No currencies available
                                </Typography>
                            )}
                        </FormGroup>
                    </Box>

                    <Divider />

                    {/* SERVICES COUNT FILTER */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                            Services Count
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Min"
                                type="number"
                                size="small"
                                value={filters.servicesCount.min}
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        servicesCount: { ...prev.servicesCount, min: e.target.value }
                                    }))
                                }
                                placeholder="0"
                            />
                            <TextField
                                label="Max"
                                type="number"
                                size="small"
                                value={filters.servicesCount.max}
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        servicesCount: { ...prev.servicesCount, max: e.target.value }
                                    }))
                                }
                                placeholder="999"
                            />
                        </Stack>
                    </Box>

                    <Divider />

                    {/* INVOICES COUNT FILTER */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                            Invoices Count
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Min"
                                type="number"
                                size="small"
                                value={filters.invoicesCount.min}
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        invoicesCount: { ...prev.invoicesCount, min: e.target.value }
                                    }))
                                }
                                placeholder="0"
                            />
                            <TextField
                                label="Max"
                                type="number"
                                size="small"
                                value={filters.invoicesCount.max}
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        invoicesCount: { ...prev.invoicesCount, max: e.target.value }
                                    }))
                                }
                                placeholder="999"
                            />
                        </Stack>
                    </Box>

                    <Divider />

                    {/* CREATED DATE FILTER */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                            Created Date
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="From"
                                type="date"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                value={filters.createdDate.from}
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        createdDate: { ...prev.createdDate, from: e.target.value }
                                    }))
                                }
                            />
                            <TextField
                                label="To"
                                type="date"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                value={filters.createdDate.to}
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        createdDate: { ...prev.createdDate, to: e.target.value }
                                    }))
                                }
                            />
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleReset} variant="text" color="error">
                    Reset Filters
                </Button>
                <Box sx={{ ml: 'auto' }}>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleApply} variant="contained" color="primary" sx={{ ml: 1 }}>
                        Apply Filters
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}