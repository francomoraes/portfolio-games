import { RenderWordProps } from './types';

export const RenderWord: React.FC<RenderWordProps> = ({
    wordToGuess,
    guessedLetters,
    gameStatus
}) => {
    return (
        <div className="text-[20px] font-medium my-[16px] flex flex-col items-center">
            <div className="flex justify-center text-gray-100">
                Guess the word:
            </div>
            <div
                className={`flex justify-center w-fit p-[8px] transition-all ${
                    gameStatus === 'won' ? 'bg-blue-300 rounded-lg' : ''
                }`}
            >
                {wordToGuess.split('').map((letter, index) => (
                    <span
                        key={index}
                        className="letter w-[16px] xl:w-[24px] flex justify-center text-gray-200"
                    >
                        {guessedLetters.has(letter) ? letter : '_'}
                    </span>
                ))}
            </div>
        </div>
    );
};
