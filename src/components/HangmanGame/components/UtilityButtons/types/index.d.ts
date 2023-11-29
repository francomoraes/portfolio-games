export interface UtilityButtonsProps {
    gameStatus: string;
    setGameStatus: React.Dispatch<React.SetStateAction<string>>;
    setWordToGuess: React.Dispatch<React.SetStateAction<string>>;
    setGuessedLetters: React.Dispatch<React.SetStateAction<Set<string>>>;
    setAttemptsLeft: React.Dispatch<React.SetStateAction<number>>;
    words: string[];
    maxAttempts: number;
    setWins: React.Dispatch<React.SetStateAction<number>>;
    setLosses: React.Dispatch<React.SetStateAction<number>>;
}
