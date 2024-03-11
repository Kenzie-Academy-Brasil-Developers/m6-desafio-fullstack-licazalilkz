import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { ContactData, schemaCont } from './forSchemaContact';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserAuth } from '../../context/userAuth';
import { Input } from '../../components/input';

export const ClientModal = ({ setVisible }: any) => {
  const { registerContact } = UserAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(schemaCont),
  });

  const onSubmit = (formData: ContactData) => {
    registerContact(formData);
    console.log(formData);
  };

  return (
    <>
      <div className={styles.modal} role="dialog">
        <div className={styles.modalBox}>
          <header>
            <h1>Cadastrar Contato</h1>
            <button onClick={() => setVisible(false)}>x</button>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.modalPHolder}
          >
            <Input
              nome="NOME"
              placeholder="digite o nome do contato"
              type="text"
              {...register('name')}
            />
            <Input
              nome="TELEFONE"
              placeholder="digite o telefone do contato"
              type="text"
              {...register('phone')}
            />
            <Input
              nome="E-MAIL"
              placeholder="digite seu email"
              type="text"
              {...register('email')}
            />
            <button>Cadastrar Contato</button>
          </form>
        </div>
      </div>
    </>
  );
};
