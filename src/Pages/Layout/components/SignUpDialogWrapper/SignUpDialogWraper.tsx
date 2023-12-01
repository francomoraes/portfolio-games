import { useEffect } from 'react';
import { CustomDialog, SignUpDialog } from '../../../../components';
import { useDialogContext } from '../../../../contexts/DialogProvider';
import { useUserContext } from '../../../../contexts/userContext';

export const SignUpDialogWrapper = () => {
    const { showSignUpDialog, handleSignUpDialog, handleSignInClick } =
        useDialogContext();

    const { currentUser } = useUserContext() || {};

    useEffect(() => {
        if (!currentUser) handleSignUpDialog(true);
        if (currentUser) handleSignUpDialog(false);
    }, [currentUser]);

    return (
        <CustomDialog
            open={showSignUpDialog}
            handler={() => handleSignUpDialog(false)}
        >
            <SignUpDialog
                handler={() => handleSignUpDialog(false)}
                onSignInClick={handleSignInClick}
            />
        </CustomDialog>
    );
};
