import { CustomDialog, SignInDialog } from '../../../../components';
import { useDialogContext } from '../../../../contexts/DialogProvider';

export const SignInDialogWrapper = () => {
    const { showSignInDialog, handleSignInDialog, handleSignUpClick } =
        useDialogContext();
    return (
        <CustomDialog
            open={showSignInDialog}
            handler={() => handleSignInDialog(false)}
        >
            <SignInDialog
                handler={() => handleSignInDialog(false)}
                onSignUpClick={handleSignUpClick}
            />
        </CustomDialog>
    );
};
