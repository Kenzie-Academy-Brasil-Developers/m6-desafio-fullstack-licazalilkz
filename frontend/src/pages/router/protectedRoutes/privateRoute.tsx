import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const PrivateRoutes = () => {
  const [userToken, setUserToken]: any = useState('');
  useEffect(() => {
    const token = localStorage.getItem('@fullstackToken');
    setUserToken(token);
  }, []);
  if (userToken) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};
