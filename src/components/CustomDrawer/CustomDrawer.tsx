import { Drawer } from '@material-tailwind/react';
import { NavLinks } from '../NavLinks';

interface CustomDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
    open,
    setOpen
}) => {
    const toggleDrawer = () => setOpen(!open);
    return (
        <Drawer
            open={open}
            onClose={toggleDrawer}
            placement="left"
            className="bg-gray-950 text-gray-200"
        >
            <div className="flex flex-col">
                <NavLinks />
            </div>
        </Drawer>
    );
};
