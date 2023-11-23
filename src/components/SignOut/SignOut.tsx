import { Button } from '@material-tailwind/react';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';

export const SignOut = ({ className }: { className?: string }) => {
    const logout = async () => {
        await signOut(auth);
    };
    return (
        <Button color="blue-gray" onClick={logout} className={className}>
            SignOut
        </Button>
    );
};
