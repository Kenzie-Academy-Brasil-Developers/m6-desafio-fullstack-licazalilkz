export const ContactsList = ({ contatcs }: any) => {
  return (
    <>
      {contatcs.map(
        (contact: {
          name: string;
          email: string;
          phone: string;
          date: string;
        }) => {
          return (
            <li>
              <p className="title2">Nome do contato: {contact.name}</p>
              <p className="title2">email: {contact.email}</p>
              <p className="title2">telefone: {contact.phone}</p>
              <p className="title2">registrado em: {contact.date}</p>
            </li>
          );
        },
      )}
    </>
  );
};
