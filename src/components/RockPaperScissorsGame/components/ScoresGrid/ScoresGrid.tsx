import { useRockPaperScissorsContext } from '../../../../contexts/rockPaperScissorsContext';
import { useUserContext } from '../../../../contexts/userContext';

export const ScoresGrid = () => {
    const { currentUser } = useUserContext();
    const { remoteScores, localScores, playerChoice, computerChoice } =
        useRockPaperScissorsContext();
    const { playerScore, draws, computerScore } = localScores || {};
    const {
        playerScore: remotePlayerScore,
        draws: remoteDraws,
        computerScore: remoteComputerScore
    } = remoteScores || {};

    const spanStyle =
        'grid-span-row-1 grid-span-col-1 bg-gray-200 p-[8px] rounded-lg text-center font-medium min-h-[88px] flex items-center justify-center text-[12px] xl:text-[24px]';

    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-[8px] w-full my-[16px]">
            <span className={spanStyle} id="playerScore">
                Player Score: {currentUser ? remotePlayerScore : playerScore}
            </span>
            <span className={spanStyle} id="drawScore">
                Draw: {currentUser ? remoteDraws : draws}
            </span>
            <span className={spanStyle} id="computerScore">
                Computer Score:{' '}
                {currentUser ? remoteComputerScore : computerScore}
            </span>
            <span className={spanStyle} id="playerChoice">
                Player Choice: {playerChoice}
            </span>
            <span className={spanStyle}>X</span>
            <span className={spanStyle} id="computerChoice">
                Computer Choice: {computerChoice}
            </span>
        </div>
    );
};
