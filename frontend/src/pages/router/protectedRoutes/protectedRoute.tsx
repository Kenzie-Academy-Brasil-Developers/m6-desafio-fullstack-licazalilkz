import { Outlet } from 'react-router-dom';
import { UserAuth } from '../../../context/userAuth';

export const ProtectedRoutes = () => {
  const { loading } = UserAuth();

  if (loading) {
    return <div> Carregando . . .</div>;
  }

  return <Outlet />;
};
