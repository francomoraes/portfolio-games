import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    to: string;
    children: React.ReactNode;
}

export const CustomNavLink: React.FC<Props> = ({ to, children }) => {
    return (
        <NavLink
            className="mx-[12px] px-[16px] py-[16px] transition-bg duration-300 hover:bg-white hover:bg-opacity-20 hover:scale-105 font-rubik text-slate-700 text-opacity-80 text-[20px] font-semibold rounded-md active:scale-95"
            to={to}
        >
            {children}
        </NavLink>
    );
};
