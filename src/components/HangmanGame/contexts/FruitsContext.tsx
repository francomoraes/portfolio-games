import React, { createContext, useEffect, useState, useContext } from 'react';

interface IFruitsProvider {
    children: React.ReactNode;
}

interface Fruit {
    name: string;
    family: string;
    order: string;
}

interface FruitsContextValue {
    fruits: Fruit[];
    loading: boolean;
    error: string | null;
}

export const FruitsContext = createContext<FruitsContextValue>({
    fruits: [],
    loading: false,
    error: null
});

export const FruitsProvider: React.FC<IFruitsProvider> = ({ children }) => {
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFruits = async () => {
            try {
                const response = await fetch(
                    'https://www.fruityvice.com/api/fruit/all'
                );
                const data = await response.json();
                const extractedFruits = data.map((item: any) => ({
                    name: item.name
                }));
                setFruits(extractedFruits);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch fruits');
                setLoading(false);
            }
        };

        fetchFruits();
    }, []);

    return (
        <FruitsContext.Provider value={{ fruits, loading, error }}>
            {children}
        </FruitsContext.Provider>
    );
};

export const useFruitsContext = () => {
    const context = useContext(FruitsContext);
    if (!context) {
        throw new Error(
            'useFruitsContext must be used within a FruitsProvider'
        );
    }
    return context;
};
