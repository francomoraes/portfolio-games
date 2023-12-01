import { HashRouter } from 'react-router-dom';
import Routes from './routes';
import { UserProvider } from './contexts/userContext';
import { DrawerProvider } from './contexts/DrawerContext';
import { DialogProvider } from './contexts/DialogProvider';

function App() {
    return (
        <UserProvider>
            <DrawerProvider>
                <UserProvider>
                    <DialogProvider>
                        <HashRouter>
                            <Routes />
                        </HashRouter>
                    </DialogProvider>
                </UserProvider>
            </DrawerProvider>
        </UserProvider>
    );
}

export default App;
