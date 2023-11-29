import { motion, AnimatePresence } from 'framer-motion';
import { GameStatusProps } from './types';

export const GameStatus: React.FC<GameStatusProps> = ({
    wordToGuess,
    gameStatus
}) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0 }}
                className="mt-[16px] h-[24px]"
            >
                {gameStatus === 'won' && (
                    <p className="text-green-500">Congratulations! You won!</p>
                )}
                {gameStatus === 'lost' && (
                    <p className="text-red-600">
                        Oops! You lost. The word was {wordToGuess}
                    </p>
                )}
            </motion.div>
        </AnimatePresence>
    );
};
