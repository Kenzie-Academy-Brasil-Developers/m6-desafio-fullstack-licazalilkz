export const ContactsList = ({ contatcs }: any) => {
  const deleta = (id: string) => {
    console.log(id);
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
              </div>
            </li>
          );
        },
      )}
    </>
  );
};
