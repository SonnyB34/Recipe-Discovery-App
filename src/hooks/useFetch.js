import { useState, useEffect } from 'react';


export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(url));
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setLoading(false)
            return;
        }
        let ignore = false;

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Request failed (status ${response.status})`);
                }
                const json = await response.json();

                if (!ignore) setData(json);
            } catch (e) {
                if (!ignore) setError(error.message);
            } finally {
                if (!ignore) setLoading(false)
            }
        }
        fetchData();

        return () => {
            ignore = true;
        };

    }, [url]);

    return { data, loading, error };
}