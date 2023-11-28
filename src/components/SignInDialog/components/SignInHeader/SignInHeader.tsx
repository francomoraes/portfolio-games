import { IconButton, Typography } from '@material-tailwind/react';

export const SignInHeader = ({ handler }: { handler: () => void }) => {
    return (
        <>
            <IconButton
                size="sm"
                variant="outlined"
                className="!absolute right-[12px] top-[12px] text-gray-300 hover:bg-gray-700"
                onClick={handler}
            >
                <i className="fa-solid fa-xmark fa-lg" />
            </IconButton>
            <Typography variant="h5" className="text-gray-300">
                Welcome!
            </Typography>
            <Typography className="text-gray-300" variant="small">
                Nice to see you again! 😊
            </Typography>
        </>
    );
};
