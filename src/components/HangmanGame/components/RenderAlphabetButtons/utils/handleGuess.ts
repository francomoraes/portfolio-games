import { IGameState } from '../../GameStatus/types';

export const handleGuess = (
    letter: string,
    gameState: IGameState,
    setGameState: React.Dispatch<React.SetStateAction<IGameState>>
) => {
    const { wordToGuess, gameStatus } = gameState;

    if (gameStatus === 'playing') {
        setGameState((prevState) => ({
            ...prevState,
            guessedLetters: new Set([...prevState.guessedLetters, letter])
        }));

        if (!wordToGuess.includes(letter)) {
            setGameState((prevState) => ({
                ...prevState,
                attemptsLeft: prevState.attemptsLeft - 1
            }));
        }
    }
};
