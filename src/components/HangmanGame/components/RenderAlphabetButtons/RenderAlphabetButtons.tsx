import React from 'react';
import { RenderAlphabetButtonsProps } from './types';
import { AlphabetButtons } from './components';

export const RenderAlphabetButtons: React.FC<RenderAlphabetButtonsProps> = ({
    gameState,
    setGameState
}) => {
    return (
        <>
            <div className="text-lg mb-[16px] text-gray-100">
                Attempts Left: {gameState?.attemptsLeft}
            </div>
            <div className="flex flex-col items-center mb-[16px]">
                <div className="my-[3px] flex gap-[4px]">
                    <AlphabetButtons
                        string={'qwertyuiop'}
                        gameState={gameState}
                        setGameState={setGameState}
                    />
                </div>
                <div className="my-[3px] flex gap-[4px]">
                    <AlphabetButtons
                        string={'asdfghjkl'}
                        gameState={gameState}
                        setGameState={setGameState}
                    />
                </div>
                <div className="my-[3px] flex gap-[4px]">
                    <AlphabetButtons
                        string={'zxcvbnm'}
                        gameState={gameState}
                        setGameState={setGameState}
                    />
                    <div className="w-[30px] lg:w-[40px]"></div>
                </div>
            </div>
        </>
    );
};
