import { useEffect, useState } from 'react';
import { useBackgroundColorEffect } from '../../hooks/useBackgroundColorEffect';
import { useHangmanContext } from '../../contexts/hangmanContext';
import { useUserContext } from '../../contexts/userContext';

export const HangmanGame = () => {
    const { currentUser } = useUserContext() || {};
    const {
        wins: contextWins,
        updateWins: contextUpdateWins,
        losses: contextLosses,
        updateLosses: contextUpdateLosses,
        resetScores: contextResetScores
    } = useHangmanContext() || {};

    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);

    const words = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'mango'];
    const maxAttempts = 6;

    const [wordToGuess, setWordToGuess] = useState('');
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
    const [gameStatus, setGameStatus] = useState('playing');

    useBackgroundColorEffect('#hangman-wins', wins, '#56d8ff', '#E5E7EB');
    useBackgroundColorEffect('#hangman-losses', losses, '#f7a3a3', '#E5E7EB');

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
        localStorage.setItem(
            'gameDataHangman',
            JSON.stringify({ wins, losses })
        );
    }, [wins, losses]);

    useEffect(() => {
        if (wordToGuess === '') return;

        const isGameWon = wordToGuess
            .split('')
            .every((letter) => guessedLetters.has(letter));
        if (isGameWon) {
            setGameStatus('won');
            currentUser
                ? contextUpdateWins()
                : setWins((prevWins) => prevWins + 1);
        }
    }, [wordToGuess, guessedLetters]);

    useEffect(() => {
        if (attemptsLeft === 0) {
            setGameStatus('lost');
            currentUser
                ? contextUpdateLosses()
                : setLosses((prevLosses) => prevLosses + 1);
        }
    }, [attemptsLeft]);

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
                className="letter w-[16px] xl:w-[24px] flex justify-center text-gray-200"
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
                className={`w-[30px] lg:w-[40px] bg-gray-100 p-[8px] alphabet-button rounded-lg hover:bg-gray-300 transition-all ${
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

    const winRatio = () => {
        const localTempWinRatio = Number(
            ((wins * 100) / (wins + losses)).toFixed(1)
        );
        const contextTempWinRatio = Number(
            ((contextWins * 100) / (contextWins + contextLosses)).toFixed(1)
        );
        const tempWinRatio = currentUser
            ? contextTempWinRatio
            : localTempWinRatio;
        return tempWinRatio || 0;
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

    const handleResetScores = () => {
        if (currentUser) {
            contextResetScores();
        } else {
            setWins(0);
            setLosses(0);
        }
    };

    const spanStyle =
        'grid-span-row-1 grid-span-col-1 bg-gray-200 p-[4px] rounded-lg text-center font-semibold transition-all';

    return (
        <div className="py-[60px] flex items-center justify-center bg-transparent">
            <div className="lg:w-[calc(100%-200px)] bg-gray-700 m-[12px] p-[12px] xl:p-[32px] rounded shadow-md">
                <h1 className="text-[24px] font-bold mb-[16px] text-gray-100">
                    Hangman Game
                </h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-[8px] justify-between w-full">
                    <span className={spanStyle} id="hangman-wins">
                        Wins: {currentUser ? contextWins : wins}
                    </span>
                    <span className={spanStyle} id="hangman-losses">
                        Losses: {currentUser ? contextLosses : losses}
                    </span>
                    <span className={spanStyle} id="hangman-total-games">
                        Total Games:{' '}
                        {currentUser
                            ? contextLosses + contextWins
                            : wins + losses}
                    </span>
                    <span className={spanStyle} id="hangman-ratio">
                        Win Ratio: {winRatio()}%
                    </span>
                </div>
                <div className="text-[20px] font-medium my-[16px] flex flex-col items-center">
                    <div className="flex justify-center text-gray-100">
                        Guess the word:
                    </div>
                    <div
                        className={`flex justify-center w-fit p-[8px] transition-all ${
                            gameStatus === 'won' ? 'bg-blue-300 rounded-lg' : ''
                        }`}
                    >
                        {renderWord()}
                    </div>
                </div>
                <div className="text-lg mb-[16px] text-gray-100">
                    Attempts Left: {attemptsLeft}
                </div>
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
                <div className="flex gap-[32px]">
                    {(gameStatus === 'won' || gameStatus === 'lost') && (
                        <button
                            className="mt-[16px] px-[16px] py-[8px] bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={handleRestart}
                        >
                            Play Again
                        </button>
                    )}
                    <button
                        className="mt-[16px] px-[8px] py-[4px] bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleResetScores}
                    >
                        Reset Scores
                    </button>
                </div>
            </div>
        </div>
    );
};
