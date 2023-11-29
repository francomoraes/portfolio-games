import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
    to: string;
    children: React.ReactNode;
}

export const CustomNavLink: React.FC<Props> = ({ to, children }) => {
    const pathname = useLocation().pathname;

    return (
        <NavLink
            className={
                'mx-[12px] px-[16px] py-[16px] transition-bg duration-300 hover:bg-white hover:bg-opacity-20 hover:scale-105 font-rubik text-gray-200 text-opacity-80 text-[20px] font-semibold rounded-md active:scale-95 tracking-[0.5px] ' +
                (pathname === to
                    ? 'border-b-[2px] border-yellow-500 text-yellow-500'
                    : '')
            }
            to={to}
        >
            {children}
        </NavLink>
    );
};
