import { Button, Drawer } from '@material-tailwind/react';
import { NavLinks } from '../NavLinks';
import { IoClose } from 'react-icons/io5';

interface CustomDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, setOpen }) => {
    const toggleDrawer = () => setOpen(!open);
    return (
        <Drawer
            className={`z-50 flex bg-gray-300 pt-[16px] absolute top-[-62px] relative hd:left-[-300px]`}
            open={open}
            onClose={toggleDrawer}
        >
            <div className="flex flex-col flex-3 w-[calc(100%-32px)]">
                <NavLinks />
            </div>
            <Button
                className={`hd:hidden w-[32px] h-[32px] text-slate-700 bg-transparent my-[15px] mr-[16px] ml-auto active:bg-white active:bg-opacity-20 active:scale-95`}
                onClick={toggleDrawer}
            >
                <IoClose className="w-full h-full" />
            </Button>
        </Drawer>
    );
};

export default CustomDrawer;
