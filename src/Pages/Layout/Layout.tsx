import { Outlet } from 'react-router-dom';
import { StandardNavbar } from '../../components/StandardNavbar';

const Layout = () => {
    return (
        <div className="max-w-[1360px] mx-auto bg-gray-800 relative">
            <StandardNavbar />
            <div className="outlet-container absolute inset-0 top-[60px]">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
