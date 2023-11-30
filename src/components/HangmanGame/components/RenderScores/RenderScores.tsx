import { useHangmanContext } from '../../../../contexts/hangmanContext';
import { useUserContext } from '../../../../contexts/userContext';
import { winRatio } from './utils';

export const RenderScores = () => {
    const { currentUser } = useUserContext() || {};
    const {
        wins: contextWins,
        losses: contextLosses,
        localWins,
        localLosses
    } = useHangmanContext() || {};
    const spanStyle =
        'grid-span-row-1 grid-span-col-1 bg-gray-600 p-[4px] rounded-lg text-center font-semibold transition-all text-gray-200';

    return (
        <>
            <h1 className="text-[24px] font-bold mb-[16px] text-gray-100">
                Hangman Game
            </h1>
            <div className="grid grid-cols-2 grid-rows-2 gap-[8px] justify-between w-full">
                <span className={spanStyle} id="hangman-wins">
                    Wins: {currentUser ? contextWins : localWins}
                </span>
                <span className={spanStyle} id="hangman-losses">
                    Losses: {currentUser ? contextLosses : localLosses}
                </span>
                <span className={spanStyle} id="hangman-total-games">
                    Total Games:{' '}
                    {currentUser
                        ? contextLosses + contextWins
                        : localWins + localLosses}
                </span>
                <span className={spanStyle} id="hangman-ratio">
                    Win Ratio: {winRatio()}%
                </span>
            </div>
        </>
    );
};
