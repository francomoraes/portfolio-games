import { Button } from '@material-tailwind/react';
import { UtilityButtonsProps } from './types';
import { useUserContext } from '../../../../contexts/userContext';
import { useHangmanContext } from '../../../../contexts/hangmanContext';

export const UtilityButtons: React.FC<UtilityButtonsProps> = ({
    gameState,
    words,
    maxAttempts,
    setGameState
}) => {
    const { currentUser } = useUserContext() || {};
    const { resetScores: contextResetScores, resetLocalScores } =
        useHangmanContext() || {};
    const { gameStatus } = gameState;

    const handleRestart = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        setGameState((prevState) => ({
            ...prevState,
            wordToGuess: words[randomIndex],
            guessedLetters: new Set(),
            attemptsLeft: maxAttempts,
            gameStatus: 'playing'
        }));
    };

    const handleResetScores = () => {
        if (currentUser) {
            contextResetScores();
        } else {
            resetLocalScores();
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
