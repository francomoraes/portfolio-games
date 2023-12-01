import { useEffect, useState } from 'react';
import { ScoreData } from '../rockPaperScissorsContext';

export const useLocalStorageState = (key: string, defaultValue: ScoreData) => {
    const [state, setState] = useState<ScoreData>(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;
};
