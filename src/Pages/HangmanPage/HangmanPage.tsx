import { HangmanGame } from '../../components';
import { HangmanProvider } from '../../contexts/hangmanContext';
import { useUserContext } from '../../contexts/userContext';

const HangmanPage = () => {
    const { currentUser } = useUserContext();
    return (
        <div>
            <HangmanProvider currentUser={currentUser}>
                <HangmanGame />
            </HangmanProvider>
        </div>
    );
};

export default HangmanPage;
