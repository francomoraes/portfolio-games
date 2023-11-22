import { CustomNavLink } from '..';

export const NavLinks = () => {
    return (
        <>
            <CustomNavLink to="/">Home</CustomNavLink>
            <CustomNavLink to="/hangman">Hangman</CustomNavLink>
            <CustomNavLink to="/rock-paper-scissors">
                Rock Paper Scissors
            </CustomNavLink>
        </>
    );
};
