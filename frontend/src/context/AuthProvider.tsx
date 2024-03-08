import { ReactNode, createContext, useEffect, useState } from 'react';
import { LoginData } from '../pages/login/formSchemaLogin';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/index';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  singIn: (data: LoginData) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('@fullstackToken');
    if (!token) {
      setLoading(false);
    }
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  const singIn = async (formData: LoginData) => {
    try {
      const response = await api.post('/login', formData);
      const tokenUser = response.data.token;
      const id = response.data.id;
      console.log(response.data.token);
      console.log(response.data.id);
      api.defaults.headers.common.Authorization = `Bearer ${tokenUser}`;
      localStorage.setItem('@fullstackToken', tokenUser);
      localStorage.setItem('@fullstackId', id);
      navigate('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ singIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
