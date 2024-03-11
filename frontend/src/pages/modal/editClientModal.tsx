import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { ContactData, schemaCont } from './forSchemaContact';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserAuth } from '../../context/userAuth';
import { Input } from '../../components/input';
import { api } from '../../../api';
import { useEffect, useState } from 'react';

export const EditClientModal = ({ contactId, setVisible2 }: any) => {
  const { editContact } = UserAuth();
  const [contact, setContactById] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('@fullstackToken');
    const getContact = async () => {
      try {
        const response = await api.get(`/contacts/${contactId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContactById(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getContact();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(schemaCont),
  });

  const onSubmit = (formData: ContactData) => {
    editContact(contactId, formData);
    console.log(formData);
  };

  return (
    <>
      <div className={styles.modal} role="dialog">
        <div className={styles.modalBox}>
          <header>
            <h1>Editar Contato</h1>
            <button onClick={() => setVisible2(false)}>x</button>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.modalPHolder}
          >
            <Input
              nome="NOME"
              placeholder={contact.name}
              type="text"
              {...register('name')}
            />
            <Input
              nome="TELEFONE"
              placeholder={contact.phone}
              type="text"
              {...register('phone')}
            />
            <Input
              nome="E-MAIL"
              placeholder={contact.email}
              type="text"
              {...register('email')}
            />
            <button>Editar Contato</button>
          </form>
        </div>
      </div>
    </>
  );
};
