import { useEffect, useState } from 'react';
import { useBackgroundColorEffect } from '../../hooks/useBackgroundColorEffect';

const HangmanGame = () => {
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);

    const words = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'mango'];
    const maxAttempts = 6;

    const [wordToGuess, setWordToGuess] = useState('');
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
    const [gameStatus, setGameStatus] = useState('playing');

    useBackgroundColorEffect('#hangman-wins', wins, '#00f', '#E5E7EB');
    useBackgroundColorEffect('#hangman-losses', losses, '#f00', '#E5E7EB');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * words.length);
        setWordToGuess(words[randomIndex]);
    }, []);

    useEffect(() => {
        const gameDataHangman = localStorage.getItem('gameDataHangman');
        if (gameDataHangman) {
            const { wins, losses } = JSON.parse(gameDataHangman);
            setWins(wins);
            setLosses(losses);
        }
    }, []);

    useEffect(() => {
        if (wordToGuess === '') return;

        const isGameWon = wordToGuess
            .split('')
            .every((letter) => guessedLetters.has(letter));
        if (isGameWon) {
            setGameStatus('won');
            setWins((prevWins) => prevWins + 1);
        }
    }, [wordToGuess, guessedLetters]);

    useEffect(() => {
        if (attemptsLeft === 0) {
            setGameStatus('lost');
            setLosses((prevLosses) => prevLosses + 1);
        }
    }, [attemptsLeft]);

    useEffect(() => {
        localStorage.setItem(
            'gameDataHangman',
            JSON.stringify({ wins, losses })
        );
    }, [wins, losses]);

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

    const renderWord = () => {
        return wordToGuess.split('').map((letter, index) => (
            <span
                key={index}
                className="letter w-[16px] hd:w-[24px] flex justify-center"
            >
                {guessedLetters.has(letter) ? letter : '_'}
            </span>
        ));
    };

    const renderAlphabetButtons = (string: string) => {
        const alphabet = string.split('');
        return alphabet.map((letter) => (
            <button
                key={letter}
                className={`grid-span-col-1 grid-span-row-1 bg-gray-100 p-[8px] alphabet-button rounded-lg hover:bg-gray-300 transition-all ${
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

    const handleRestart = () => {
        // Reset the game
        setGuessedLetters(new Set());
        setAttemptsLeft(maxAttempts);
        setGameStatus('playing');

        // Choose a new random word
        const randomIndex = Math.floor(Math.random() * words.length);
        setWordToGuess(words[randomIndex]);
    };

    const spanStyle =
        'grid-span-row-1 grid-span-col-1 bg-gray-200 p-[4px] rounded-lg text-center font-semibold';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="hd:w-[calc(100%-200px)] bg-white m-[12px] p-[12px] hd:p-[32px] rounded shadow-md">
                <h1 className="text-[24px] font-bold mb-[16px]">
                    Hangman Game
                </h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-[8px] justify-between w-full">
                    <span className={spanStyle} id="hangman-wins">
                        Wins: {wins}
                    </span>
                    <span className={spanStyle} id="hangman-losses">
                        Losses: {losses}
                    </span>
                    <span className={spanStyle} id="hangman-total-games">
                        Total Games: {wins + losses}
                    </span>
                    <span className={spanStyle} id="hangman-ratio">
                        Win Ratio: {((wins * 100) / (wins + losses)).toFixed(1)}
                        %
                    </span>
                </div>
                <div className="text-[20px] font-medium my-[16px] flex flex-col items-center">
                    <div className="flex justify-center">Guess the word:</div>
                    <div
                        className={`flex justify-center w-fit p-[8px] transition-all ${
                            gameStatus === 'won' ? 'bg-blue-300 rounded-lg' : ''
                        }`}
                    >
                        {renderWord()}
                    </div>
                </div>
                <div className="text-lg mb-[16px]">
                    Attempts Left: {attemptsLeft}
                </div>
                <div className="flex flex-col items-center mb-[16px]">
                    <div className="my-[3px] grid grid-cols-10 grid-rows-1 gap-[4px] hd:w-full">
                        {renderAlphabetButtons('qwertyuiop')}
                    </div>
                    <div className="my-[3px] grid grid-cols-9 grid-rows-1 gap-[4px] hd:w-full hd:px-[50px]">
                        {renderAlphabetButtons('asdfghjkl')}
                    </div>
                    <div className="my-[3px] grid grid-cols-7 grid-rows-1 gap-[4px] hd:w-full hd:px-[158px]">
                        {renderAlphabetButtons('zxcvbnm')}
                    </div>
                </div>
                {gameStatus === 'won' && (
                    <div className="text-green-600 mt-[16px]">
                        Congratulations! You won!
                    </div>
                )}
                {gameStatus === 'lost' && (
                    <div className="text-red-600 mt-[16px]">
                        Oops! You lost. The word was "{wordToGuess}"
                    </div>
                )}
                {(gameStatus === 'won' || gameStatus === 'lost') && (
                    <button
                        className="mt-[16px] px-[16px] py-[8px] bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleRestart}
                    >
                        Play Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default HangmanGame;
