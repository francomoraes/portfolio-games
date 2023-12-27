import { ButtonsGrid, ScoresGrid } from './components';

export const RockPaperScissorsGame = () => {
    return (
        <div className="w-full h-full bg-[#191920] p-[12px] xl:p-[32px] rounded shadow-md">
            <h1 className="text-[24px] font-bold my-[16px] text-gray-200">
                Rock, Paper, Scissors
            </h1>
            <ScoresGrid />
            <ButtonsGrid />
        </div>
    );
};
