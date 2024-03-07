import { create } from "zustand";

interface ITreino {
  exercises: string | any;
  setExercises: React.Dispatch<React.SetStateAction<string | any>>;
  updating : boolean;
  setUpdating : (is : boolean) => void;
}

export const useTreino = create<ITreino>((set) => ({
  exercises: '',
  setExercises: (value) => set({ exercises: value }),
  updating: false,
  setUpdating: (is : boolean) => set({ updating: is }),
}));
