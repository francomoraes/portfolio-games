import React from 'react';
import { RenderAlphabetButtonsProps } from './types';

export const RenderAlphabetButtons: React.FC<RenderAlphabetButtonsProps> = ({
    guessedLetters,
    gameStatus,
    wordToGuess,
    setGuessedLetters,
    setAttemptsLeft
}) => {
    const handleGuess = (letter: string) => {
        if (gameStatus === 'playing') {
            setGuessedLetters(
                (prevGuessedLetters) => new Set([...prevGuessedLetters, letter])
            );

            if (!wordToGuess.includes(letter)) {
                setAttemptsLeft((prevAttempts) => prevAttempts - 1);
            }
        }
    };

    const renderAlphabetButtons = (string: string) => {
        const alphabet = string.split('');
        return alphabet.map((letter) => (
            <button
                key={letter}
                className={`w-[30px] lg:w-[40px] bg-gray-600 text-gray-100 p-[8px] alphabet-button rounded-lg hover:bg-gray-500 hover:scale-[1.05] transition-all ${
                    guessedLetters.has(letter) ? 'opacity-20' : ''
                }`}
                onClick={() => handleGuess(letter)}
                disabled={
                    guessedLetters.has(letter) || gameStatus !== 'playing'
                }
            >
                {letter}
            </button>
        ));
    };

    return (
        <div className="flex flex-col items-center mb-[16px]">
            <div className="my-[3px] flex gap-[4px]">
                {renderAlphabetButtons('qwertyuiop')}
            </div>
            <div className="my-[3px] flex gap-[4px]">
                {renderAlphabetButtons('asdfghjkl')}
            </div>
            <div className="my-[3px] flex gap-[4px]">
                {renderAlphabetButtons('zxcvbnm')}
                <div className="w-[30px] lg:w-[40px]"></div>
            </div>
        </div>
    );
};
