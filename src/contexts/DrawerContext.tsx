import { createContext, useContext, useState } from 'react';

interface DrawerContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerContext = createContext<DrawerContextType>(
    {} as DrawerContextType
);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <DrawerContext.Provider value={{ open, setOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawerContext = (): DrawerContextType => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error(
            'useDrawerContext must be used within a DrawerProvider'
        );
    }
    return context;
};
