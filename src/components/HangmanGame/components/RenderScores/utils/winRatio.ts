import { useHangmanContext } from '../../../../../contexts/hangmanContext';
import { useUserContext } from '../../../../../contexts/userContext';

export const winRatio = () => {
    const { currentUser } = useUserContext();
    const { localWins, localLosses, wins, losses } = useHangmanContext();
    const localTempWinRatio = Number(
        ((localWins * 100) / (localWins + localLosses)).toFixed(1)
    );
    const contextTempWinRatio = Number(
        ((wins * 100) / (wins + losses)).toFixed(1)
    );
    const tempWinRatio = currentUser ? contextTempWinRatio : localTempWinRatio;
    return tempWinRatio || 0;
};
