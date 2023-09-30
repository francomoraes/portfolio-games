import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    to: string;
    children: React.ReactNode;
}

const CustomNavLink: React.FC<Props> = ({ to, children }) => {
    return (
        <NavLink
            className="p-[4px] mx-4px hover:bg-white hover:bg-opacity-20"
            to={to}
        >
            {children}
        </NavLink>
    );
};

export default CustomNavLink;
