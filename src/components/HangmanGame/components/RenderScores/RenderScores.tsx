import { useHangmanContext } from '../../../../contexts/hangmanContext';
import { useUserContext } from '../../../../contexts/userContext';
import { RenderScoresProps } from './types';

export const RenderScores: React.FC<RenderScoresProps> = ({ wins, losses }) => {
    const { currentUser } = useUserContext() || {};
    const { wins: contextWins, losses: contextLosses } =
        useHangmanContext() || {};
    const spanStyle =
        'grid-span-row-1 grid-span-col-1 bg-gray-600 p-[4px] rounded-lg text-center font-semibold transition-all text-gray-200';

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

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-[8px] justify-between w-full">
            <span className={spanStyle} id="hangman-wins">
                Wins: {currentUser ? contextWins : wins}
            </span>
            <span className={spanStyle} id="hangman-losses">
                Losses: {currentUser ? contextLosses : losses}
            </span>
            <span className={spanStyle} id="hangman-total-games">
                Total Games:{' '}
                {currentUser ? contextLosses + contextWins : wins + losses}
            </span>
            <span className={spanStyle} id="hangman-ratio">
                Win Ratio: {winRatio()}%
            </span>
        </div>
    );
};
