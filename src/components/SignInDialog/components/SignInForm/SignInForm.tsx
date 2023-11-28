import React from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';
import { SignInFormProps } from './types';

export const SignInForm: React.FC<SignInFormProps> = ({
    onSignIn,
    setSignInEmail,
    setSignInPassword,
    signInEmail,
    signInPassword
}) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSignIn(signInEmail, signInPassword);
    };

    return (
        <form
            className="h-full w-full flex flex-col gap-[32px] my-[32px]"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-[24px]">
                <div>
                    <Typography variant="h6" className="text-gray-300">
                        📧 Email
                    </Typography>
                    <Input
                        className="text-gray-300"
                        color="white"
                        crossOrigin={'anonymous'}
                        onBlur={(e) => setSignInEmail(e.target.value)}
                        placeholder="mail@mail.com"
                        size="md"
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
            <Button color="blue-gray" type="submit">
                Sign in
            </Button>
        </form>
    );
};
