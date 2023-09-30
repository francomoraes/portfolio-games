import { Outlet } from 'react-router-dom';
import { StandardNavbar } from '../../components/StandardNavbar';

const Layout = () => {
    return (
        <div>
            <p>Layout</p>
            <StandardNavbar />
            <Outlet />
        </div>
    );
};

export default Layout;
