import { User } from 'firebase/auth';

export interface SignInDialogProps {
    handler: () => void;
    onSignUpClick: () => void;
}
