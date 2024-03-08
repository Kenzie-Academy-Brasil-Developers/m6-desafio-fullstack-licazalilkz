import { Route, Routes } from 'react-router-dom';
import { Login } from '../login';
import { Dashboard } from '../dashboard';
import { ProtectedRoutes } from './protectedRoutes/protectedRoute';

export const RouterMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
