import { HashRouter } from 'react-router-dom';
import Routes from './routes';
import { UserProvider } from './contexts/userContext';
import { DrawerProvider } from './contexts/DrawerContext';

function App() {
    return (
        <UserProvider>
            <DrawerProvider>
                <UserProvider>
                    <HashRouter>
                        <Routes />
                    </HashRouter>
                </UserProvider>
            </DrawerProvider>
        </UserProvider>
    );
}

export default App;
