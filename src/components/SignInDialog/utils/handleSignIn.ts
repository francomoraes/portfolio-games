import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase-config';

export const handleSignIn = async (
    email: string,
    password: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    handler: () => void
) => {
    setLoading(true);
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Additional logic if needed
    } catch (error) {
        console.error(error);
    }
    setLoading(false);
    handler();
};
