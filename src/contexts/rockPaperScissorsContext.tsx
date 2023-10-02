import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    addDoc,
    collection,
    getDocs,
    updateDoc,
    doc
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { useUserContext } from './userContext';

export const RockPaperScissorsContext = createContext();

export const RockPaperScissorsProvider = (props) => {
    const { currentUser } = useUserContext();

    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [draw, setDraw] = useState(0);
    const rpsCollectionRef = collection(db, 'rock-paper-scissors-data');

    useEffect(() => {
        const createScoresTable = async () => {
            const data = await getDocs(rpsCollectionRef);
            const appData = data.docs.map((doc) => ({
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
                setComputerScore(0);
                setPlayerScore(0);
                setDraw(0);
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
                (user) => user.userId === currentUser?.uid
            );

            if (!currentDoc) {
                return;
            } else {
                const userDoc = doc(
                    db,
                    'rock-paper-scissors-data',
                    currentDoc.id
                );
                const newValues = {
                    playerScore: playerScore,
                    computerScore: computerScore,
                    draws: draw
                };
                await updateDoc(userDoc, newValues);
            }
        };

        updateScoresTable();
    }, [playerScore, computerScore, draw]);

    useEffect(() => {
        const getScoresFromDb = async () => {
            const data = await getDocs(rpsCollectionRef);
            const appData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const userData = appData.find(
                (item) => item.userId === currentUser?.uid
            );

            if (userData) {
                setPlayerScore(userData.playerScore);
                setComputerScore(userData.computerScore);
                setDraw(userData.draws);
            }
        };

        getScoresFromDb();
    }, [currentUser]);

    return (
        <RockPaperScissorsContext.Provider
            value={{
                playerScore,
                setPlayerScore,
                computerScore,
                setComputerScore,
                draw,
                setDraw
            }}
        >
            {props.children}
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
