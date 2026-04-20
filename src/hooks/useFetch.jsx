import { useEffect, useState } from "react";

const EXTRACT_MAP = {
    '/api/debtors':                 (r) => r.debtors,
    '/api/mechanic':                (r) => r.mechanic,
    '/api/mechanic-data':           (r) => r.mechaniclist,
    '/api/mechanic-services-data':  (r) => r.serviceslist,
    '/api/money-collect':           (r) => r.moneycollect,
    '/api/money-collect-data':      (r) => r.moneycollectlist,
    '/api/guest-entries':           (r) => r.guestEntries,
    '/api/guest-entries-data':      (r) => r.visitorslist,
    '/api/dance-studio-users':         (r) => r.danceStudioList,
    '/api/buddy-walk-steps':         (r) => r.stepslist,
};

export default function useFetch(apiEndpoint) {
    const [data, setData]       = useState([]);
    const [error, setError]     = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // null endpoint = this app doesn't need this data
        if (!apiEndpoint) return;

        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + apiEndpoint, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();

                if (!response.ok) throw new Error(result.message || `Failed to fetch ${apiEndpoint}`);

                const extractor = EXTRACT_MAP[apiEndpoint];
                const extracted = extractor ? extractor(result) : result;

                if (!cancelled) {
                    setData(extracted);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();
        return () => { cancelled = true; };
    }, [apiEndpoint]);

    return { data, error, loading };
}