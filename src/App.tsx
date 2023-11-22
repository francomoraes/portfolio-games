import { HashRouter } from 'react-router-dom';
import Routes from './routes';
import { UserProvider } from './contexts/userContext';

function App() {
    return (
        <UserProvider>
            <HashRouter>
                <Routes />
            </HashRouter>
        </UserProvider>
    );
}

export default App;
