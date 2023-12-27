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
    draws: number;
}

interface RPSContextType {
    playGame: (outcomes: any, buttonContent: string) => void;
    remoteScores: ScoreData;
    localScores: ScoreData;
    playerChoice: string;
    computerChoice: string;
    resetScores: () => void;
}

interface RPSProviderProps {
    children: React.ReactNode;
}

export const RockPaperScissorsContext = createContext<RPSContextType>({
    playGame: () => {},
    remoteScores: { playerScore: 0, computerScore: 0, draws: 0 },
    localScores: { playerScore: 0, computerScore: 0, draws: 0 },
    playerChoice: '',
    computerChoice: '',
    resetScores: () => {}
});

export const RockPaperScissorsProvider: React.FC<RPSProviderProps> = ({
    children
}) => {
    const { currentUser } = useUserContext();

    const [remoteScores, setRemoteScores] = useState<ScoreData>({
        playerScore: 0,
        computerScore: 0,
        draws: 0
    });

    const [localScores, setLocalScores] = useLocalStorageState(
        'gameDataRockPaperScissors',
        { playerScore: 0, computerScore: 0, draws: 0 }
    );

    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');

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
        setLocalScores((prev: ScoreData) => ({
            ...prev,
            draws: prev.draws + 1
        }));
    };

    const resetLocalScores = () => {
        setLocalScores({ playerScore: 0, computerScore: 0, draws: 0 });
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
                    draws: 0
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

                const { playerScore, computerScore, draws } = remoteScores;

                const newValues = {
                    playerScore,
                    computerScore,
                    draws
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
                    draws: userData.draws ?? 0
                });
            }
        };

        getScoresFromDb();
    }, [currentUser]);

    const resetScores = () => {
        resetLocalScores();
        setRemoteScores({ playerScore: 0, computerScore: 0, draws: 0 });
    };

    const playGame = (outcomes: any, buttonContent: string) => {
        const choices = ['rock', 'paper', 'scissors'];
        const randomChoice = Math.floor(Math.random() * choices.length);
        const computerChoice = choices[randomChoice];

        setPlayerChoice(buttonContent);
        setComputerChoice(computerChoice);

        if (outcomes[buttonContent][computerChoice] === 'player') {
            if (currentUser) {
                setRemoteScores((prev) => ({
                    ...prev,
                    playerScore: prev.playerScore + 1
                }));
            } else {
                incrementLocalPlayerScore();
            }
        } else if (outcomes[buttonContent][computerChoice] === 'computer') {
            if (currentUser) {
                setRemoteScores((prev) => ({
                    ...prev,
                    computerScore: prev.computerScore + 1
                }));
            } else {
                incrementLocalComputerScore();
            }
        } else if (outcomes[buttonContent][computerChoice] === 'draw') {
            if (currentUser) {
                setRemoteScores((prev) => ({
                    ...prev,
                    draws: prev.draws + 1
                }));
            } else {
                incrementLocalDraw();
            }
        }
    };

    return (
        <RockPaperScissorsContext.Provider
            value={{
                playGame,
                remoteScores,
                localScores,
                playerChoice,
                computerChoice,
                resetScores
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
