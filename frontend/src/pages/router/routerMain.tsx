import { Route, Routes } from 'react-router-dom';
import { Login } from '../login';
import { Dashboard } from '../dashboard';
import { LogedRoutes } from './protectedRoutes/logedRoute';
import { Register } from '../register';
import { PrivateRoutes } from './protectedRoutes/privateRoute';

export const RouterMain = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/dashboard" element={<LogedRoutes />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
