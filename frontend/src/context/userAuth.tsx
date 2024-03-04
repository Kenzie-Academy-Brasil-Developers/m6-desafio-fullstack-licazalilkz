import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const UserAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
