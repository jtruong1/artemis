import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import auth from '../api/auth';

const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const setUserContext = () => {
    return auth
      .profile()
      .then((res) => {
        setUser(res.data);
        navigate('/monitors');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerUser = (data) => {
    const { name, email, password } = data;

    return auth
      .register(name, email, password)
      .then(() => {
        setUserContext();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginUser = (data) => {
    const { email, password } = data;

    return auth
      .login(email, password)
      .then(() => {
        setUserContext();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { registerUser, loginUser };
};

export default useAuth;
