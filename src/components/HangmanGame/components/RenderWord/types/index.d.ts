export interface RenderWordProps {
    wordToGuess: string;
    guessedLetters: Set<string>;
    gameStatus: string;
}
