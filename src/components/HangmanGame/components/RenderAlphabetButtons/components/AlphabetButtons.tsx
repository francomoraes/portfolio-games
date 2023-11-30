import { IGameState } from '../../GameStatus/types';
import { RenderAlphabetButtonsProps } from '../types';
import { handleGuess } from '../utils';

export const AlphabetButtons = ({
    string,
    gameState,
    setGameState
}: {
    string: string;
    gameState: IGameState;
    setGameState: React.Dispatch<React.SetStateAction<IGameState>>;
}) => {
    const { gameStatus, guessedLetters } =
        gameState || ({} as RenderAlphabetButtonsProps);

    const alphabet = string.split('');
    return alphabet.map((letter) => (
        <button
            key={letter}
            className={`w-[30px] lg:w-[40px] bg-gray-600 text-gray-100 p-[8px] alphabet-button rounded-lg hover:bg-gray-500 hover:scale-[1.05] transition-all ${
                guessedLetters.has(letter) ? 'opacity-20' : ''
            }`}
            onClick={() => handleGuess(letter, gameState, setGameState)}
            disabled={guessedLetters.has(letter) || gameStatus !== 'playing'}
        >
            {letter}
        </button>
    ));
};
