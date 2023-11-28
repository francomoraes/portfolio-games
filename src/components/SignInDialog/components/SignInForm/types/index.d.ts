import React from 'react';

export interface SignInFormProps {
    onSignIn: (email: string, password: string) => Promise<void>;
    signInEmail: string;
    signInPassword: string;
    setSignInEmail: React.Dispatch<React.SetStateAction<string>>;
    setSignInPassword: React.Dispatch<React.SetStateAction<string>>;
}
