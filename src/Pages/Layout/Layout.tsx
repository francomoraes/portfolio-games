import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    CustomDialog,
    CustomDrawer,
    SignUpDialog,
    StandardNavbar
} from '../../components';
import { useUserContext } from '../../contexts/userContext';
import { SignInDialog } from '../../components/SignInDialog';
import { useDrawerContext } from '../../contexts/DrawerContext';

const Layout = () => {
    const { currentUser }: any = useUserContext() || {};
    const { open, setOpen } = useDrawerContext();
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
        if (currentUser) setShowSignUpDialog(false);
    }, [currentUser]);

    return (
        <div className="layout w-full">
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
            <div className="max-w-[1360px] w-full mx-auto bg-gray-800 relative">
                <StandardNavbar onStateChange={handleSignUpDialog} />
                <Outlet />
                <CustomDrawer open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default Layout;
