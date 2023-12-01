import { useState, useMemo } from 'react';
import { useHangmanContext } from '../../contexts/hangmanContext';
import { motion } from 'framer-motion';
import {
    RenderAlphabetButtons,
    RenderWord,
    RenderScores,
    GameStatus,
    UtilityButtons
} from './components';
import { useGameStatus, useWordToGuess } from './hooks';
import { useClassListEffect } from '../../hooks/useClassListEffect';
import { useFruitsContext } from './contexts/FruitsContext';

export const HangmanGame = () => {
    const { localLosses, localWins } = useHangmanContext();

    const { fruits } = useFruitsContext();
    const words = useMemo(
        () => fruits.map((fruit) => fruit.name.toLowerCase()),
        [fruits]
    );

    const maxAttempts = 6;

    const [gameState, setGameState] = useState({
        wordToGuess: '',
        guessedLetters: new Set(''),
        attemptsLeft: 6,
        gameStatus: 'playing'
    });

    useClassListEffect(
        '#hangman-wins',
        localWins,
        'bg-[#56d8ff]',
        'bg-[#4B5563]'
    );
    useClassListEffect(
        '#hangman-losses',
        localLosses,
        'bg-[#f7a3a3]',
        'bg-[#4B5563]'
    );

    useWordToGuess(words, setGameState);
    useGameStatus(gameState, setGameState);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full bg-[#191920] p-[12px] xl:p-[32px] rounded shadow-md"
        >
            <RenderScores />
            <RenderWord gameState={gameState} />
            <RenderAlphabetButtons
                gameState={gameState}
                setGameState={setGameState}
            />
            <GameStatus gameState={gameState} />
            <UtilityButtons
                gameState={gameState}
                maxAttempts={maxAttempts}
                setGameState={setGameState}
                words={words}
            />
        </motion.div>
    );
};
