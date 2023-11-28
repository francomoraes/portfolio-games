import {
    Button,
    IconButton,
    Input,
    Typography
} from '@material-tailwind/react';
import { useState } from 'react';
import { auth, signInWithGoogle } from '../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const SignUpDialog = ({
    handler,
    onSignInClick
}: {
    handler: () => void;
    onSignInClick: () => void;
}) => {
    const [registerEmail, setRegisterEmail] = useState<string>('');
    const [registerPassword, setRegisterPassword] = useState<string>('');

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegister = () => {
        register();
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
                Feel free to sign up or play as a guest 😊
            </Typography>
            <div className="flex items-center">
                <Typography className="text-gray-300" variant="small">
                    Already have an account?
                    <i className="fa-solid fa-arrow-right mx-[6px]" />
                </Typography>
                <Button
                    variant="text"
                    className="p-0 text-blue-300"
                    onClick={onSignInClick}
                >
                    Sign in
                </Button>
            </div>
            <form className="h-full w-full flex flex-col gap-[12px] my-[12px]">
                <div className="flex flex-col gap-[16px]">
                    <div>
                        <Typography variant="h6" className="text-gray-300">
                            📧 Your email
                        </Typography>
                        <Input
                            className="text-gray-300"
                            color="white"
                            crossOrigin={'anonymous'}
                            onBlur={(e) => setRegisterEmail(e.target.value)}
                            placeholder="mail@mail.com"
                            size="md"
                        />
                    </div>
                    <div>
                        <Typography variant="h6" className="text-gray-300">
                            🔒 Your password
                        </Typography>
                        <Input
                            className="text-gray-300"
                            color="white"
                            crossOrigin={'anonymous'}
                            onChange={(e) =>
                                setRegisterPassword(e.target.value)
                            }
                            placeholder="********"
                            size="md"
                            type="password"
                        />
                    </div>
                </div>
                <Button color="blue-gray" onClick={handleRegister}>
                    Sign up
                </Button>
            </form>
            <div className="flex gap-[12px]">
                <Button color="blue" fullWidth onClick={handleSignInWithGoogle}>
                    Sign in with google
                </Button>
                <Button className="text-gray-300" fullWidth onClick={handler}>
                    Play as guest
                </Button>
            </div>
        </div>
    );
};
