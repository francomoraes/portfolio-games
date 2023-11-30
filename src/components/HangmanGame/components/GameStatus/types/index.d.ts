export interface GameStatusProps {
    gameState: IGameState;
}

export interface IGameState {
    wordToGuess: string;
    guessedLetters: Set<string>;
    attemptsLeft: number;
    gameStatus: string;
}
