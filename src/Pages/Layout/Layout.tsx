import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CustomDialog, SignUpDialog, StandardNavbar } from '../../components';
import { useUserContext } from '../../contexts/userContext';
import { SignInDialog } from '../../components/SignInDialog';

const Layout = () => {
    const { currentUser }: any = useUserContext() || {};
    const [showSignUpDialog, setShowSignUpDialog] = useState<boolean>(false);
    const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);

    const handleSignUpDialog = () => setShowSignUpDialog(!showSignUpDialog);
    const handleLoginDialog = () => setShowLoginDialog(!showLoginDialog);

    const handleSignInClick = () => {
        setShowLoginDialog(true);
        setShowSignUpDialog(false);
    };

    const handleSignUpClick = () => {
        setShowLoginDialog(false);
        setShowSignUpDialog(true);
    };

    useEffect(() => {
        if (!currentUser) setShowSignUpDialog(true);
    }, [currentUser]);

    return (
        <>
            <CustomDialog open={showSignUpDialog} handler={handleSignUpDialog}>
                <SignUpDialog
                    handler={handleSignUpDialog}
                    onSignInClick={handleSignInClick}
                />
            </CustomDialog>
            <CustomDialog open={showLoginDialog} handler={handleLoginDialog}>
                <SignInDialog
                    handler={handleLoginDialog}
                    onSignUpClick={handleSignUpClick}
                />
            </CustomDialog>
            <div className="max-w-[1360px] mx-auto bg-gray-800 relative">
                <button onClick={handleSignUpDialog}>Open</button>
                <StandardNavbar />
                <div className="outlet-container absolute inset-0 top-[60px]">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;
