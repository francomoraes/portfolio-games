import NavLinks from '../NavLinks/NavLinks';
import { useState, useEffect } from 'react';
import { Button, Drawer, Navbar } from '@material-tailwind/react';
import { IoClose } from 'react-icons/io5';
import { TiThMenu } from 'react-icons/ti';

const StandardNavbar = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);

    return (
        <>
            <Navbar
                className={`flex sticky top-0 left-0 right-0 items-center overflow-hidden pl-[32px] shadow-lg bg-gray-300 bg-opacity-90 transition-all duration-500 ease-in-out ${
                    open ? 'opacity-0' : ''
                }`}
            >
                <Button
                    className={`hd:hidden w-[32px] h-[32px] text-slate-700 bg-transparent my-[15px]`}
                    onClick={toggleDrawer}
                >
                    <TiThMenu className="w-full h-full" />
                </Button>
                <div className="hidden hd:flex items-center w-full">
                    <NavLinks />
                </div>
            </Navbar>
            <Drawer
                className="flex flex-col bg-gray-300 bg-opacity-90 pt-[16px] relative top-[-62px] relative"
                open={open}
                onClose={toggleDrawer}
            >
                <Button
                    className={`hd:hidden w-[32px] h-[32px] text-slate-700 bg-transparent my-[15px] absolute left-[calc(100%-64px)]`}
                    onClick={toggleDrawer}
                >
                    <IoClose className="w-full h-full" />
                </Button>
                <NavLinks />
            </Drawer>
        </>
    );
};

export default StandardNavbar;
