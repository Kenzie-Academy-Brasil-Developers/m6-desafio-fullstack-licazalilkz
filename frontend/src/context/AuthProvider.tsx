import { ReactNode, createContext, useEffect, useState } from 'react';
import { LoginData } from '../pages/login/formSchemaLogin';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/index';
import { RegisterData } from '../pages/register/formSchemaRegister';
import { ContactData } from '../pages/modal/forSchemaContact';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  singIn: (data: LoginData) => void;
  registerUser: (data: RegisterData) => void;
  registerContact: (data: ContactData) => void;
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
      api.defaults.headers.common.Authorization = `Bearer ${tokenUser}`;
      localStorage.setItem('@fullstackToken', tokenUser);
      localStorage.setItem('@fullstackId', id);
      navigate('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (formData: RegisterData) => {
    try {
      await api.post('/clients', formData);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const registerContact = async (formData: ContactData) => {
    try {
      const tokenUser = localStorage.getItem('@fullstackToken');
      api.defaults.headers.common.Authorization = `Bearer ${tokenUser}`;
      await api.post('/contacts', formData);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ singIn, registerUser, registerContact, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
