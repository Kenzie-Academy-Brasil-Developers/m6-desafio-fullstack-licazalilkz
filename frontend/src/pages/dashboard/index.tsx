import { useState } from 'react';
import styles from './styles.module.scss';
import { ContactsList } from './contacts';
import { userProfile } from './getUser';
import { useNavigate } from 'react-router-dom';
import { getContacts } from './getContacts';
import { ClientModal } from '../modal/clientModal';

export const Dashboard = () => {
  const [userInfo, setUserInfo] = useState('');
  const [contatcs, setContacs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  userProfile([setUserInfo]);
  getContacts([setContacs]);

  function logout() {
    localStorage.removeItem('@fullstackToken');
    localStorage.removeItem('@fullstackId');
    navigate('/');
  }

  return (
    <>
      <div className={styles.contentDashboard}>
        <div className="container">
          <div className={styles.contentLogo}>
            <p>Agendinha top</p>
            <button onClick={logout}>Sair</button>
          </div>

          <div>
            <div className={styles.divProfile}>
              <h1 className="title1">
                Olá, bem vindo de volta {userInfo.name}
              </h1>
              <p className="headline">veio olhar seus contatos?</p>
            </div>
            <button onClick={() => setIsVisible(true)}> Novo Contato </button>
          </div>

          <div className="container">
            <div className={styles.divDashboard}>
              <ul>
                <ContactsList contatcs={contatcs} />
              </ul>
            </div>
          </div>
          {/* --------------------------------- */}
        </div>
      </div>
      {isVisible ? <ClientModal setVisible={setIsVisible} /> : null}
    </>
  );
};
