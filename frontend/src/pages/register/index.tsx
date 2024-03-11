import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/userAuth';
import { RegisterData, schemaReg } from './formSchemaRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/input';

export const Register = () => {
  const { registerUser } = UserAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(schemaReg),
  });

  const submit = (formData: RegisterData) => {
    registerUser(formData);
  };

  function loginPage() {
    navigate('/');
  }

  return (
    <div className={styles.registerConteiner}>
      <div className={styles.contentLogo}>
        <h1> Registre-se</h1>
        <button onClick={loginPage}>Voltar</button>
      </div>

      <div className={styles.content}>
        <h1 className="title1">Crie sua conta</h1>
        <p className="headline">Rapido e grátis, vamos nessa</p>
        <form onSubmit={handleSubmit(submit)}>
          <Input
            nome="NOME"
            placeholder="digite seu nome"
            type="text"
            {...register('name')}
          />
          <Input
            nome="E-MAIL"
            placeholder="digite seu email"
            type="text"
            {...register('email')}
          />
          <Input
            nome="SENHA"
            placeholder="Digite seu senha"
            type="password"
            {...register('password')}
          />
          <Input
            nome="TELEFONE"
            placeholder="Digite seu tefone"
            type="text"
            {...register('phone')}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
