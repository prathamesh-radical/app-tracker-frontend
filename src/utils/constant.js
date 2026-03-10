import currency from 'currency.js';

export const tableContainerSx = {
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.5) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(148, 163, 184, 0.08)',
    borderRadius: '16px',
    boxShadow: '0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
    overflowY: 'hidden',
    overflowX: 'auto',
};

export const adminRowSx = {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
};

export const adminCellSx = {
    textAlign: 'center !important',
    color: '#fff',
    fontWeight: 600,
    fontSize: '1rem !important',
    letterSpacing: '0.1em',
    padding: '14px 20px',
    borderBottom: 'none',
    whiteSpace: 'nowrap',
};

export const headRowSx = {
    background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%)',
    borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
};

export const headCellSx = {
    color: '#94a3b8',
    fontWeight: 600,
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '14px 20px',
    borderBottom: 'none',
    whiteSpace: 'nowrap',
};

export const bodyCellSx = {
    color: '#cbd5e1',
    fontSize: '0.875rem',
    padding: '13px 20px',
    borderBottom: '1px solid rgba(148, 163, 184, 0.06)',
};

export const idCellSx = {
    ...bodyCellSx,
    color: '#64748b',
    fontFamily: 'monospace',
    fontSize: '0.78rem',
};

export const bodyRowSx = {
    transition: 'background 0.2s ease',
    '&:hover': {
        background: 'rgba(59, 130, 246, 0.05)',
    },
    '&:last-child td': {
        borderBottom: 'none',
    },
};

export const emailChipSx = {
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#93c5fd',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    fontSize: '0.75rem',
    height: '24px',
    fontFamily: 'monospace',
};

export const countChipSx = {
    background: 'rgba(6, 182, 212, 0.1)',
    color: '#67e8f9',
    border: '1px solid rgba(6, 182, 212, 0.2)',
    fontSize: '0.85rem',
    height: '24px',
    fontWeight: 600,
};

export const dateStyle = {
    color: '#64748b',
    fontSize: '0.88rem',
    fontFamily: 'monospace',
};

export function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
export function formatCurrency(amount, currencyCode) {
    const symbol = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currencyCode,
    })
    .formatToParts(0)
    .find(part => part.type === 'currency')?.value || currencyCode;

    return currency(amount, { symbol, precision: 2 }).format();
}