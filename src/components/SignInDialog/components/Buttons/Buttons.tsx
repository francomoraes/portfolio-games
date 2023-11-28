import { Button } from '@material-tailwind/react';
import { signInWithGoogle } from '../../../../firebase-config';

export const Buttons = ({ handler }: { handler: () => void }) => {
    const handleSignInWithGoogle = () => {
        signInWithGoogle();
        handler();
    };
    return (
        <div className="flex gap-[24px]">
            <Button color="blue" fullWidth onClick={handleSignInWithGoogle}>
                Sign in with google
            </Button>
            <Button className="text-gray-300" fullWidth onClick={handler}>
                Play as guest
            </Button>
        </div>
    );
};
