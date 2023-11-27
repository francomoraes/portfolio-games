import { IconButton, Navbar } from '@material-tailwind/react';
import { NavLinks, SignOut } from '..';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { useUserContext } from '../../contexts/userContext';

export const StandardNavbar = ({
    onStateChange
}: {
    onStateChange: () => void;
}) => {
    const { setOpen } = useDrawerContext();
    const { currentUser } = useUserContext();

    const email = currentUser?.email;

    return (
        <Navbar
            className={`!max-w-full flex items-center rounded-t-none sticky top-0 z-40`}
        >
            <IconButton variant="text" onClick={() => setOpen(true)}>
                <i className="fa-solid fa-bars fa-xl"></i>
            </IconButton>
            <div className="hidden xl:flex items-center">
                <NavLinks />
            </div>
            <div className="flex-grow"></div>
            <div className="hidden lg:flex gap-[32px]">
                <div className="hidden lg:flex flex-col items-end">
                    <p className="text-gray-500 font-semibold text-right">
                        Hello, {email ? email.split('@')[0] : 'Guest'}
                    </p>
                    {!email && (
                        <button
                            className="underline text-gray-500 font-semibold text-right animate-bounce py-[2px] px-[8px] rounded-[6px] hover:bg-gray-200 transition-all w-fit"
                            onClick={() => onStateChange()}
                        >
                            Sign in
                        </button>
                    )}
                </div>
                <SignOut />
            </div>
        </Navbar>
    );
};
