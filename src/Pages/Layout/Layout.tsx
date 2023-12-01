import { Outlet } from 'react-router-dom';
import { CustomDrawer, StandardNavbar } from '../../components';

import { useDrawerContext } from '../../contexts/DrawerContext';
import { SignInDialogWrapper, SignUpDialogWrapper } from './components';

const Layout = () => {
    const { open, setOpen } = useDrawerContext();

    return (
        <div className="layout w-full h-full">
            <SignUpDialogWrapper />
            <SignInDialogWrapper />
            <StandardNavbar />
            <div className="max-w-[1360px] w-full h-full py-[50px] px-[200px] relative">
                <Outlet />
            </div>
            <CustomDrawer open={open} setOpen={setOpen} />
        </div>
    );
};

export default Layout;
