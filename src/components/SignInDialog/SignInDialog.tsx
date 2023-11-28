import { Spinner } from '@material-tailwind/react';
import { useState } from 'react';

import { Buttons, Footer, SignInForm, SignInHeader } from './components';

import { handleSignIn } from './utils';
import { SignInDialogProps } from './types';

export const SignInDialog: React.FC<SignInDialogProps> = ({
    handler,
    onSignUpClick
}) => {
    const [signInEmail, setSignInEmail] = useState<string>('');
    const [signInPassword, setSignInPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleHandleSignIn = () =>
        handleSignIn(signInEmail, signInPassword, setLoading, handler);

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center w-[430px] h-[430px]">
                <Spinner color="blue" />
            </div>
        );

    return (
        <div className="relative">
            <SignInHeader handler={handler} />
            <SignInForm
                onSignIn={handleHandleSignIn}
                setSignInEmail={setSignInEmail}
                setSignInPassword={setSignInPassword}
                signInEmail={signInEmail}
                signInPassword={signInPassword}
            />
            <Buttons handler={handler} />
            <Footer onSignUpClick={onSignUpClick} />
        </div>
    );
};
