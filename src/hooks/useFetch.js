import { useState, useEffect } from 'react';


export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(url));
    const [error, setError] = useState(null);

    useEffect(() => {

    }, [url]);
}