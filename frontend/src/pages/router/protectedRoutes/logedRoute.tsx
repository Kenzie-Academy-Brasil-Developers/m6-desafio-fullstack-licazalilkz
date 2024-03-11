import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const LogedRoutes = () => {
  const [userToken, setUserToken]: any = useState('');
  useEffect(() => {
    const token = localStorage.getItem('@fullstackToken');
    setUserToken(token);
  }, []);
  if (userToken == null) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
