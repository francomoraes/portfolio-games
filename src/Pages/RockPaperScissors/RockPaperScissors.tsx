import { RockPaperScissorsGame } from '../../components';
import { RockPaperScissorsProvider } from '../../contexts/rockPaperScissorsContext';

const RockPaperScissors = () => {
    return (
        <RockPaperScissorsProvider>
            <RockPaperScissorsGame />
        </RockPaperScissorsProvider>
    );
};

export default RockPaperScissors;
