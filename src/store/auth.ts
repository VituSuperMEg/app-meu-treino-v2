import { create } from 'zustand';
import { Storage } from '@services/storage';

interface User {
    id : number;
    name: string;
    foto : string | "";
}
interface IUserState {
  user: User; 
  token: string;
  setUser: (user: any[]) => void;
  setToken: (token: string) => void;
  logout: () => void;
  profile: {};
  setProfille : (profille : any) => void;
}

export const useUser = create<IUserState>((set) => {
  const storedUser = Storage.getString('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : [];

  return {
    user: initialUser,
    profile: {},
    token: Storage.getString('token') || '',
    setUser: (user: any[]) => {
      set({ user });
      Storage.set('user', JSON.stringify(user));
    },
    setToken: (token: string) => {
      set({ token });
      Storage.set('token', token);
    },
    logout: () => {
      Storage.delete('token');
      Storage.delete('user');
      set({ user: [], token: '' });
    },
    setProfille: (profille : any) => {
      set({ profile: profille })
    }
  };
});
