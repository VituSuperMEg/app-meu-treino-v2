import {useNavigation} from '@react-navigation/native';
import {ReactNode, useEffect} from 'react';
import {useUser} from '../store/auth';

interface Auth {
  children: ReactNode;
}

export function AuthProvider({children}: Auth) {
  const token = useUser(state => state.token);

  useEffect(() => {
    if (token) {
      navigate('Tabs');
    } else {
      navigate('Login');
    }
  }, [token]);

  const {navigate} = useNavigation();

  return <>{children}</>;
}
