import { SetStateAction, useState } from 'react';
import { api } from '../../../api';
import { EditClientModal } from '../modal/editClientModal';

interface Contact {
  contactId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
}

interface Props {
  contatcs: Contact[];
}

export const ContactsList = ({ contatcs }: Props) => {
  const [isVisible2, setIsVisible2] = useState(false);
  const [contactId, setContactId] = useState('');
  const deleta = async (id: string) => {
    const token = localStorage.getItem('@fullstackToken');
    console.log(id);

    try {
      await api.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Cliente com ID ${id} deletado com sucesso.`);
    } catch (error) {
      console.log(`Client do id:${id} nao encontrado`);
      console.log(error);
    }

    console.log(id);
    window.location.reload();
  };

  const editModal = (idContact: any) => {
    setIsVisible2(true);
    setContactId(idContact);
  };

  return (
    <>
      {contatcs.map(
        (contact: {
          contactId: string;
          name: string;
          email: string;
          phone: string;
          date: string;
        }) => {
          return (
            <li key={contact.contactId}>
              <p className="title2">Nome do contato: {contact.name}</p>
              <p className="title2">email: {contact.email}</p>
              <p className="title2">telefone: {contact.phone}</p>
              <p className="title2">registrado em: {contact.date}</p>
              <div>
                <button
                  onClick={(event) => {
                    deleta(contact.contactId);
                  }}
                >
                  deletar
                </button>
                <button
                  onClick={(event) => {
                    editModal(contact.contactId);
                  }}
                >
                  Editar
                </button>
              </div>
            </li>
          );
        },
      )}
      {isVisible2 ? (
        <EditClientModal contactId={contactId} setVisible2={setIsVisible2} />
      ) : null}
    </>
  );
};
