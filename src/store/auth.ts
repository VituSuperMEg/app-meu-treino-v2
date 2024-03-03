import { create } from 'zustand';
import { Storage } from '@services/storage';

interface IUserState {
  user: any[]; 
  token: string;
  setUser: (user: any[]) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useUser = create<IUserState>((set) => {
  const storedUser = Storage.getString('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : [];

  return {
    user: initialUser,
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
  };
});
