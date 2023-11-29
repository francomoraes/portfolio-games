import { Button } from '@material-tailwind/react';
import { UtilityButtonsProps } from './types';
import { useUserContext } from '../../../../contexts/userContext';
import { useHangmanContext } from '../../../../contexts/hangmanContext';

export const UtilityButtons: React.FC<UtilityButtonsProps> = ({
    gameStatus,
    words,
    maxAttempts,
    setWordToGuess,
    setGuessedLetters,
    setAttemptsLeft,
    setGameStatus,
    setWins,
    setLosses
}) => {
    const { currentUser } = useUserContext() || {};
    const { resetScores: contextResetScores } = useHangmanContext() || {};

    const handleRestart = () => {
        setGuessedLetters(new Set());
        setAttemptsLeft(maxAttempts);
        setGameStatus('playing');

        // Choose a new random word
        const randomIndex = Math.floor(Math.random() * words.length);
        setWordToGuess(words[randomIndex]);
    };

    const handleResetScores = () => {
        if (currentUser) {
            contextResetScores();
        } else {
            setWins(0);
            setLosses(0);
        }
    };

    return (
        <div className="flex gap-[32px]">
            {(gameStatus === 'won' || gameStatus === 'lost') && (
                <button
                    className="mt-[16px] px-[16px] py-[8px] bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleRestart}
                >
                    Play Again
                </button>
            )}
            <Button
                color="blue-gray"
                className="mt-[16px]"
                type="button"
                onClick={handleResetScores}
            >
                Reset Scores
            </Button>
        </div>
    );
};
