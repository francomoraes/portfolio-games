import { IGameState } from '../../GameStatus/types';

export interface UtilityButtonsProps {
    gameState: IGameState;
    setGameState: React.Dispatch<
        React.SetStateAction<{
            wordToGuess: string;
            guessedLetters: Set<string>;
            attemptsLeft: number;
            gameStatus: string;
        }>
    >;
    maxAttempts: number;
    words: string[];
}
