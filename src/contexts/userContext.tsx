import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { User as FirebaseUser } from 'firebase/auth';

interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<FirebaseUser | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
