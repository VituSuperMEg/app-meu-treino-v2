import { create }from 'zustand';
import { Storage } from "@services/storage";

interface IUserState {
  user: [];
  token: string;
  setUser: (user: any[]) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useUser = create<IUserState>((set) => ({
  user: [],
  name: '',
  token: Storage.getString('token') || '',

  setUser: (user: any[]) => set({ user }),
  setToken: (token: string) => {
    set({ token });
    Storage.set('token', token);
  },
  logout: () => {
    Storage.delete('token');
    set({ user: [], token: '' });
  },
}));
