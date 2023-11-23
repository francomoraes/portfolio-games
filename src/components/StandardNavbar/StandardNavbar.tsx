import { IconButton, Navbar } from '@material-tailwind/react';
import { NavLinks, SignOut } from '..';
import { useDrawerContext } from '../../contexts/DrawerContext';

export const StandardNavbar = () => {
    const { setOpen } = useDrawerContext();
    return (
        <Navbar
            className={`!max-w-full flex items-center rounded-t-none sticky top-0 z-40`}
        >
            <IconButton variant="text" onClick={() => setOpen(true)}>
                <i className="fa-solid fa-bars fa-xl"></i>
            </IconButton>
            <div className="hidden xl:flex items-center w-full">
                <NavLinks />
            </div>
            <SignOut className="hidden lg:flex" />
        </Navbar>
    );
};
