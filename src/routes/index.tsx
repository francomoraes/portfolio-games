import { useRoutes, Navigate } from 'react-router-dom';
import { Home } from '../Pages/Home';
import Layout from '../Pages/Layout/Layout';
import RockPaperScissors from '../Pages/RockPaperScissors/RockPaperScissors';
import HangmanPage from '../Pages/HangmanPage/HangmanPage';

const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Navigate to="home" />
                },
                {
                    path: 'home',
                    element: <Home />
                },
                {
                    path: 'hangman',
                    element: <HangmanPage />
                },
                {
                    path: 'rock-paper-scissors',
                    element: <RockPaperScissors />
                }
            ]
        }
    ]);
};

export default Routes;
