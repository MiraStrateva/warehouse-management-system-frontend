import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import ErrorPage from './components/pages/Error';
import LoginPage from './components/pages/Login';
import SignupPage from './components/pages/Signup';
import { tokenLoader } from './utils/auth';
import { action as logoutAction } from './components/pages/Logout';
import RootLayout from './components/pages/Root';
import HomePage from './components/pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },      
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
