import { Outlet } from 'react-router-dom';
import { StandardNavbar } from '../../components/StandardNavbar';

const Layout = () => {
    return (
        <div className="max-w-[1360px] mx-auto bg-gray-800 h-full">
            <StandardNavbar />
            <Outlet />
        </div>
    );
};

export default Layout;
