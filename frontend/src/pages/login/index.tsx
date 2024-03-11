import styles from './styles.module.scss';
import { Input } from '../../components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginData, schema } from './formSchemaLogin';
import { useForm } from 'react-hook-form';
import { UserAuth } from '../../context/userAuth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { singIn } = UserAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const submitLogin = (formData: LoginData) => {
    singIn(formData);
  };

  function registerPage() {
    navigate('/register');
  }

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
        </form>
        <p>Ainda não possui uma conta ?</p>

        <button className={styles.buttonRegister} onClick={registerPage}>
          Cadastrar-se
        </button>
      </div>
    </div>
  );
};
