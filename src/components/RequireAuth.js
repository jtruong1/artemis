import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './../hooks/UserContext';

const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
