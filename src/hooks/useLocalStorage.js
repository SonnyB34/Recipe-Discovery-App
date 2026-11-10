import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            // Look in the storage for this page
            const saved = localStorage.getItem(key);
            // Storage only holds text this turns the text back to real data
            return saved ? JSON.parse(saved) : initialValue;
        } catch {
            return initialValue;
        }
    });

    // Every time the value changes save it into storage
    useEffect(() => {
        try {
            //JSON.stringify turns the real data into text so it can be stored
            localStorage.setItem(key, JSON.stringify(value));
        } catch {

        }
    }, [key,value]);

    return [value,setValue];
}