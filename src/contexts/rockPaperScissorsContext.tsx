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
import { useLocalStorageState } from './hooks';
import { IAppDataProps, UserDataProps } from './types';

export interface ScoreData {
    playerScore: number;
    computerScore: number;
    draw: number;
}

interface RPSContextType {
    remoteScores: ScoreData;
    setRemoteScores: React.Dispatch<React.SetStateAction<ScoreData>>;
    localScores: ScoreData;
    setLocalScores: React.Dispatch<React.SetStateAction<ScoreData>>;
    incrementLocalPlayerScore: () => void;
    incrementLocalComputerScore: () => void;
    incrementLocalDraw: () => void;
    resetLocalScores: () => void;
    updateLocalStorage: (
        player: number,
        computer: number,
        draw: number
    ) => void;
}

interface RPSProviderProps {
    children: React.ReactNode;
}

export const RockPaperScissorsContext = createContext<RPSContextType>({
    remoteScores: { playerScore: 0, computerScore: 0, draw: 0 },
    setRemoteScores: () => {},
    localScores: { playerScore: 0, computerScore: 0, draw: 0 },
    setLocalScores: () => {},
    incrementLocalPlayerScore: () => {},
    incrementLocalComputerScore: () => {},
    incrementLocalDraw: () => {},
    resetLocalScores: () => {},
    updateLocalStorage: () => {}
});

export const RockPaperScissorsProvider: React.FC<RPSProviderProps> = ({
    children
}) => {
    const { currentUser } = useUserContext();
    const [remoteScores, setRemoteScores] = useState<ScoreData>({
        playerScore: 0,
        computerScore: 0,
        draw: 0
    });

    const [localScores, setLocalScores] = useLocalStorageState(
        'gameDataRockPaperScissors',
        { playerScore: 0, computerScore: 0, draw: 0 }
    );

    const updateLocalStorage = (
        player: number,
        computer: number,
        draw: number
    ) => {
        const gameDataRockPaperScissors = {
            playerScore: player,
            computerScore: computer,
            draw: draw
        };
        localStorage.setItem(
            'gameDataRockPaperScissors',
            JSON.stringify(gameDataRockPaperScissors)
        );
    };

    const incrementLocalPlayerScore = () => {
        setLocalScores((prev: ScoreData) => ({
            ...prev,
            playerScore: prev.playerScore + 1
        }));
    };

    const incrementLocalComputerScore = () => {
        setLocalScores((prev: ScoreData) => ({
            ...prev,
            computerScore: prev.computerScore + 1
        }));
    };

    const incrementLocalDraw = () => {
        setLocalScores((prev: ScoreData) => ({ ...prev, draw: prev.draw + 1 }));
    };

    const resetLocalScores = () => {
        setLocalScores({ playerScore: 0, computerScore: 0, draw: 0 });
    };

    const rpsCollectionRef = collection(db, 'rock-paper-scissors-data');

    useEffect(() => {
        const createScoresTable = async () => {
            const data = await getDocs(rpsCollectionRef);
            const appData: IAppDataProps[] = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const useDataTable = appData.find(
                (data) => data.userId === currentUser?.uid
            );

            if (!useDataTable && currentUser) {
                await addDoc(rpsCollectionRef, {
                    playerScore: 0,
                    computerScore: 0,
                    draws: 0,
                    userId: currentUser?.uid
                });

                // reset current state score so new user will not "catch" old score
                setRemoteScores({
                    playerScore: 0,
                    computerScore: 0,
                    draw: 0
                });
            }
        };

        createScoresTable();
    }, [currentUser]);

    useEffect(() => {
        const updateScoresTable = async () => {
            const data = await getDocs(rpsCollectionRef);
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
                const userDoc = doc(
                    db,
                    'rock-paper-scissors-data',
                    currentDoc.id
                );

                const { playerScore, computerScore, draw } = remoteScores;

                const newValues = {
                    playerScore,
                    computerScore,
                    draw
                };
                await updateDoc(userDoc, newValues);
            }
        };

        updateScoresTable();
    }, [remoteScores, currentUser]);

    useEffect(() => {
        const getScoresFromDb = async () => {
            const data = await getDocs(rpsCollectionRef);
            const appData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const userData: UserDataProps | undefined = appData.find(
                (item: IAppDataProps) => item.userId === currentUser?.uid
            );

            if (userData) {
                setRemoteScores({
                    playerScore: userData.playerScore ?? 0,
                    computerScore: userData.computerScore ?? 0,
                    draw: userData.draws ?? 0
                });
            }
        };

        getScoresFromDb();
    }, [currentUser]);

    return (
        <RockPaperScissorsContext.Provider
            value={{
                remoteScores,
                setRemoteScores,
                localScores,
                setLocalScores,
                incrementLocalPlayerScore,
                incrementLocalComputerScore,
                incrementLocalDraw,
                resetLocalScores,
                updateLocalStorage
            }}
        >
            {children}
        </RockPaperScissorsContext.Provider>
    );
};

export const useRockPaperScissorsContext = () => {
    if (!RockPaperScissorsContext) {
        throw new Error(
            'useRockPaperScissorsContext must be used within a RockPaperScissorsProvider'
        );
    }
    return useContext(RockPaperScissorsContext);
};
