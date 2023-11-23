import {
    Button,
    IconButton,
    Input,
    Typography
} from '@material-tailwind/react';
import { auth, signInWithGoogle } from '../../firebase-config';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export const SignInDialog = ({
    handler,
    onSignUpClick
}: {
    handler: () => void;
    onSignUpClick: () => void;
}) => {
    const [signInEmail, setSignInEmail] = useState<string>('');
    const [signInPassword, setSignInPassword] = useState<string>('');

    const { currentUser, setCurrentUser } = useUserContext();

    console.log(currentUser);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
    }, [auth.currentUser]);

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignIn = () => {
        signIn();
        handler();
    };

    const handleSignInWithGoogle = () => {
        signInWithGoogle();
        handler();
    };

    return (
        <div className="relative">
            <IconButton
                size="sm"
                variant="outlined"
                className="!absolute right-[12px] top-[12px] text-gray-300 hover:bg-gray-700"
                onClick={handler}
            >
                <i className="fa-solid fa-xmark fa-lg" />
            </IconButton>
            <Typography variant="h5" className="text-gray-300">
                Welcome!
            </Typography>
            <Typography className="text-gray-300" variant="small">
                Nice to see you again! 😊
            </Typography>
            <form className="h-full w-full flex flex-col gap-[32px] my-[32px]">
                <div className="flex flex-col gap-[24px]">
                    <div>
                        <Typography variant="h6" className="text-gray-300">
                            📧 Email
                        </Typography>
                        <Input
                            size="md"
                            placeholder="mail@mail.com"
                            crossOrigin={'anonymous'}
                            onBlur={(e) => setSignInEmail(e.target.value)}
                            className="text-gray-300"
                            color="white"
                        />
                    </div>
                    <div>
                        <Typography variant="h6" className="text-gray-300">
                            🔒 Password
                        </Typography>
                        <Input
                            size="md"
                            placeholder="********"
                            type="password"
                            crossOrigin={'anonymous'}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            color="white"
                            className="text-gray-300"
                        />
                    </div>
                </div>
                <Button color="blue-gray" onClick={handleSignIn}>
                    Sign in
                </Button>
            </form>
            <div className="flex gap-[24px]">
                <Button color="blue" fullWidth onClick={handleSignInWithGoogle}>
                    Sign in with google
                </Button>
                <Button className="text-gray-300" fullWidth onClick={handler}>
                    Play as guest
                </Button>
            </div>
            <div className="flex items-center mt-[24px]">
                <Typography className="text-gray-300" variant="small">
                    Don't have an account?
                    <i className="fa-solid fa-arrow-right mx-[6px]" />
                </Typography>
                <Button
                    variant="text"
                    className="p-0 text-blue-300"
                    onClick={onSignUpClick}
                >
                    Sign up
                </Button>
            </div>
        </div>
    );
};
