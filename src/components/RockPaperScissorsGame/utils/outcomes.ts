import { Outcomes } from '../types';

export const outcomes: Outcomes = {
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
