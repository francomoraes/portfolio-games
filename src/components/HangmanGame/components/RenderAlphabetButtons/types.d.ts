import { IGameState } from '../GameStatus/types';

export interface RenderAlphabetButtonsProps {
    gameState: IGameState;
    setGameState: React.Dispatch<React.SetStateAction<IGameState>>;
}
