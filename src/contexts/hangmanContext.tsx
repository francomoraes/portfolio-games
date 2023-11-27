import { createContext, useContext, useEffect, useState } from 'react';
import {
    addDoc,
    collection,
    getDocs,
    updateDoc,
    doc
} from 'firebase/firestore';
import { db } from '../firebase-config';

interface HangmanProviderProps {
    children: React.ReactNode;
    currentUser: any;
}

interface IAppDataProps {
    userId?: string;
    id?: string;
}
interface UserDataProps {
    id?: string;
    wins?: number;
    losses?: number;
}
interface HangmanContextType {
    wins: number;
    losses: number;
    updateWins: () => void;
    updateLosses: () => void;
}

export const HangmanContext = createContext<HangmanContextType | null>(null);

export const HangmanProvider: React.FC<HangmanProviderProps> = ({
    children,
    currentUser
}) => {
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);

    const updateWins = () => setWins(wins + 1);
    const updateLosses = () => setLosses(losses + 1);

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
        const updateScoresTable = async () => {
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

        updateScoresTable();
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
                updateLosses
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
