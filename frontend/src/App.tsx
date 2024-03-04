import { RouterMain } from './pages/router/routerMain';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <RouterMain />
      </AuthProvider>
    </>
  );
}

export default App;
