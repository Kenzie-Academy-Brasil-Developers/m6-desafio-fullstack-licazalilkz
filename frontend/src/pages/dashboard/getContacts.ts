import { useEffect } from 'react';
import { api } from '../../../api';

export const getContacts = async ([setContacs]: any) => {
  useEffect(() => {
    const token = localStorage.getItem('@fullstackToken');
    const userId = localStorage.getItem('@fullstackId');

    const getContacts = async () => {
      const response = await api.get('contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredContacts = response.data.filter(
        (contact: any) => contact.clientId === userId,
      );
      setContacs(filteredContacts);
    };
    getContacts();
  });
};
