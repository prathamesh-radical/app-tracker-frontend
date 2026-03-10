import { useEffect, useState } from "react";

export default function useFetch(apiEndpoint) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                const response = await fetch(import.meta.env.VITE_ + apiEndpoint, {
                    method: 'GET',
                    headers: headers,
                });
                const result = await response.json();

                if (!response.ok) throw new Error(result.message || `Failed to fetch data from ${apiEndpoint}`);

                let extractedData;
                if (apiEndpoint === '/api/debtors') {
                    extractedData = result.debtors;
                } else if (apiEndpoint === '/api/mechanic') {
                    extractedData = result.mechanic;
                } else if (apiEndpoint === '/api/mechanic-data') {
                    extractedData = result.mechaniclist;
                } else if (apiEndpoint === '/api/mechanic-services-data') {
                    extractedData = result.serviceslist;
                } else if (apiEndpoint === '/api/money-collect') {
                    extractedData = result.moneycollect;
                } else if (apiEndpoint === '/api/money-collect-data') {
                    extractedData = result.moneycollectlist;
                } else if (apiEndpoint === '/api/guest-entries') {
                    extractedData = result.guestEntries;
                } else if (apiEndpoint === '/api/guest-entries-data') {
                    extractedData = result.visitorslist;
                } else {
                    extractedData = result;
                }

                setData(extractedData);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiEndpoint]);

    return { data, error, loading };
}