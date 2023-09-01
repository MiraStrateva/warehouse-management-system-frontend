import { useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';

import { action as logoutAction } from './Logout';
import MainNavigation from '../Shared/MainNavigation';
import { getTokenDuration } from '../../utils/auth';

function RootLayout() {
  const token = useLoaderData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      logoutAction();
      navigate("/");
      navigate(0);
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      logoutAction();
      navigate("/");
      navigate(0);
    }, tokenDuration);
  }, [token, navigate]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

