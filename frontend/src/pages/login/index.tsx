import styles from './styles.module.scss';
import { Input } from '../../components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginData, schema } from './formSchemaLogin';
import { useForm } from 'react-hook-form';
import { UserAuth } from '../../context/userAuth';

export const Login = () => {
  const { singIn } = UserAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const submitLogin = (data: LoginData) => {
    singIn(data);
    console.log(data);
  };
  return (
    <div className={styles.loginContainer}>
      <h1> login </h1>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(submitLogin)}>
          <Input
            nome="EMAIL"
            placeholder="Digite seu email"
            type="text"
            {...register('email')}
          />
          <Input
            nome="SENHA"
            placeholder="Digite seu senha"
            type="password"
            {...register('password')}
          />
          <button className={styles.buttonLogin} type="submit">
            Entrar
          </button>
          <button className={styles.buttonRegister}>Cadastrar-se</button>
        </form>
      </div>
    </div>
  );
};
