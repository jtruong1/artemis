import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './../hooks/UserContext';

const RequireAuth = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return null;
  }

  return user ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
