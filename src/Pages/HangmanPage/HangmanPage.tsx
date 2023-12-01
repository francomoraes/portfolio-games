import { HangmanGame } from '../../components';
import { FruitsProvider } from '../../components/HangmanGame/contexts/FruitsContext';
import { HangmanProvider } from '../../contexts/hangmanContext';

const HangmanPage = () => {
    return (
        <HangmanProvider>
            <FruitsProvider>
                <HangmanGame />
            </FruitsProvider>
        </HangmanProvider>
    );
};

export default HangmanPage;
