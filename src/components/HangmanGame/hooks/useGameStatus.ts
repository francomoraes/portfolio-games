import { useEffect } from 'react';
import { useUserContext } from '../../../contexts/userContext';
import { IGameState } from '../components/GameStatus/types';
import { useHangmanContext } from '../../../contexts/hangmanContext';

export const useGameStatus = (
    gameState: IGameState,
    setGameState: React.Dispatch<React.SetStateAction<IGameState>>
) => {
    const { currentUser } = useUserContext() || {};
    const { wordToGuess, guessedLetters, attemptsLeft } = gameState || {};

    const {
        updateLosses: contextUpdateLosses,
        incrementLocalLosses,
        updateWins: contextUpdateWins,
        incrementLocalWins
    } = useHangmanContext();

    useEffect(() => {
        if (attemptsLeft === 0) {
            setGameState((prevState) => ({
                ...prevState,
                gameStatus: 'lost'
            }));
            currentUser ? contextUpdateLosses() : incrementLocalLosses();
        } else if (wordToGuess !== '') {
            const isGameWon = wordToGuess
                ?.split('')
                .every((letter) => guessedLetters.has(letter));
            if (isGameWon) {
                setGameState((prevState) => ({
                    ...prevState,
                    gameStatus: 'won'
                }));
                currentUser ? contextUpdateWins() : incrementLocalWins();
            }
        }
    }, [
        gameState?.attemptsLeft,
        gameState?.wordToGuess,
        gameState?.guessedLetters
    ]);
};
