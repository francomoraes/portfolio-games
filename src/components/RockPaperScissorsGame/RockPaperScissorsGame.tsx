import { useState } from 'react';
import { useClassListEffect } from '../../hooks/useClassListEffect';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';
import { RiRestartLine } from 'react-icons/ri';
import { useRockPaperScissorsContext } from '../../contexts/rockPaperScissorsContext';

export const RockPaperScissorsGame = () => {
    const {
        remoteScores,
        setRemoteScores,
        localScores,
        setLocalScores,
        incrementLocalPlayerScore,
        incrementLocalComputerScore,
        incrementLocalDraw,
        resetLocalScores,
        updateLocalStorage
    } = useRockPaperScissorsContext();
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');

    const { playerScore, computerScore, draw } = localScores || {};

    useClassListEffect(
        '#playerScore',
        playerScore,
        'bg-[#0000ff]',
        'bg-[#E5E7EB]'
    );
    useClassListEffect(
        '#computerScore',
        computerScore,
        'bg-[#ff9090]',
        'bg-[#E5E7EB]'
    );
    useClassListEffect('#drawScore', draw, 'bg-[#fffb00]', 'bg-[#E5E7EB]');
    useClassListEffect(
        '#playerChoice',
        playerChoice,
        'bg-[#8f8f8f]',
        'bg-[#E5E7EB]'
    );
    useClassListEffect(
        '#computerChoice',
        computerChoice,
        'bg-[#8f8f8f]',
        'bg-[#E5E7EB]'
    );

    interface Outcomes {
        [key: string]: {
            [key: string]: string;
        };
    }

    const playGame = (buttonContent: string) => {
        const choices = ['rock', 'paper', 'scissors'];
        const randomChoice = Math.floor(Math.random() * choices.length);
        const computerChoice = choices[randomChoice];

        setPlayerChoice(buttonContent);
        setComputerChoice(computerChoice);

        const outcomes: Outcomes = {
            rock: {
                rock: 'draw',
                paper: 'computer',
                scissors: 'player'
            },
            paper: {
                rock: 'player',
                paper: 'draw',
                scissors: 'computer'
            },
            scissors: {
                rock: 'computer',
                paper: 'player',
                scissors: 'draw'
            }
        };

        if (outcomes[buttonContent][computerChoice] === 'player') {
            incrementLocalPlayerScore();
        } else if (outcomes[buttonContent][computerChoice] === 'computer') {
            incrementLocalComputerScore();
        } else {
            incrementLocalDraw();
        }
    };

    const resetScores = () => {
        resetLocalScores();
        setRemoteScores({ playerScore: 0, computerScore: 0, draw: 0 });
    };

    const spanStyle =
        'grid-span-row-1 grid-span-col-1 bg-gray-200 p-[8px] rounded-lg text-center font-medium min-h-[88px] flex items-center justify-center text-[12px] xl:text-[24px]';
    const buttonStyle =
        'text-2xl my-[8px] xl:my-0 p-[16px] rounded-lg bg-gray-300 hover:bg-gray-400 active:scale-95 transition duration-250 w-full flex items-center justify-center text-[12px] xl:text-[24px] grid-span-col-1 grid-span-row-1';

    return (
        <div className="w-full h-full bg-[#191920] p-[12px] xl:p-[32px] rounded shadow-md">
            <h1 className="text-[24px] font-bold my-[16px] text-gray-200">
                Rock, Paper, Scissors
            </h1>
            <div className="grid grid-cols-3 grid-rows-2 gap-[8px] w-full my-[16px]">
                <span className={spanStyle} id="playerScore">
                    Player Score: {playerScore}
                </span>
                <span className={spanStyle} id="drawScore">
                    Draw: {draw}
                </span>
                <span className={spanStyle} id="computerScore">
                    Computer Score: {computerScore}
                </span>
                <span className={spanStyle} id="playerChoice">
                    Player Choice: {playerChoice}
                </span>
                <span className={spanStyle}>X</span>
                <span className={spanStyle} id="computerChoice">
                    Computer Choice: {computerChoice}
                </span>
            </div>
            <div className="w-full grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-[16px]">
                <button
                    className={buttonStyle}
                    onClick={() => playGame('rock')}
                >
                    <p className="mr-[12px]">Rock</p>
                    <FaHandRock />
                </button>
                <button
                    className={buttonStyle}
                    onClick={() => playGame('paper')}
                >
                    <p className="mr-[12px]">Paper</p>
                    <FaHandPaper />
                </button>
                <button
                    className={buttonStyle}
                    onClick={() => playGame('scissors')}
                >
                    <p className="mr-[12px]">Scissors</p>
                    <FaHandScissors />
                </button>
                <button className={buttonStyle} onClick={resetScores}>
                    <p className="mr-[12px]">Reset Scores</p>
                    <RiRestartLine />
                </button>
            </div>
        </div>
    );
};
1;
