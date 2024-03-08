import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { api } from '../../../api';
import { ContactsList } from './contacts';
import { userProfile } from './getUser';

export const Dashboard = () => {
  const [userInfo, setUserInfo] = useState('');
  const [contatcs, setContacs] = useState([]);

  userProfile([setUserInfo]);

  useEffect(() => {
    (async () => {
      const response = await api.get('contacts');
      setContacs(response.data);
    })();
  }, []);

  function logout() {
    localStorage.removeItem('@fullstackToken');
  }

  return (
    <div className={styles.contentDashboard}>
      <div className="container">
        <div className={styles.contentLogo}>
          <button onClick={logout}>Sair</button>
        </div>

        <div className={styles.divProfile}>
          <h1 className="title1">Olá, bem vindo de volta {userInfo.name}</h1>
          <p className="headline">veio olhar seus contatos?</p>
        </div>

        <div className="container">
          <div className={styles.divDashboard}>
            <ul>
              <ContactsList contatcs={contatcs} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
