import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import ErrorPage from './components/pages/Error';
import LoginPage from './components/pages/Login';
import SignupPage from './components/pages/Signup';
import { tokenLoader } from './utils/auth';
import RootLayout from './components/pages/Root';
import HomePage from './components/pages/Home';
import ProductListPage from './components/pages/ProductList';
import ProductNewPage from './components/pages/ProductNew';

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
        path: 'products',
        children: [
          { index: true, element: <ProductListPage /> },
          { path: 'new', element: <ProductNewPage /> },
          { path: ':id' },
          { path: ':id/edit' }
        ]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
