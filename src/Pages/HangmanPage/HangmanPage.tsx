import { HangmanGame } from '../../components';
import { FruitsProvider } from '../../components/HangmanGame/contexts/FruitsContext';
import { HangmanProvider } from '../../contexts/hangmanContext';
import { useUserContext } from '../../contexts/userContext';

const HangmanPage = () => {
    const { currentUser } = useUserContext();
    return (
        <HangmanProvider currentUser={currentUser}>
            <FruitsProvider>
                <HangmanGame />
            </FruitsProvider>
        </HangmanProvider>
    );
};

export default HangmanPage;
