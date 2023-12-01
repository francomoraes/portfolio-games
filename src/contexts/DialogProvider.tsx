import React, { createContext, useState } from 'react';

type DialogContextType = {
    showSignUpDialog: boolean;
    setShowSignUpDialog: React.Dispatch<React.SetStateAction<boolean>>;
    showSignInDialog: boolean;
    setShowSignInDialog: React.Dispatch<React.SetStateAction<boolean>>;
    handleSignUpDialog: (value?: boolean) => void;
    handleSignInDialog: (value?: boolean) => void;
    handleSignInClick: () => void;
    handleSignUpClick: () => void;
};

export const DialogContext = createContext<DialogContextType>({
    showSignUpDialog: false,
    setShowSignUpDialog: () => {},
    showSignInDialog: false,
    setShowSignInDialog: () => {},
    handleSignUpDialog: () => {},
    handleSignInDialog: () => {},
    handleSignInClick: () => {},
    handleSignUpClick: () => {}
});

interface DialogProviderProps {
    children: React.ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
    const [showSignUpDialog, setShowSignUpDialog] = useState(false);
    const [showSignInDialog, setShowSignInDialog] = useState(false);

    const handleSignUpDialog = (value?: boolean) =>
        setShowSignUpDialog(value || !showSignUpDialog);
    const handleSignInDialog = (value?: boolean) =>
        setShowSignInDialog(value || !showSignInDialog);

    const handleSignInClick = () => {
        setShowSignInDialog(true);
        setShowSignUpDialog(false);
    };

    const handleSignUpClick = () => {
        setShowSignInDialog(false);
        setShowSignUpDialog(true);
    };

    return (
        <DialogContext.Provider
            value={{
                showSignUpDialog,
                setShowSignUpDialog,
                showSignInDialog,
                setShowSignInDialog,
                handleSignUpDialog,
                handleSignInDialog,
                handleSignInClick,
                handleSignUpClick
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export const useDialogContext = (): DialogContextType => {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error(
            'useDialogContext must be used within a DialogProvider'
        );
    }
    return context;
};
