import { useEffect, useState } from 'react';
import { useBackgroundColorEffect } from '../../hooks/useBackgroundColorEffect';
import { useHangmanContext } from '../../contexts/hangmanContext';
import { useUserContext } from '../../contexts/userContext';
import { motion } from 'framer-motion';
import {
    RenderAlphabetButtons,
    RenderWord,
    RenderScores,
    GameStatus,
    UtilityButtons
} from './components';

export const HangmanGame = () => {
    const { currentUser } = useUserContext() || {};
    const { updateWins: contextUpdateWins, updateLosses: contextUpdateLosses } =
        useHangmanContext() || {};

    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);

    const words = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'mango'];
    const maxAttempts = 6;

    const [wordToGuess, setWordToGuess] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<Set<string>>(
        new Set()
    );
    const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
    const [gameStatus, setGameStatus] = useState('playing');

    useBackgroundColorEffect('#hangman-wins', wins, '#56d8ff', '#4B5563');
    useBackgroundColorEffect('#hangman-losses', losses, '#f7a3a3', '#4B5563');

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-[60px] flex items-center justify-center bg-transparent"
        >
            <div className="lg:w-[calc(100%-200px)] bg-[#191920] m-[12px] p-[12px] xl:p-[32px] rounded shadow-md">
                <h1 className="text-[24px] font-bold mb-[16px] text-gray-100">
                    Hangman Game
                </h1>
                <RenderScores wins={wins} losses={losses} />

                <RenderWord
                    wordToGuess={wordToGuess}
                    guessedLetters={guessedLetters}
                    gameStatus={gameStatus}
                />
                <div className="text-lg mb-[16px] text-gray-100">
                    Attempts Left: {attemptsLeft}
                </div>
                <RenderAlphabetButtons
                    gameStatus={gameStatus}
                    guessedLetters={guessedLetters}
                    wordToGuess={wordToGuess}
                    setGuessedLetters={setGuessedLetters}
                    setAttemptsLeft={setAttemptsLeft}
                />
                <GameStatus wordToGuess={wordToGuess} gameStatus={gameStatus} />
                <UtilityButtons
                    gameStatus={gameStatus}
                    words={words}
                    maxAttempts={maxAttempts}
                    setWordToGuess={setWordToGuess}
                    setGuessedLetters={setGuessedLetters}
                    setAttemptsLeft={setAttemptsLeft}
                    setGameStatus={setGameStatus}
                    setLosses={setLosses}
                    setWins={setWins}
                />
            </div>
        </motion.div>
    );
};
