import { FaHandPaper, FaHandRock, FaHandScissors } from 'react-icons/fa';
import { RiRestartLine } from 'react-icons/ri';
import { outcomes } from '../../utils';
import { useRockPaperScissorsContext } from '../../../../contexts/rockPaperScissorsContext';

export const ButtonsGrid = () => {
    const { playGame, resetScores } = useRockPaperScissorsContext();

    const buttonStyle =
        'text-2xl my-[8px] xl:my-0 p-[16px] rounded-lg bg-gray-300 hover:bg-gray-400 active:scale-95 transition duration-250 w-full flex items-center justify-center text-[12px] xl:text-[24px] grid-span-col-1 grid-span-row-1';

    return (
        <div className="w-full grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-[16px]">
            <button
                className={buttonStyle}
                onClick={() => playGame(outcomes, 'rock')}
            >
                <p className="mr-[12px]">Rock</p>
                <FaHandRock />
            </button>
            <button
                className={buttonStyle}
                onClick={() => playGame(outcomes, 'paper')}
            >
                <p className="mr-[12px]">Paper</p>
                <FaHandPaper />
            </button>
            <button
                className={buttonStyle}
                onClick={() => playGame(outcomes, 'scissors')}
            >
                <p className="mr-[12px]">Scissors</p>
                <FaHandScissors />
            </button>
            <button className={buttonStyle} onClick={resetScores}>
                <p className="mr-[12px]">Reset Scores</p>
                <RiRestartLine />
            </button>
        </div>
    );
};
