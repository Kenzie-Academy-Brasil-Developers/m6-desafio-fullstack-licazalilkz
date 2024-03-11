import { useEffect } from 'react';
import { api } from '../../../api';

export const userProfile = async ([setUserInfo]: any) => {
  useEffect(() => {
    const token = localStorage.getItem('@fullstackToken');
    const userId = localStorage.getItem('@fullstackId');

    const getInfos = async () => {
      const response = await api.get(`/clients/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(response.data);
    };
    getInfos();
  }, []);
};
