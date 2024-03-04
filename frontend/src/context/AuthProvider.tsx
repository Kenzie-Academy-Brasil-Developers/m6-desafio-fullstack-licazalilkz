import { ReactNode, createContext } from 'react';
import { LoginData } from '../pages/login/formSchemaLogin';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/index';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  singIn: (data: LoginData) => void;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const singIn = async (data: LoginData) => {
    try {
      const response = await api.post('/login');
      const { token } = response.data;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('@fullstackToken', token);
      navigate('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ singIn }}>{children}</AuthContext.Provider>
  );
};
