export interface RenderAlphabetButtonsProps {
    guessedLetters: Set<string>;
    gameStatus: string;
    wordToGuess: string;
    setGuessedLetters: React.Dispatch<React.SetStateAction<Set<string>>>;
    setAttemptsLeft: React.Dispatch<React.SetStateAction<number>>;
}
