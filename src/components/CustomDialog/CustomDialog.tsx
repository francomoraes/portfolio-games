import React from 'react';
import { Dialog } from '@material-tailwind/react';

export const CustomDialog = ({
    open,
    handler,
    children
}: {
    open: boolean;
    handler: () => void;
    children: React.ReactNode;
}) => {
    return (
        <Dialog
            className="p-[12px] bg-slate-700 shadow-2xl shadow-gray-400"
            open={open}
            handler={handler}
            size="sm"
        >
            {children}
        </Dialog>
    );
};
