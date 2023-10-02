import NavLinks from '../NavLinks/NavLinks';
import { useState } from 'react';
import { Button, Navbar } from '@material-tailwind/react';
import { TiThMenu } from 'react-icons/ti';
import CustomDrawer from '../CustomDrawer/CustomDrawer';

const StandardNavbar = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);

    return (
        <>
            <Navbar
                className={`flex z-50 sticky top-0 left-0 right-0 items-center overflow-hidden pl-[32px] shadow-lg bg-gray-300 bg-opacity-90 transition-all duration-500 ease-in-out rounded-none`}
            >
                <Button
                    className={`transition-all ${
                        open ? 'opacity-0' : 'opacity-100'
                    } hd:hidden w-[40px] h-[32px] px-[8px] text-slate-700 bg-transparent my-[15px] active:bg-white active:bg-opacity-20 active:scale-95`}
                    onClick={toggleDrawer}
                >
                    <TiThMenu className="w-full h-full" />
                </Button>
                <div className="hidden hd:flex items-center w-full">
                    <NavLinks />
                </div>
            </Navbar>
            <CustomDrawer open={open} setOpen={setOpen} />
        </>
    );
};

export default StandardNavbar;
