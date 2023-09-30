import { useRoutes, Navigate } from 'react-router-dom';
import { Home } from '../Pages/Home';
import Layout from '../Pages/Layout/Layout';
import Hangman from '../Pages/Hangman/Hangman';
import RockPaperScissors from '../Pages/RockPaperScissors/RockPaperScissors';

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
                    element: <Hangman />
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
