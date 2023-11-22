import {
    Button,
    IconButton,
    Input,
    Typography
} from '@material-tailwind/react';
import { signInWithGoogle } from '../../firebase-config';

export const SignUpDialog = ({
    handler,
    onSignInClick
}: {
    handler: () => void;
    onSignInClick: () => void;
}) => {
    return (
        <div className="relative">
            <IconButton
                size="sm"
                variant="outlined"
                className="!absolute right-[12px] top-[12px]"
                onClick={handler}
            >
                <i className="fa-solid fa-xmark fa-lg" />
            </IconButton>
            <Typography variant="h5" color="gray">
                Welcome!
            </Typography>
            <Typography color="gray" variant="small">
                Feel free to sign up or play as a guest 😊
            </Typography>
            <div className="flex items-center">
                <Typography color="gray" variant="small">
                    Already have an account?
                    <i className="fa-solid fa-arrow-right mx-[6px]" />
                </Typography>
                <Button
                    color="blue-gray"
                    variant="text"
                    className="p-0"
                    onClick={onSignInClick}
                >
                    Sign in
                </Button>
            </div>
            <form className="h-full w-full flex flex-col gap-[12px] my-[12px]">
                <div className="flex flex-col gap-[16px]">
                    <div>
                        <Typography variant="h6" color="gray">
                            🙋‍♂️ Your name
                        </Typography>
                        <Input
                            size="md"
                            placeholder="John Doe"
                            crossOrigin={'anonymous'}
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="gray">
                            📧 Your email
                        </Typography>
                        <Input
                            size="md"
                            placeholder="mail@mail.com"
                            crossOrigin={'anonymous'}
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="gray">
                            🔒 Your password
                        </Typography>
                        <Input
                            size="md"
                            placeholder="********"
                            type="password"
                            crossOrigin={'anonymous'}
                        />
                    </div>
                </div>
                <Button color="blue-gray">Sign up</Button>
            </form>
            <div className="flex gap-[12px]">
                <Button color="blue" fullWidth onClick={signInWithGoogle}>
                    Sign in with google
                </Button>
                <Button color="gray" fullWidth onClick={handler}>
                    Play as guest
                </Button>
            </div>
        </div>
    );
};
