import { useState, useEffect } from 'react';
import auth from '../api/auth';

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const findUser = () => {
      auth
        .profile()
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };

    findUser();
  }, []);

  return { user, setUser, isLoading };
}
