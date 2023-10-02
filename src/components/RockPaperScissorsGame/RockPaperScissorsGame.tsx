import { useEffect, useState } from 'react';
import { useBackgroundColorEffect } from '../../hooks/useBackgroundColorEffect';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';
import { RiRestartLine } from 'react-icons/ri';

const RockPaperScissors = () => {
    const [playerScore, setPlayerScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);
    const [draw, setDraw] = useState<number>(0);
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');

    useBackgroundColorEffect('#playerScore', playerScore, '#00f', '#E5E7EB');
    useBackgroundColorEffect(
        '#computerScore',
        computerScore,
        '#f00',
        '#E5E7EB'
    );
    useBackgroundColorEffect('#drawScore', draw, '#fffb00', '#E5E7EB');
    useBackgroundColorEffect(
        '#playerChoice',
        playerChoice,
        '#8f8f8f',
        '#E5E7EB'
    );
    useBackgroundColorEffect(
        '#computerChoice',
        computerChoice,
        '#8f8f8f',
        '#E5E7EB'
    );

    useEffect(() => {
        const gameDataRockPaperScissors = localStorage.getItem(
            'gameDataRockPaperScissors'
        );
        if (gameDataRockPaperScissors) {
            const { playerScore, computerScore, draw } = JSON.parse(
                gameDataRockPaperScissors
            );
            setPlayerScore(playerScore);
            setComputerScore(computerScore);
            setDraw(draw);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            'gameDataRockPaperScissors',
            JSON.stringify({ playerScore, computerScore, draw })
        );
    }, [playerScore, computerScore, draw]);

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
            setPlayerScore((prevScore) => prevScore + 1);
        } else if (outcomes[buttonContent][computerChoice] === 'computer') {
            setComputerScore((prevScore) => prevScore + 1);
        } else {
            setDraw((prevScore) => prevScore + 1);
        }
    };

    const resetScores = () => {
        setPlayerScore(0);
        setComputerScore(0);
        setDraw(0);
    };

    const spanStyle =
        'grid-span-row-1 grid-span-col-1 bg-gray-200 p-[8px] rounded-lg text-center font-medium min-h-[88px] flex items-center justify-center text-[12px] hd:text-[24px]';
    const buttonStyle =
        'text-2xl my-[8px] hd:my-0 p-[16px] rounded-lg bg-gray-300 hover:bg-gray-400 active:scale-95 transition duration-250 w-full flex items-center justify-center text-[12px] hd:text-[24px] grid-span-col-1 grid-span-row-1';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="hd:w-[calc(100%-200px)] bg-white m-[12px] p-[12px] hd:p-[32px] rounded shadow-md">
                <h1 className="text-[24px] font-bold my-[16px]">
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
                <div className="w-full grid hd:grid-cols-2 hd:grid-rows-2 hd:gap-[16px]">
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
        </div>
    );
};

export default RockPaperScissors;
