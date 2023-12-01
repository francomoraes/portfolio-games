import { IconButton, Navbar } from '@material-tailwind/react';
import { NavLinks, SignOut } from '..';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { useUserContext } from '../../contexts/userContext';
import { capitalize } from '../utils';
import { useDialogContext } from '../../contexts/DialogProvider';

export const StandardNavbar = () => {
    const { setOpen } = useDrawerContext();
    const { currentUser } = useUserContext();
    const { handleSignUpDialog } = useDialogContext();

    const email = currentUser?.email;

    return (
        <Navbar
            color="transparent"
            className={`!max-w-full flex items-center rounded-t-none sticky top-0 z-40 border-b-[1px] border-gray-700 bg-gray-950`}
        >
            <IconButton variant="text" onClick={() => setOpen(true)}>
                <i className="fa-solid fa-bars fa-xl text-gray-200"></i>
            </IconButton>
            <div className="hidden xl:flex items-center">
                <NavLinks />
            </div>
            <div className="flex-grow"></div>
            <div className="hidden lg:flex gap-[32px]">
                <div className="hidden lg:flex flex-col items-end">
                    <p className="text-gray-500 font-semibold text-right">
                        Hello,{' '}
                        {email
                            ? capitalize(email.split('@')[0]) + ' !'
                            : 'Guest'}
                    </p>
                    {!email && (
                        <button
                            className="underline text-gray-500 font-semibold text-right animate-bounce py-[2px] px-[8px] rounded-[6px] hover:bg-gray-200 transition-all w-fit"
                            onClick={() => handleSignUpDialog(true)}
                        >
                            Sign up!
                        </button>
                    )}
                </div>
                <SignOut />
            </div>
        </Navbar>
    );
};
