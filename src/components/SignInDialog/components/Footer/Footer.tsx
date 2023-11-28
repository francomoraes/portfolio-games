import { Button, Typography } from '@material-tailwind/react';

export const Footer = ({ onSignUpClick }: { onSignUpClick: () => void }) => {
    return (
        <div className="flex items-center mt-[24px]">
            <Typography className="text-gray-300" variant="small">
                Don't have an account?
                <i className="fa-solid fa-arrow-right mx-[6px]" />
            </Typography>
            <Button
                variant="text"
                className="p-0 text-blue-300"
                onClick={onSignUpClick}
            >
                Sign up
            </Button>
        </div>
    );
};
