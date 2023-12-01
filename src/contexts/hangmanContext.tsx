import { createContext, useContext, useEffect, useState } from 'react';
import {
    addDoc,
    collection,
    getDocs,
    updateDoc,
    doc
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { useUserContext } from './userContext';
import { IAppDataProps, UserDataProps } from './types';

interface HangmanProviderProps {
    children: React.ReactNode;
}

interface HangmanContextType {
    wins: number;
    losses: number;
    updateWins: () => void;
    updateLosses: () => void;
    resetScores: () => void;
    resetLocalScores: () => void;
    incrementLocalWins: () => void;
    incrementLocalLosses: () => void;
    localWins: number;
    localLosses: number;
    setLocalWins: React.Dispatch<React.SetStateAction<number>>;
    setLocalLosses: React.Dispatch<React.SetStateAction<number>>;
}

export const HangmanContext = createContext<HangmanContextType | null>(null);

export const HangmanProvider: React.FC<HangmanProviderProps> = ({
    children
}) => {
    const { currentUser } = useUserContext();
    const [wins, setWins] = useState<number>(0);
    const [losses, setLosses] = useState<number>(0);
    const [localWins, setLocalWins] = useState<number>(() => {
        const gameDataHangman = localStorage.getItem('gameDataHangman');
        if (gameDataHangman) {
            const { localWins } = JSON.parse(gameDataHangman);
            return localWins;
        } else {
            return 0;
        }
    });
    const [localLosses, setLocalLosses] = useState<number>(() => {
        const gameDataHangman = localStorage.getItem('gameDataHangman');
        if (gameDataHangman) {
            const { localLosses } = JSON.parse(gameDataHangman);
            return localLosses;
        } else {
            return 0;
        }
    });

    const updateLocalStorage = (wins: number, losses: number) => {
        const gameDataHangman = {
            localWins: wins,
            localLosses: losses
        };
        localStorage.setItem(
            'gameDataHangman',
            JSON.stringify(gameDataHangman)
        );
    };

    const incrementLocalWins = () => {
        setLocalWins((prev) => prev + 1);
        updateLocalStorage(localWins + 1, localLosses);
    };
    const incrementLocalLosses = () => {
        setLocalLosses((prev) => prev + 1);
        updateLocalStorage(localWins, localLosses + 1);
    };

    const updateWins = () => setWins(wins + 1);
    const updateLosses = () => setLosses(losses + 1);
    const resetScores = () => {
        setWins(0);
        setLosses(0);
    };

    const resetLocalScores = () => {
        setLocalWins(0);
        setLocalLosses(0);
    };

    const hangmanCollectionRef = collection(db, 'hangman-data');

    useEffect(() => {
        const createScoresTable = async () => {
            const data = await getDocs(hangmanCollectionRef);
            const appData: IAppDataProps[] = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const useDataTable = appData.find(
                (data) => data.userId === currentUser?.uid
            );

            if (!useDataTable && currentUser) {
                await addDoc(hangmanCollectionRef, {
                    wins: 0,
                    losses: 0,
                    userId: currentUser?.uid
                });

                // reset current state score so new user will not "catch" old score
                setLosses(0);
                setWins(0);
            }
        };

        createScoresTable();
    }, [currentUser]);

    useEffect(() => {
        const updateScoresTable = async (wins: number, losses: number) => {
            const data = await getDocs(hangmanCollectionRef);
            const appData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const currentDoc = appData.find(
                (user: IAppDataProps) => user.userId === currentUser?.uid
            );

            if (!currentDoc) {
                return;
            } else {
                const userDoc = doc(db, 'hangman-data', currentDoc.id);
                const newValues = {
                    wins: wins,
                    losses: losses
                };
                await updateDoc(userDoc, newValues);
            }
        };
        updateScoresTable(wins, losses);
    }, [wins, losses]);

    useEffect(() => {
        const getScoresFromDb = async () => {
            const data = await getDocs(hangmanCollectionRef);
            const appData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const userData: UserDataProps | undefined = appData.find(
                (item: IAppDataProps) => item.userId === currentUser?.uid
            );

            if (userData && userData.wins && userData.losses) {
                setWins(userData.wins);
                setLosses(userData.losses);
            }
        };

        getScoresFromDb();
    }, [currentUser]);

    return (
        <HangmanContext.Provider
            value={{
                wins,
                losses,
                updateWins,
                updateLosses,
                resetScores,
                resetLocalScores,
                incrementLocalWins,
                incrementLocalLosses,
                localWins,
                localLosses,
                setLocalWins,
                setLocalLosses
            }}
        >
            {children}
        </HangmanContext.Provider>
    );
};

export const useHangmanContext = (): HangmanContextType => {
    const context = useContext(HangmanContext);
    if (!context) {
        throw new Error(
            'useHangmanContext must be used within a HangmanProvider'
        );
    }
    return context;
};
