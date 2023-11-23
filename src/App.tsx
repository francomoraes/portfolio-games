import { HashRouter } from 'react-router-dom';
import Routes from './routes';
import { UserProvider } from './contexts/userContext';
import { DrawerProvider } from './contexts/DrawerContext';

function App() {
    return (
        <UserProvider>
            <DrawerProvider>
                <HashRouter>
                    <Routes />
                </HashRouter>
            </DrawerProvider>
        </UserProvider>
    );
}

export default App;
