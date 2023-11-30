import { useEffect } from 'react';
import { IGameState } from '../components/GameStatus/types';

export const useWordToGuess = (
    words: string[],
    setGameState: React.Dispatch<React.SetStateAction<IGameState>>
) => {
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * words.length);
        setGameState((prevState) => ({
            ...prevState,
            wordToGuess: words[randomIndex]
        }));
    }, [words, setGameState]);
};
